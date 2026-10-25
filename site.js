/* =========================================
   DIACARE - SITE.JS
   Multi-page behaviour for the whole site.

   The site is ONE html file with several "pages" (views).
   The address decides which page is visible:

       index.html#/home    index.html#/learn   index.html#/body
       index.html#/diet    index.html#/check   index.html#/care

   Old links such as #quiz, #learn, #testing or #find-care still work:
   the router finds which page that section lives on, shows that page
   and scrolls to the section.

   Each page's sections carry data-page="...". The CSS in style.css
   hides every page except the one named on <html data-page="...">.

   Loaded AFTER script.js and re-uses: t(), currentLanguage.
========================================= */

(function () {

  "use strict";

  const PAGES = ["home", "learn", "body", "diet", "check", "care"];

  const root = document.documentElement;
  const nav = document.getElementById("mainNav");
  const header = document.querySelector(".site-header");
  const toTop = document.getElementById("toTop");

  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");


  /* =========================================
     ROUTER
  ========================================= */

  /* "#/body" -> body page.  "#quiz" -> the page that contains #quiz. */
  function parse(hash) {

    const named = (hash || "").match(/^#\/(\w+)/);

    if (named) {
      return {
        page: PAGES.includes(named[1]) ? named[1] : "home",
        targetId: null
      };
    }

    const id = decodeURIComponent((hash || "").replace(/^#/, ""));

    if (!id) {
      return { page: "home", targetId: null };
    }

    const element = document.getElementById(id);
    const host = element && element.closest("[data-page]");

    return {
      page: host ? host.dataset.page : "home",
      targetId: element ? id : null
    };

  }

  function markNav(page) {

    nav.querySelectorAll("a").forEach(link => {

      const active =
        parse(link.getAttribute("href")).page === page;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }

    });

  }

  function setTitle() {

    const page = root.dataset.page;
    const link = nav.querySelector("a.active");

    document.title =
      page === "home" || !link
        ? "DiaCare | Diabetes Awareness"
        : `DiaCare | ${link.textContent.trim()}`;

  }

  function route(first) {

    const { page, targetId } = parse(location.hash);

    const changed = root.dataset.page !== page;

    root.dataset.page = page;

    markNav(page);
    setTitle();

    if (changed || first) {

      /* replay the fade-in on the sections that are now visible */
      document
        .querySelectorAll(`main > [data-page="${page}"]`)
        .forEach(section => {
          section.classList.remove("page-enter");
          void section.offsetWidth;
          section.classList.add("page-enter");
        });

      const target = targetId && document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }

    }

    if (changed || first) {
      document.dispatchEvent(
        new CustomEvent("diacare:page", { detail: { page } })
      );
    }

  }

  window.addEventListener("hashchange", () => route(false));


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  document
    .querySelectorAll(".quick-card, .section-heading")
    .forEach((element, index) => {
      element.classList.add("reveal");
      element.style.transitionDelay = `${(index % 6) * 60}ms`;
    });

  if ("IntersectionObserver" in window && !reducedMotion) {

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);

            /* the stagger delay must not linger on hover effects */
            setTimeout(() => {
              entry.target.style.transitionDelay = "";
            }, 900);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach(element => {
      observer.observe(element);
    });

  } else {

    /* no observer / reduced motion: just show everything */
    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("in-view");
    });

  }


  /* =========================================
     "DID YOU KNOW?" FACTS (home page)
  ========================================= */

  const factText = document.getElementById("factText");
  const factDots = document.getElementById("factDots");
  const factPrev = document.getElementById("factPrev");
  const factNext = document.getElementById("factNext");
  const factsCard = document.getElementById("facts");

  const FACT_KEYS = ["fact1", "fact2", "fact3", "fact4", "fact5"];

  let factIndex = 0;
  let factTimer = null;

  function renderFact() {

    factText.textContent = t(FACT_KEYS[factIndex]);

    factDots.innerHTML = FACT_KEYS.map((key, index) => `
      <button
        type="button"
        class="facts-dot${index === factIndex ? " active" : ""}"
        data-index="${index}"
        aria-label="${index + 1} / ${FACT_KEYS.length}"
        aria-current="${index === factIndex}"
      ></button>
    `).join("");

    factPrev.setAttribute("aria-label", t("factPrev"));
    factNext.setAttribute("aria-label", t("factNext"));

  }

  function showFact(index) {

    factIndex = (index + FACT_KEYS.length) % FACT_KEYS.length;

    factText.classList.remove("fx-swap");
    void factText.offsetWidth;
    factText.classList.add("fx-swap");

    renderFact();

  }

  function startFactTimer() {

    stopFactTimer();

    if (reducedMotion) return;

    factTimer = setInterval(() => showFact(factIndex + 1), 8000);

  }

  function stopFactTimer() {
    clearInterval(factTimer);
    factTimer = null;
  }

  if (factText) {

    factPrev.addEventListener("click", () => {
      showFact(factIndex - 1);
      startFactTimer();
    });

    factNext.addEventListener("click", () => {
      showFact(factIndex + 1);
      startFactTimer();
    });

    factDots.addEventListener("click", event => {
      const dot = event.target.closest(".facts-dot");

      if (dot) {
        showFact(Number(dot.dataset.index));
        startFactTimer();
      }
    });

    /* pause while the person is reading / interacting */
    factsCard.addEventListener("mouseenter", stopFactTimer);
    factsCard.addEventListener("mouseleave", startFactTimer);
    factsCard.addEventListener("focusin", stopFactTimer);
    factsCard.addEventListener("focusout", startFactTimer);

    renderFact();
    startFactTimer();

  }


  /* =========================================
     HEADER SHADOW + BACK-TO-TOP
  ========================================= */

  function onScroll() {

    header.classList.toggle("scrolled", window.scrollY > 8);
    toTop.classList.toggle("visible", window.scrollY > 600);

  }

  window.addEventListener("scroll", onScroll, { passive: true });

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function labelToTop() {
    toTop.setAttribute("aria-label", t("backToTop"));
    toTop.title = t("backToTop");
  }


  /* =========================================
     LANGUAGE CHANGE
  ========================================= */

  document.addEventListener("diacare:language", () => {
    renderFact();
    labelToTop();
    setTitle();
  });


  /* =========================================
     START
  ========================================= */

  labelToTop();
  onScroll();
  route(true);

})();
