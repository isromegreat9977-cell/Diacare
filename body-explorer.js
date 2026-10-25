/* =========================================
   DIACARE - BODY EXPLORER

   1. An interactive 2D body. Tap an organ to learn:
        - how it normally works
        - what long-term high blood sugar can do to it
        - how to protect it
      The three "views" also recolour the body and change how much
      sugar (glucose) is drawn travelling through the blood.

   2. "Insulin and the cell": a small animation of sugar entering a
      cell in a healthy body, in type 2 (insulin resistance) and in
      type 1 (very little insulin).

   All text is general education, written for a lay audience, and is
   stored below as [English, Hindi] pairs.

   Loaded AFTER script.js and re-uses: t(), tf(), escapeHtml(),
   currentLanguage.
========================================= */

(function () {

  "use strict";

  const stage = document.getElementById("bodyStage");

  if (!stage) return;

  const panel = document.getElementById("organPanel");
  const chipBox = document.getElementById("organChips");
  const stepLabel = document.getElementById("organStep");
  const prevButton = document.getElementById("organPrev");
  const nextButton = document.getElementById("organNext");
  const modeSwitch = document.getElementById("modeSwitch");

  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 0 = English, 1 = Hindi */
  const lang = () => (currentLanguage === "hi" ? 1 : 0);


  /* =========================================
     ORGAN CONTENT   [English, Hindi]
  ========================================= */

  const ORGANS = [

    {
      id: "brain", emoji: "🧠",
      name: ["Brain", "मस्तिष्क"],
      normal: [
        "The brain runs mainly on glucose and needs a steady supply to think clearly, focus and stay alert.",
        "मस्तिष्क मुख्य रूप से ग्लूकोज़ से चलता है और साफ़ सोचने, ध्यान लगाने और सतर्क रहने के लिए उसे लगातार आपूर्ति चाहिए।"
      ],
      diabetes: [
        "Swings in blood sugar can cause tiredness, trouble concentrating and mood changes. Very low sugar can cause confusion, and over many years diabetes is linked to a higher risk of stroke and memory problems.",
        "ब्लड शुगर के उतार-चढ़ाव से थकान, ध्यान लगाने में कठिनाई और मूड में बदलाव हो सकते हैं। बहुत कम शुगर से भ्रम हो सकता है, और कई वर्षों में डायबिटीज़ स्ट्रोक और याददाश्त की समस्याओं के अधिक जोखिम से जुड़ी है।"
      ],
      protect: [
        "Keep blood sugar, blood pressure and cholesterol in check, stay active, sleep well and avoid tobacco. These habits protect the brain's blood vessels.",
        "ब्लड शुगर, रक्तचाप और कोलेस्ट्रॉल को नियंत्रण में रखें, सक्रिय रहें, अच्छी नींद लें और तंबाकू से बचें। ये आदतें मस्तिष्क की रक्त वाहिकाओं की रक्षा करती हैं।"
      ],
      signs: [
        "Unusual tiredness, trouble concentrating, confusion. Sudden weakness, face drooping or speech trouble need urgent help.",
        "असामान्य थकान, ध्यान लगाने में कठिनाई, भ्रम। अचानक कमज़ोरी, चेहरा टेढ़ा होना या बोलने में कठिनाई हो तो तुरंत सहायता लें।"
      ]
    },

    {
      id: "eyes", emoji: "👁️",
      name: ["Eyes", "आंखें"],
      normal: [
        "The retina at the back of the eye has tiny blood vessels that deliver oxygen so you can see clearly.",
        "आंख के पीछे रेटिना में छोटी रक्त वाहिकाएं होती हैं जो ऑक्सीजन पहुंचाती हैं ताकि आप साफ़ देख सकें।"
      ],
      diabetes: [
        "Over time, high blood sugar can damage these tiny vessels (diabetic retinopathy). There may be no symptoms at first, then blurred vision or dark spots, and it can lead to vision loss. Diabetes also raises the chance of cataracts and glaucoma.",
        "समय के साथ अधिक ब्लड शुगर इन छोटी वाहिकाओं को नुकसान पहुंचा सकती है (डायबिटिक रेटिनोपैथी)। शुरू में कोई लक्षण नहीं हो सकते, फिर धुंधलापन या काले धब्बे दिख सकते हैं और दृष्टि जा सकती है। डायबिटीज़ से मोतियाबिंद और ग्लूकोमा की संभावना भी बढ़ती है।"
      ],
      protect: [
        "Have a dilated eye exam at least once a year after diagnosis (or as advised) and keep blood sugar and blood pressure well controlled. Early treatment can protect sight.",
        "निदान के बाद साल में कम से कम एक बार पुतली फैलाकर आंखों की जांच करवाएं (या सलाह के अनुसार) और ब्लड शुगर व रक्तचाप नियंत्रित रखें। जल्दी इलाज से दृष्टि बचाई जा सकती है।"
      ],
      signs: [
        "Blurry or changing vision, floaters or dark patches, trouble seeing at night.",
        "धुंधली या बदलती दृष्टि, आंखों के आगे तैरते धब्बे या काले हिस्से, रात में देखने में कठिनाई।"
      ]
    },

    {
      id: "heart", emoji: "🫀",
      name: ["Heart & blood vessels", "हृदय और रक्त वाहिकाएं"],
      normal: [
        "The heart pumps blood through arteries and veins, carrying oxygen and sugar to every part of the body.",
        "हृदय धमनियों और शिराओं के ज़रिए रक्त पंप करता है, जो शरीर के हर हिस्से तक ऑक्सीजन और शुगर पहुंचाता है।"
      ],
      diabetes: [
        "High blood sugar over many years can damage blood vessel walls and the nerves that control the heart. Together with high blood pressure and cholesterol, this raises the risk of heart attack, stroke and poor circulation.",
        "कई वर्षों तक अधिक ब्लड शुगर रक्त वाहिकाओं की दीवारों और हृदय को नियंत्रित करने वाली नसों को नुकसान पहुंचा सकती है। उच्च रक्तचाप और कोलेस्ट्रॉल के साथ मिलकर यह हार्ट अटैक, स्ट्रोक और खराब रक्त संचार का जोखिम बढ़ाती है।"
      ],
      protect: [
        "Stay active, eat plenty of vegetables, fibre and healthy fats, stay tobacco-free, and have blood pressure and cholesterol checked. Take any prescribed medicines as advised.",
        "सक्रिय रहें, भरपूर सब्ज़ियां, फाइबर और स्वस्थ वसा खाएं, तंबाकू से दूर रहें, और रक्तचाप व कोलेस्ट्रॉल की जांच करवाएं। निर्धारित दवाएं सलाह के अनुसार लें।"
      ],
      signs: [
        "Chest pain or pressure, breathlessness, swelling in the legs. Seek medical help promptly.",
        "सीने में दर्द या दबाव, सांस फूलना, पैरों में सूजन। तुरंत चिकित्सा सहायता लें।"
      ]
    },

    {
      id: "liver", emoji: "🟤",
      name: ["Liver", "यकृत (लिवर)"],
      normal: [
        "The liver stores sugar and releases it between meals, which keeps your blood sugar steady.",
        "लिवर शुगर को जमा करता है और भोजन के बीच छोड़ता है, जिससे ब्लड शुगर स्थिर रहती है।"
      ],
      diabetes: [
        "With insulin resistance the liver can release too much sugar into the blood. Extra fat can also build up in the liver (fatty liver), which is common in type 2 diabetes and often causes no symptoms.",
        "इंसुलिन प्रतिरोध में लिवर रक्त में ज़रूरत से ज़्यादा शुगर छोड़ सकता है। लिवर में अतिरिक्त वसा भी जम सकती है (फैटी लिवर), जो टाइप 2 डायबिटीज़ में आम है और अक्सर कोई लक्षण नहीं देती।"
      ],
      protect: [
        "A healthy weight, regular activity, fewer sugary drinks and little or no alcohol help the liver. Ask your doctor about liver checks if you have risk factors.",
        "स्वस्थ वज़न, नियमित गतिविधि, कम मीठे पेय और कम या बिल्कुल नहीं शराब लिवर की मदद करते हैं। जोखिम कारक हों तो डॉक्टर से लिवर जांच के बारे में पूछें।"
      ],
      signs: [
        "Fatty liver often has no signs. Sometimes tiredness or discomfort in the upper right belly.",
        "फैटी लिवर में अक्सर कोई संकेत नहीं होते। कभी-कभी थकान या पेट के ऊपरी दाएं हिस्से में बेचैनी।"
      ]
    },

    {
      id: "pancreas", emoji: "🥜",
      name: ["Pancreas", "अग्न्याशय (पैंक्रियास)"],
      normal: [
        "The pancreas makes insulin, the hormone that moves sugar from the blood into your cells for energy.",
        "पैंक्रियास इंसुलिन बनाता है, वह हार्मोन जो रक्त से शुगर को ऊर्जा के लिए आपकी कोशिकाओं में पहुंचाता है।"
      ],
      diabetes: [
        "In type 1 diabetes the immune system destroys the insulin-making cells. In type 2 the body resists insulin, so the pancreas works harder and over time may not keep up, and blood sugar rises.",
        "टाइप 1 डायबिटीज़ में प्रतिरक्षा तंत्र इंसुलिन बनाने वाली कोशिकाओं को नष्ट कर देता है। टाइप 2 में शरीर इंसुलिन का प्रतिरोध करता है, इसलिए पैंक्रियास को ज़्यादा मेहनत करनी पड़ती है, समय के साथ वह साथ नहीं दे पाता और ब्लड शुगर बढ़ती है।"
      ],
      protect: [
        "For type 2 and prediabetes, a healthy weight, regular activity and balanced meals reduce the load on the pancreas. Type 1 needs insulin from the start and cannot be prevented by lifestyle.",
        "टाइप 2 और प्रीडायबिटीज़ में स्वस्थ वज़न, नियमित गतिविधि और संतुलित भोजन पैंक्रियास पर बोझ घटाते हैं। टाइप 1 में शुरू से इंसुलिन चाहिए और इसे जीवनशैली से रोका नहीं जा सकता।"
      ],
      signs: [
        "Increased thirst and urination, tiredness, blurred vision, unexplained weight loss.",
        "अधिक प्यास और पेशाब, थकान, धुंधली दृष्टि, बिना कारण वज़न घटना।"
      ]
    },

    {
      id: "kidneys", emoji: "🫘",
      name: ["Kidneys", "गुर्दे (किडनी)"],
      normal: [
        "The kidneys filter waste and extra water from the blood and make urine. They contain millions of tiny filters.",
        "गुर्दे रक्त से अपशिष्ट और अतिरिक्त पानी छानकर मूत्र बनाते हैं। इनमें लाखों छोटे फ़िल्टर होते हैं।"
      ],
      diabetes: [
        "High blood sugar and high blood pressure can damage the tiny filters (diabetic kidney disease). It usually causes no symptoms until it is advanced, so testing matters.",
        "अधिक ब्लड शुगर और उच्च रक्तचाप इन छोटे फ़िल्टरों को नुकसान पहुंचा सकते हैं (डायबिटिक किडनी रोग)। यह आमतौर पर बढ़ने तक कोई लक्षण नहीं देता, इसलिए जांच ज़रूरी है।"
      ],
      protect: [
        "Get kidney tests (urine and blood) at least yearly, keep blood sugar and blood pressure on target, limit salt and avoid tobacco. Early treatment slows damage.",
        "साल में कम से कम एक बार किडनी की जांच (मूत्र और रक्त) करवाएं, ब्लड शुगर और रक्तचाप लक्ष्य में रखें, नमक सीमित करें और तंबाकू से बचें। जल्दी इलाज से नुकसान धीमा होता है।"
      ],
      signs: [
        "Usually none early on. Later: foamy urine, swelling in the feet or around the eyes, tiredness.",
        "शुरू में आमतौर पर कोई नहीं। बाद में: झागदार मूत्र, पैरों या आंखों के आसपास सूजन, थकान।"
      ]
    },

    {
      id: "muscles", emoji: "💪",
      name: ["Muscles", "मांसपेशियां"],
      normal: [
        "Muscles use sugar for movement. Insulin helps sugar enter muscle cells, and exercise helps muscles take sugar in even when there is less insulin.",
        "मांसपेशियां गति के लिए शुगर का उपयोग करती हैं। इंसुलिन शुगर को मांसपेशी कोशिकाओं में जाने में मदद करता है, और व्यायाम इंसुलिन कम होने पर भी मांसपेशियों को शुगर लेने में मदद करता है।"
      ],
      diabetes: [
        "In insulin resistance, muscle cells respond poorly to insulin, so less sugar goes in and more stays in the blood. Low muscle mass and inactivity make this worse.",
        "इंसुलिन प्रतिरोध में मांसपेशी कोशिकाएं इंसुलिन पर ठीक से प्रतिक्रिया नहीं करतीं, इसलिए कम शुगर अंदर जाती है और ज़्यादा रक्त में रहती है। कम मांसपेशी और निष्क्रियता इसे और बिगाड़ते हैं।"
      ],
      protect: [
        "Walking, cycling and strength exercises make muscles more sensitive to insulin. Even a short walk after meals helps many people.",
        "टहलना, साइकिल चलाना और ताकत वाले व्यायाम मांसपेशियों को इंसुलिन के प्रति अधिक संवेदनशील बनाते हैं। भोजन के बाद थोड़ी देर टहलना भी कई लोगों की मदद करता है।"
      ],
      signs: [
        "Often none. Reduced stamina and tiring easily.",
        "अक्सर कोई नहीं। सहनशक्ति कम होना और जल्दी थक जाना।"
      ]
    },

    {
      id: "nerves", emoji: "⚡",
      name: ["Nerves", "नसें (तंत्रिकाएं)"],
      normal: [
        "Nerves carry signals between your brain, hands, feet and organs, letting you feel touch, heat and pain.",
        "तंत्रिकाएं आपके मस्तिष्क, हाथों, पैरों और अंगों के बीच संकेत ले जाती हैं, जिससे आप स्पर्श, गर्मी और दर्द महसूस करते हैं।"
      ],
      diabetes: [
        "High blood sugar can damage nerves (neuropathy), especially in the feet and hands, causing tingling, burning pain or numbness. Loss of feeling means injuries can go unnoticed.",
        "अधिक ब्लड शुगर तंत्रिकाओं को नुकसान पहुंचा सकती है (न्यूरोपैथी), खासकर पैरों और हाथों में, जिससे झुनझुनी, जलन वाला दर्द या सुन्नपन होता है। महसूस न होने से चोटें पता नहीं चलतीं।"
      ],
      protect: [
        "Keep blood sugar in the target range, avoid tobacco, limit alcohol, and tell your doctor early about tingling or numbness. Treatment can ease symptoms.",
        "ब्लड शुगर लक्ष्य सीमा में रखें, तंबाकू से बचें, शराब सीमित करें, और झुनझुनी या सुन्नपन के बारे में डॉक्टर को जल्दी बताएं। इलाज से लक्षणों में राहत मिल सकती है।"
      ],
      signs: [
        "Tingling, burning or shooting pain, numbness, or loss of feeling in the hands and feet.",
        "हाथों और पैरों में झुनझुनी, जलन या चुभने वाला दर्द, सुन्नपन या महसूस न होना।"
      ]
    },

    {
      id: "feet", emoji: "🦶",
      name: ["Feet & skin", "पैर और त्वचा"],
      normal: [
        "Healthy skin and good blood flow help cuts and blisters heal quickly.",
        "स्वस्थ त्वचा और अच्छा रक्त प्रवाह कट और छालों को जल्दी भरने में मदद करते हैं।"
      ],
      diabetes: [
        "Poor circulation and nerve damage mean small cuts can heal slowly, get infected and turn into ulcers, sometimes without pain. Foot problems are a leading reason for hospital stays in diabetes.",
        "खराब रक्त संचार और तंत्रिका क्षति से छोटे कट धीरे भरते हैं, संक्रमित हो सकते हैं और घाव बन सकते हैं, कभी-कभी बिना दर्द के। डायबिटीज़ में पैरों की समस्याएं अस्पताल में भर्ती होने के प्रमुख कारणों में हैं।"
      ],
      protect: [
        "Check your feet daily, wash and dry them (including between the toes), moisturise, wear well-fitting shoes and never walk barefoot. See a doctor for any sore that does not heal.",
        "रोज़ अपने पैर जांचें, उन्हें धोकर सुखाएं (उंगलियों के बीच भी), मॉइस्चराइज़ करें, सही नाप के जूते पहनें और नंगे पांव न चलें। जो घाव न भरे उसके लिए डॉक्टर को दिखाएं।"
      ],
      signs: [
        "Cuts or blisters that heal slowly, redness, swelling, dry cracked skin, or a wound you cannot feel.",
        "धीरे भरने वाले कट या छाले, लालिमा, सूजन, सूखी फटी त्वचा, या ऐसा घाव जो महसूस न हो।"
      ]
    }

  ];

  /* where the pulsing tap-dots sit (SVG coordinates) */
  const PINS = {
    brain:    [[160, 34]],
    eyes:     [[160, 62]],
    heart:    [[176, 166]],
    liver:    [[136, 224]],
    pancreas: [[166, 266]],
    kidneys:  [[120, 298], [200, 298]],
    muscles:  [[135, 448], [185, 448]],
    nerves:   [[46, 352], [274, 352]],
    feet:     [[132, 626], [188, 626]]
  };

  /* blood vessels the sugar particles travel along */
  const VESSELS = {
    head: "M170,150 C168,120 164,96 160,72",
    aorta: "M172,184 C170,230 164,300 160,368",
    armL: "M164,146 C130,118 84,150 56,340",
    armR: "M176,146 C210,118 256,150 264,340",
    legL: "M160,368 C146,430 138,520 132,616",
    legR: "M160,368 C174,430 182,520 188,616"
  };

  /* how many sugar particles flow in each view */
  const PARTICLES = { normal: 6, diabetes: 18, protect: 8 };

  let mode = "normal";
  let selected = ORGANS.findIndex(organ => organ.id === "pancreas");


  /* =========================================
     THE BODY (SVG)
  ========================================= */

  /* Body parts drawn twice: first as an outline, then as the fill,
     so overlapping parts do not show lines inside the silhouette. */
  function bodyShapes(kind) {

    const outline = kind === "outline";

    const fillAttr = outline
      ? 'fill="var(--body-line)" stroke="var(--body-line)" stroke-width="4" stroke-linejoin="round"'
      : 'fill="var(--body-fill)"';

    const limb = (d, width) => `
      <path d="${d}" fill="none" stroke-linecap="round"
        stroke="${outline ? "var(--body-line)" : "var(--body-fill)"}"
        stroke-width="${outline ? width + 4 : width}"/>`;

    return `
      <circle cx="160" cy="50" r="34" ${fillAttr}/>
      <rect x="148" y="78" width="24" height="32" rx="8" ${fillAttr}/>
      <path d="M96,112 Q160,96 224,112 Q238,130 234,190 L222,300 Q220,340 214,372 L106,372 Q100,340 98,300 L86,190 Q82,130 96,112 Z" ${fillAttr}/>
      ${limb("M96,124 Q64,150 54,230 Q48,290 46,338", 26)}
      ${limb("M224,124 Q256,150 266,230 Q272,290 274,338", 26)}
      <circle cx="46" cy="350" r="13" ${fillAttr}/>
      <circle cx="274" cy="350" r="13" ${fillAttr}/>
      <path d="M106,366 L158,366 L153,520 L148,612 L116,612 L113,520 Z" ${fillAttr}/>
      <path d="M214,366 L162,366 L167,520 L172,612 L204,612 L207,520 Z" ${fillAttr}/>
      <ellipse cx="132" cy="626" rx="24" ry="11" ${fillAttr}/>
      <ellipse cx="188" cy="626" rx="24" ry="11" ${fillAttr}/>
    `;

  }

  /* one organ = shapes + pulsing pins + a roomy invisible tap area */
  function organShapes(id) {

    const shape = (inner) => inner;

    switch (id) {

      case "brain":
        return shape(`
          <ellipse class="shape" cx="160" cy="36" rx="25" ry="16"/>
          <path class="detail" d="M160,21 L160,51 M146,28 Q152,34 146,42 M174,28 Q168,34 174,42"/>`);

      case "eyes":
        return shape(`
          <ellipse class="shape" cx="147" cy="62" rx="9" ry="6"/>
          <ellipse class="shape" cx="173" cy="62" rx="9" ry="6"/>
          <circle class="pupil" cx="147" cy="62" r="2.6"/>
          <circle class="pupil" cx="173" cy="62" r="2.6"/>`);

      case "heart":
        /* position on the wrapper so the beat animation (a CSS
           transform) does not overwrite it */
        return shape(`
          <g transform="translate(176,166)">
            <path class="shape heartbeat"
              d="M0,17 C-30,-4 -19,-32 0,-15 C19,-32 30,-4 0,17 Z"/>
          </g>`);

      case "liver":
        return shape(`
          <path class="shape" d="M98,206 Q130,194 180,210 Q172,238 140,246 Q106,244 98,206 Z"/>`);

      case "pancreas":
        return shape(`
          <path class="shape" d="M130,264 Q156,252 202,258 Q208,268 198,274 Q160,272 136,278 Q124,274 130,264 Z"/>`);

      case "kidneys":
        return shape(`
          <ellipse class="shape" cx="120" cy="298" rx="11" ry="21" transform="rotate(10 120 298)"/>
          <ellipse class="shape" cx="200" cy="298" rx="11" ry="21" transform="rotate(-10 200 298)"/>`);

      case "muscles":
        return shape(`
          <ellipse class="shape muscle" cx="135" cy="448" rx="18" ry="56"/>
          <ellipse class="shape muscle" cx="185" cy="448" rx="18" ry="56"/>`);

      case "nerves":
        return shape(`
          <path class="nerve" d="M108,126 Q80,170 62,240 Q54,300 48,346"/>
          <path class="nerve" d="M212,126 Q240,170 258,240 Q266,300 272,346"/>
          <path class="nerve" d="M160,104 L160,366"/>
          <circle class="shape" cx="46" cy="350" r="9"/>
          <circle class="shape" cx="274" cy="350" r="9"/>`);

      case "feet":
        return shape(`
          <ellipse class="shape" cx="132" cy="626" rx="20" ry="8"/>
          <ellipse class="shape" cx="188" cy="626" rx="20" ry="8"/>`);

    }

    return "";

  }

  function buildBody() {

    const organs = ORGANS.map((organ, index) => {

      const pins = PINS[organ.id].map(([x, y]) => `
        <g class="pin" transform="translate(${x},${y})">
          <circle class="pin-ring" r="9"/>
          <circle class="pin-dot" r="4"/>
          <circle class="hit" r="${organ.id === "eyes" ? 11 : 16}"/>
        </g>`).join("");

      return `
        <g class="organ${index === selected ? " selected" : ""}"
           data-index="${index}"
           role="button" tabindex="0"
           aria-pressed="${index === selected}"
           aria-label="${escapeHtml(organ.name[lang()])}">
          <title>${escapeHtml(organ.name[lang()])}</title>
          ${organShapes(organ.id)}
          ${pins}
        </g>`;

    }).join("");

    const vessels = Object.entries(VESSELS).map(([key, d]) =>
      `<path id="bx-v-${key}" class="vessel" d="${d}"/>`).join("");

    return `
      <svg class="body-svg" data-mode="${mode}"
           viewBox="0 0 320 660" role="group"
           aria-label="${escapeHtml(t("bodySvgLabel"))}">

        <g class="silhouette">${bodyShapes("outline")}${bodyShapes("fill")}</g>

        <g class="gut">
          <path d="M118,318 Q160,306 202,318 Q210,356 160,366 Q112,356 118,318 Z"/>
          <path d="M178,198 Q206,202 204,228 Q200,246 182,240 Q172,226 178,198 Z"/>
        </g>

        <g class="vessels">${vessels}</g>

        <g class="organs">${organs}</g>

        <g class="particles" id="bxParticles"></g>

      </svg>`;

  }

  /* sugar particles travelling along the vessels */
  function drawParticles() {

    const group = document.getElementById("bxParticles");

    if (!group) return;

    const keys = Object.keys(VESSELS);
    const total = PARTICLES[mode];

    let html = "";

    for (let i = 0; i < total; i++) {

      const key = keys[i % keys.length];
      const duration = 5 + (i % 4);
      const begin = -((i * 1.7) % duration).toFixed(2);

      html += `
        <circle class="glu-dot" r="3">
          <animateMotion dur="${duration}s" begin="${begin}s"
                         repeatCount="indefinite">
            <mpath href="#bx-v-${key}"/>
          </animateMotion>
        </circle>`;

    }

    group.innerHTML = html;

    const svg = stage.querySelector("svg");

    if (reducedMotion && svg && svg.pauseAnimations) {
      svg.pauseAnimations();
    }

  }


  /* =========================================
     PANEL, CHIPS, NAVIGATION
  ========================================= */

  const MODE_HEAD = {
    normal: "modeNormalHead",
    diabetes: "modeDiabetesHead",
    protect: "modeProtectHead"
  };

  function renderPanel(animate) {

    const organ = ORGANS[selected];
    const text = organ[mode][lang()];

    panel.innerHTML = `
      <div class="organ-head">
        <span class="organ-emoji" aria-hidden="true">${organ.emoji}</span>
        <div>
          <h3>${escapeHtml(organ.name[lang()])}</h3>
          <span class="mode-pill mode-${mode}">
            ${escapeHtml(t(MODE_HEAD[mode]))}
          </span>
        </div>
      </div>

      <p class="organ-text">${escapeHtml(text)}</p>

      ${mode === "diabetes" ? `
        <div class="signs-box">
          <strong>${escapeHtml(t("bodySigns"))}</strong>
          <p>${escapeHtml(organ.signs[lang()])}</p>
        </div>` : ""}
    `;

    if (animate) {
      panel.classList.remove("fx-swap");
      void panel.offsetWidth;
      panel.classList.add("fx-swap");
    }

    stepLabel.textContent = tf("bodyStep", {
      n: selected + 1,
      total: ORGANS.length
    });

  }

  function renderChips() {

    chipBox.innerHTML = ORGANS.map((organ, index) => `
      <button type="button"
        class="organ-chip${index === selected ? " active" : ""}"
        data-index="${index}"
        aria-pressed="${index === selected}">
        <span aria-hidden="true">${organ.emoji}</span>
        ${escapeHtml(organ.name[lang()])}
      </button>`).join("");

  }

  function select(index, animate = true) {

    selected = (index + ORGANS.length) % ORGANS.length;

    stage.querySelectorAll(".organ").forEach(element => {
      const on = Number(element.dataset.index) === selected;
      element.classList.toggle("selected", on);
      element.setAttribute("aria-pressed", String(on));
    });

    renderChips();
    renderPanel(animate);

  }

  function setMode(newMode) {

    mode = newMode;

    stage.querySelector("svg").dataset.mode = mode;

    modeSwitch.querySelectorAll(".mode-button").forEach(button => {
      const on = button.dataset.mode === mode;
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
    });

    drawParticles();
    renderPanel(true);

  }

  function renderAll() {

    stage.innerHTML = buildBody();
    drawParticles();
    renderChips();
    renderPanel(false);

    modeSwitch.querySelectorAll(".mode-button").forEach(button => {
      const on = button.dataset.mode === mode;
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
    });

  }


  /* ----- events ----- */

  stage.addEventListener("click", event => {
    const organ = event.target.closest(".organ");
    if (organ) select(Number(organ.dataset.index));
  });

  stage.addEventListener("keydown", event => {

    if (event.key !== "Enter" && event.key !== " ") return;

    const organ = event.target.closest(".organ");

    if (organ) {
      event.preventDefault();
      select(Number(organ.dataset.index));
    }

  });

  chipBox.addEventListener("click", event => {
    const chip = event.target.closest(".organ-chip");
    if (chip) select(Number(chip.dataset.index));
  });

  prevButton.addEventListener("click", () => select(selected - 1));
  nextButton.addEventListener("click", () => select(selected + 1));

  modeSwitch.addEventListener("click", event => {
    const button = event.target.closest(".mode-button");
    if (button) setMode(button.dataset.mode);
  });


  /* =========================================
     INSULIN AND THE CELL
  ========================================= */

  const cellStage = document.getElementById("cellStage");
  const cellTabs = document.getElementById("cellTabs");
  const cellReplay = document.getElementById("cellReplay");
  const cellCaption = document.getElementById("cellCaption");
  const meterFill = document.getElementById("meterFill");
  const meterText = document.getElementById("meterText");

  const GATES_X = [60, 150, 240, 330];

  /* open       - which doors open
     insulinAt  - where insulin "keys" sit (index into doors)
     extraKeys  - extra insulin floating around (type 2 makes more)
     inside     - how many of the 12 sugar particles get into the cell
     level      - blood sugar bar (percent) */
  const CELL_STATES = {
    healthy: { open: [0, 1, 2, 3], keys: [0, 1, 2, 3], extra: 0, inside: 9, level: 30, high: false, caption: "cellCapHealthy" },
    t2:      { open: [1],          keys: [0, 1, 2, 3], extra: 3, inside: 3, level: 82, high: true,  caption: "cellCapT2" },
    t1:      { open: [],           keys: [],           extra: 0, inside: 0, level: 96, high: true,  caption: "cellCapT1" }
  };

  const GLUCOSE_COUNT = 12;

  let cellState = "healthy";

  /* blood positions (before / when sugar stays in the blood) */
  function bloodPosition(i) {
    return {
      x: 28 + (i % 6) * 62 + (i >= 6 ? 30 : 0),
      y: i < 6 ? 34 : 68
    };
  }

  /* where a sugar particle ends up inside the cell */
  function cellPosition(k, gateX) {
    const offsets = [-22, 0, 22, -11, 11, 0, -22, 22, 0];
    return {
      x: gateX + offsets[k % offsets.length],
      y: 140 + (k % 3) * 28
    };
  }

  function buildCell() {

    const state = CELL_STATES[cellState];
    const doorWidth = 34;

    /* membrane in pieces between the doors */
    let edge = 0;
    let membrane = "";

    GATES_X.forEach(x => {
      membrane += `<rect class="membrane" x="${edge}" y="100" width="${x - doorWidth / 2 - edge}" height="12" rx="3"/>`;
      edge = x + doorWidth / 2;
    });

    membrane += `<rect class="membrane" x="${edge}" y="100" width="${390 - edge}" height="12" rx="3"/>`;

    const doors = GATES_X.map((x, i) => `
      <rect class="door${state.open.includes(i) ? " open" : ""}"
            x="${x - doorWidth / 2}" y="100" width="${doorWidth}" height="12" rx="3"/>
    `).join("");

    const keys = state.keys.map(i => `
      <g class="key" transform="translate(${GATES_X[i]},84)">
        <circle r="6"/><rect x="-2" y="4" width="4" height="12" rx="2"/>
      </g>`).join("") +
      Array.from({ length: state.extra }, (_, n) => {
        const x = GATES_X[(n * 2 + 1) % 4] + (n % 2 ? 16 : -16);
        return `<g class="key extra" transform="translate(${x},62)">
          <circle r="5"/><rect x="-1.6" y="3" width="3.2" height="10" rx="1.6"/>
        </g>`;
      }).join("");

    const dots = Array.from({ length: GLUCOSE_COUNT }, (_, i) =>
      `<g class="glu-g" data-i="${i}"><circle class="glu" r="5"/></g>`).join("");

    return `
      <svg class="cell-svg" viewBox="0 0 390 240" role="img"
           aria-label="${escapeHtml(t("cellSvgLabel"))}">
        <rect class="blood-bg" x="0" y="0" width="390" height="100"/>
        <rect class="cell-bg" x="0" y="112" width="390" height="128"/>
        <text class="cell-label" x="10" y="16">${escapeHtml(t("cellBlood"))}</text>
        <text class="cell-label" x="10" y="230">${escapeHtml(t("cellInside"))}</text>
        ${membrane}
        ${doors}
        ${keys}
        ${dots}
      </svg>`;

  }

  /* where each particle should rest for the current state */
  function targets() {

    const state = CELL_STATES[cellState];

    return Array.from({ length: GLUCOSE_COUNT }, (_, i) => {

      const start = bloodPosition(i);

      if (i < state.inside && state.open.length) {

        const gateX = GATES_X[state.open[i % state.open.length]];
        const end = cellPosition(i, gateX);

        return { start, gateX, end, enters: true };

      }

      return { start, end: start, enters: false };

    });

  }

  function placeDots(animate) {

    const list = targets();

    cellStage.querySelectorAll(".glu-g").forEach(element => {

      const item = list[Number(element.dataset.i)];

      const at = p => `translate(${p.x}px, ${p.y}px)`;

      element.style.transform = at(item.end);

      if (animate && !reducedMotion && item.enters && element.animate) {

        element.animate(
          [
            { transform: at(item.start) },
            { transform: at({ x: item.gateX, y: 96 }), offset: 0.45 },
            { transform: at({ x: item.gateX, y: 124 }), offset: 0.62 },
            { transform: at(item.end) }
          ],
          {
            duration: 2600,
            delay: Number(element.dataset.i) * 240,
            easing: "ease-in-out",
            fill: "backwards"
          }
        );

      }

    });

  }

  function renderCell(animate) {

    const state = CELL_STATES[cellState];

    cellStage.innerHTML = buildCell();
    placeDots(animate);

    meterFill.style.width = `${state.level}%`;
    meterFill.classList.toggle("high", state.high);
    meterText.textContent = t(state.high ? "meterHigh" : "meterNormal");
    meterText.classList.toggle("high", state.high);

    cellCaption.textContent = t(state.caption);

    cellTabs.querySelectorAll(".mode-button").forEach(button => {
      const on = button.dataset.cell === cellState;
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
    });

  }

  cellTabs.addEventListener("click", event => {

    const button = event.target.closest(".mode-button");

    if (!button) return;

    cellState = button.dataset.cell;
    renderCell(true);

  });

  cellReplay.addEventListener("click", () => renderCell(true));


  /* =========================================
     LANGUAGE + START
  ========================================= */

  document.addEventListener("diacare:language", () => {
    renderAll();
    renderCell(false);
  });

  /* play the sugar animation when the page first opens */
  document.addEventListener("diacare:page", event => {
    if (event.detail.page === "body") {
      renderCell(true);
    }
  });

  renderAll();
  renderCell(false);

})();
