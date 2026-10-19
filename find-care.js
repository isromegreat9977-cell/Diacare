/* =========================================
   DIACARE - FIND CARE (nearby centres)

   Finds hospitals, clinics and diagnostic labs near the visitor.

   How it works (no API key, no server needed):
     1. Position   - browser location (only after the button is clicked)
                     OR a typed city/area looked up with OpenStreetMap
                     "Nominatim".
     2. Places     - OpenStreetMap "Overpass API" returns every hospital,
                     clinic and laboratory within the chosen distance.
     3. Display    - nearest first, with Directions / Call / Website links.

   Honest limits:
     * OpenStreetMap is volunteer-edited, so some places are missing.
     * A place being listed does NOT prove it offers diabetes tests.
       The page tells visitors to call ahead.
     * The visitor's location is never stored by DiaCare. The coordinates
       are only sent to the OpenStreetMap services used above.

   This file is loaded AFTER script.js and re-uses its helpers:
   t(), tf(), escapeHtml(), currentLanguage.
========================================= */

(function () {

  "use strict";

  /* ---------- settings ---------- */

  const OVERPASS_ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter"
  ];

  const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

  const PAGE_SIZE = 10;
  const REQUEST_TIMEOUT_MS = 25000;

  const KINDS = ["hospital", "clinic", "lab"];


  /* ---------- page elements ---------- */

  const locateButton = document.getElementById("locateButton");
  const careSearchForm = document.getElementById("careSearchForm");
  const careQuery = document.getElementById("careQuery");
  const careQueryLabel = document.getElementById("careQueryLabel");
  const careSearchButton = document.getElementById("careSearchButton");
  const careRadius = document.getElementById("careRadius");
  const careStatus = document.getElementById("careStatus");
  const careFilters = document.getElementById("careFilters");
  const careResults = document.getElementById("careResults");
  const careMore = document.getElementById("careMore");
  const careGoogle = document.getElementById("careGoogle");

  if (!locateButton || !careResults) {
    return;   /* section not on this page */
  }


  /* ---------- state ---------- */

  const state = {
    status: null,        /* { key, vars, kind: "info" | "error" } */
    origin: null,        /* { lat, lon, label }  label null = "your location" */
    places: [],
    km: 5,
    filter: "all",
    visible: PAGE_SIZE
  };

  let requestId = 0;     /* ignores answers to out-of-date searches */


  /* =========================================
     SMALL HELPERS
  ========================================= */

  function setStatus(key, kind, vars) {
    state.status = key ? { key, kind: kind || "info", vars: vars || {} } : null;
    renderCare();
  }

  function distanceKm(a, b) {
    const toRad = degrees => degrees * Math.PI / 180;
    const earthRadius = 6371;

    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);

    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(dLon / 2) ** 2;

    return 2 * earthRadius * Math.asin(Math.sqrt(h));
  }

  function formatDistance(km) {
    return km < 10
      ? `${km.toFixed(1)} ${t("kmUnit")}`
      : `${Math.round(km)} ${t("kmUnit")}`;
  }

  function originName() {
    return state.origin && state.origin.label
      ? state.origin.label
      : t("careYourLocation");
  }

  /* only ever link to http(s) addresses */
  function safeWebsite(value) {
    try {
      const url = new URL(String(value).trim());
      return url.protocol === "https:" || url.protocol === "http:"
        ? url.href
        : "";
    } catch (error) {
      return "";
    }
  }

  /* phone numbers: keep the first one, digits and + only */
  function safePhone(value) {
    const first = String(value || "").split(/[;,/]/)[0];

    if (!/^[+0-9()\-\s.]{5,25}$/.test(first.trim())) {
      return "";
    }

    return first.replace(/[^\d+]/g, "");
  }


  /* =========================================
     FETCH WITH TIMEOUT
  ========================================= */

  async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  }


  /* =========================================
     STEP 1: POSITION
  ========================================= */

  function useMyLocation() {

    if (!("geolocation" in navigator)) {
      setStatus("careUnsupported", "error");
      return;
    }

    if (!window.isSecureContext) {
      setStatus("careInsecure", "error");
      return;
    }

    const id = ++requestId;

    setStatus("careLocating", "info");

    navigator.geolocation.getCurrentPosition(
      position => {
        if (id !== requestId) return;

        searchAround(
          {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            label: null
          },
          id
        );
      },
      error => {
        if (id !== requestId) return;

        /* code 1 = the person pressed "Block" */
        setStatus(
          error.code === 1 ? "careDenied" : "careLocationFailed",
          "error"
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );

  }

  async function searchByText(event) {

    event.preventDefault();

    const query = careQuery.value.trim();

    if (!query) {
      setStatus("careNeedQuery", "error");
      return;
    }

    const id = ++requestId;

    setStatus("careGeocoding", "info");

    try {

      const url =
        `${NOMINATIM_URL}?format=jsonv2&limit=1&accept-language=en` +
        `&q=${encodeURIComponent(query)}`;

      const response = await fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Geocoder HTTP ${response.status}`);
      }

      const data = await response.json();

      if (id !== requestId) return;

      const lat = Array.isArray(data) && data[0] ? parseFloat(data[0].lat) : NaN;
      const lon = Array.isArray(data) && data[0] ? parseFloat(data[0].lon) : NaN;

      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        setStatus("careNotFound", "error");
        return;
      }

      searchAround({ lat, lon, label: query }, id);

    } catch (error) {

      console.error("Place lookup failed:", error);

      if (id === requestId) {
        setStatus("careError", "error");
      }

    }

  }


  /* =========================================
     STEP 2: PLACES (Overpass API)
  ========================================= */

  function buildQuery(lat, lon, radiusMeters) {

    const around =
      `(around:${radiusMeters},${lat.toFixed(5)},${lon.toFixed(5)})`;

    /* One "out" per kind, each with its own cap, so a very crowded
       area full of small clinics cannot push out the hospitals. */
    return `
      [out:json][timeout:25];

      (
        nwr["amenity"="hospital"]${around};
        nwr["healthcare"="hospital"]${around};
      );
      out center tags 100;

      (
        nwr["healthcare"="laboratory"]${around};
      );
      out center tags 100;

      (
        nwr["amenity"="clinic"]${around};
        nwr["healthcare"="clinic"]${around};
      );
      out center tags 100;
    `;
  }

  async function fetchPlaces(query) {

    let lastError = null;

    for (const endpoint of OVERPASS_ENDPOINTS) {

      try {

        const response = await fetchWithTimeout(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `data=${encodeURIComponent(query)}`
        });

        if (!response.ok) {
          throw new Error(`Overpass HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.elements)) {
          throw new Error("Unexpected Overpass response");
        }

        return data.elements;

      } catch (error) {

        lastError = error;      /* try the next server */

      }

    }

    throw lastError || new Error("No map server answered");

  }

  function toPlaces(elements, origin) {

    const seen = new Set();
    const places = [];

    elements.forEach(element => {

      const key = `${element.type}/${element.id}`;

      if (seen.has(key)) return;
      seen.add(key);

      const tags = element.tags || {};

      const lat = element.lat ?? (element.center && element.center.lat);
      const lon = element.lon ?? (element.center && element.center.lon);

      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

      let kind = "clinic";

      if (tags.amenity === "hospital" || tags.healthcare === "hospital") {
        kind = "hospital";
      } else if (tags.healthcare === "laboratory") {
        kind = "lab";
      }

      const searchable = [
        tags.name,
        tags["name:en"],
        tags["healthcare:speciality"],
        tags.description
      ].filter(Boolean).join(" ");

      const address = [
        [tags["addr:housenumber"], tags["addr:street"]]
          .filter(Boolean).join(" "),
        tags["addr:suburb"] || tags["addr:neighbourhood"],
        tags["addr:city"],
        tags["addr:postcode"]
      ].filter(Boolean).join(", ");

      places.push({
        id: key,
        kind,
        name: tags.name || tags["name:en"] || "",
        address,
        lat,
        lon,
        phone: safePhone(tags.phone || tags["contact:phone"]),
        website: safeWebsite(tags.website || tags["contact:website"]),
        mentionsDiabetes: /diabet|endocrin/i.test(searchable),
        mentionsDiagnostics:
          kind !== "lab" && /diagnos|patholog|laborator|\blabs?\b/i.test(searchable),
        distance: distanceKm(origin, { lat, lon })
      });

    });

    places.sort((a, b) => a.distance - b.distance);

    return places;

  }

  async function searchAround(origin, id) {

    state.origin = origin;
    state.places = [];
    state.filter = "all";
    state.visible = PAGE_SIZE;
    state.km = Number(careRadius.value) || 5;

    setStatus("careSearching", "info", { place: originName() });

    try {

      const elements = await fetchPlaces(
        buildQuery(origin.lat, origin.lon, state.km * 1000)
      );

      if (id !== requestId) return;

      state.places = toPlaces(elements, origin);
      setStatus(null);

    } catch (error) {

      console.error("Place search failed:", error);

      if (id !== requestId) return;

      setStatus("careError", "error");

    }

  }


  /* =========================================
     STEP 3: DISPLAY
  ========================================= */

  function filteredPlaces() {
    return state.filter === "all"
      ? state.places
      : state.places.filter(place => place.kind === state.filter);
  }

  function kindLabel(kind) {
    return t({
      hospital: "kindHospital",
      clinic: "kindClinic",
      lab: "kindLab"
    }[kind]);
  }

  function renderPlace(place) {

    const directions =
      `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`;

    const hints = [];

    if (place.mentionsDiabetes) {
      hints.push(t("careHintDiabetes"));
    }

    if (place.mentionsDiagnostics) {
      hints.push(t("careHintDiag"));
    }

    return `
      <li class="care-item">

        <div class="care-item-head">
          <span class="care-kind kind-${place.kind}">
            ${escapeHtml(kindLabel(place.kind))}
          </span>
          <span class="care-distance">
            ${escapeHtml(formatDistance(place.distance))}
          </span>
        </div>

        <strong class="care-name">
          ${escapeHtml(place.name || t("careUnnamed"))}
        </strong>

        ${place.address
          ? `<p class="care-address">${escapeHtml(place.address)}</p>`
          : ""}

        ${hints.length
          ? `<div class="care-hints">${hints.map(hint =>
              `<span class="care-hint">${escapeHtml(hint)}</span>`).join("")}</div>`
          : ""}

        <div class="care-actions">

          <a class="care-link"
             href="${escapeHtml(directions)}"
             target="_blank" rel="noopener noreferrer">
            ${escapeHtml(t("careDirections"))}
          </a>

          ${place.phone
            ? `<a class="care-link" href="tel:${escapeHtml(place.phone)}">
                 ${escapeHtml(t("careCall"))}
               </a>`
            : ""}

          ${place.website
            ? `<a class="care-link" href="${escapeHtml(place.website)}"
                  target="_blank" rel="noopener noreferrer">
                 ${escapeHtml(t("careWebsite"))}
               </a>`
            : ""}

        </div>

      </li>
    `;

  }

  function renderFilters() {

    if (state.places.length === 0) {
      careFilters.classList.add("is-hidden");
      careFilters.innerHTML = "";
      return;
    }

    const labels = {
      all: t("careFilterAll"),
      hospital: t("careFilterHospital"),
      clinic: t("careFilterClinic"),
      lab: t("careFilterLab")
    };

    const countOf = kind =>
      kind === "all"
        ? state.places.length
        : state.places.filter(place => place.kind === kind).length;

    careFilters.innerHTML = ["all", ...KINDS].map(kind => `
      <button
        type="button"
        class="care-filter${state.filter === kind ? " active" : ""}"
        data-filter="${kind}"
        aria-pressed="${state.filter === kind}"
      >
        ${escapeHtml(labels[kind])} (${countOf(kind)})
      </button>
    `).join("");

    careFilters.classList.remove("is-hidden");

  }

  /* Draws everything from `state`, so a language change
     can simply call this again. */
  function renderCare() {

    /* translated static bits */
    careQuery.placeholder = t("careSearchPlaceholder");
    careQueryLabel.textContent = t("careSearchLabel");
    careSearchButton.textContent = t("careSearchButton");
    careRadius.setAttribute("aria-label", t("careRadiusLabel"));

    Array.from(careRadius.options).forEach(option => {
      option.textContent = `${option.value} ${t("kmUnit")}`;
    });

    /* Google Maps fallback link */
    const searchTerm =
      "diabetes diagnostic centre near " +
      (state.origin && state.origin.label ? state.origin.label : "me");

    careGoogle.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(searchTerm);

    /* status line */
    let statusText = "";
    let statusKind = "info";

    if (state.status) {

      const vars = { ...state.status.vars };
      statusText = tf(state.status.key, vars);
      statusKind = state.status.kind;

    } else if (state.origin) {

      const list = filteredPlaces();

      if (state.places.length === 0) {
        statusText = tf("careNone", { km: state.km });
      } else {
        statusText = tf("careFoundLine", {
          shown: Math.min(state.visible, list.length),
          total: list.length,
          km: state.km,
          place: originName()
        });
      }

    }

    careStatus.textContent = statusText;
    careStatus.className = `care-status ${statusKind}`;

    /* results */
    renderFilters();

    const list = state.status ? [] : filteredPlaces();

    careResults.innerHTML =
      list.slice(0, state.visible).map(renderPlace).join("");

    careMore.classList.toggle(
      "is-hidden",
      !(list.length > state.visible)
    );

  }

  /* script.js calls this when the language changes */
  window.renderCare = renderCare;


  /* =========================================
     EVENTS
  ========================================= */

  locateButton.addEventListener("click", useMyLocation);

  careSearchForm.addEventListener("submit", searchByText);

  /* a new distance repeats the last search */
  careRadius.addEventListener("change", () => {

    if (!state.origin) return;

    const id = ++requestId;

    searchAround(state.origin, id);

  });

  careFilters.addEventListener("click", event => {

    const button = event.target.closest(".care-filter");

    if (!button) return;

    state.filter = button.dataset.filter;
    state.visible = PAGE_SIZE;
    renderCare();

  });

  careMore.addEventListener("click", () => {
    state.visible += PAGE_SIZE;
    renderCare();
  });


  renderCare();

})();
