/* =========================================
   DIACARE - DIET GUIDE (country-wise)

   For each country: a "healthy plate" built from local foods, a sample
   day, foods to go easy on, easy swaps and a local tip.

   The ideas follow widely used healthy-eating advice for blood sugar
   (the plate method: half non-starchy vegetables, a quarter protein,
   a quarter whole grains or starches; fibre-rich foods; fewer sugary
   drinks and refined foods). They are GENERAL ideas, not a personal
   meal plan, and the page says so.

   All content is stored as [English, Hindi] pairs.
   Lists are comma-separated text that is split into chips on screen.

   To add a country: copy one object in COUNTRIES, change the id,
   flag and texts. It appears automatically.

   Loaded AFTER script.js and re-uses: t(), tf(), escapeHtml(),
   currentLanguage, answers, getBmi().
========================================= */

(function () {

  "use strict";

  const grid = document.getElementById("countryGrid");

  if (!grid) return;

  const content = document.getElementById("dietContent");
  const personal = document.getElementById("dietPersonal");
  const prefToggle = document.getElementById("prefToggle");
  const printButton = document.getElementById("dietPrint");

  const lang = () => (currentLanguage === "hi" ? 1 : 0);


  /* =========================================
     DATA
  ========================================= */

  const COUNTRIES = [

    /* ---------------- INDIA ---------------- */
    {
      id: "in", flag: "🇮🇳",
      name: ["India", "भारत"],
      veg: [
        "Palak, methi, lauki, bhindi, cauliflower, cabbage, cucumber and tomato salad",
        "पालक, मेथी, लौकी, भिंडी, फूलगोभी, पत्तागोभी, खीरा-टमाटर का सलाद"
      ],
      carb: [
        "Jowar, bajra or ragi roti, whole-wheat roti, brown rice, millets, oats",
        "ज्वार, बाजरा या रागी की रोटी, गेहूं की रोटी, ब्राउन राइस, मोटे अनाज, ओट्स"
      ],
      proteinV: [
        "Dal, rajma, chana, sprouts, paneer, curd, soya chunks",
        "दाल, राजमा, चना, अंकुरित अनाज, पनीर, दही, सोया चंक्स"
      ],
      proteinN: [
        "Egg, grilled or curry fish, chicken curry with less oil, plus dal and curd",
        "अंडा, ग्रिल्ड या करी मछली, कम तेल की चिकन करी, साथ में दाल और दही"
      ],
      limit: [
        "Sugary chai, sweets and mithai, fried snacks like samosa and bhajiya, packaged namkeen, fruit juice, big portions of white rice",
        "चीनी वाली चाय, मिठाइयां, समोसा और भजिया जैसे तले स्नैक्स, पैकेट वाला नमकीन, फलों का जूस, सफ़ेद चावल की बड़ी मात्रा"
      ],
      day: {
        b: [
          "Moong dal or besan chilla with mint chutney and a small bowl of curd",
          "मूंग दाल या बेसन का चीला, पुदीने की चटनी और एक छोटी कटोरी दही"
        ],
        s: [
          "Roasted chana or a handful of nuts with unsweetened tea",
          "भुना चना या मुट्ठी भर मेवे, बिना चीनी की चाय के साथ"
        ],
        lv: [
          "2 jowar rotis, mixed vegetable sabzi, dal and cucumber salad",
          "2 ज्वार की रोटियां, मिक्स सब्ज़ी, दाल और खीरे का सलाद"
        ],
        ln: [
          "1 to 2 rotis, fish or chicken curry with less oil, dal and a big salad",
          "1 से 2 रोटी, कम तेल की मछली या चिकन करी, दाल और बड़ा सलाद"
        ],
        dv: [
          "Vegetable khichdi with plenty of vegetables, curd and salad",
          "ढेर सारी सब्ज़ियों वाली खिचड़ी, दही और सलाद"
        ],
        dn: [
          "Grilled chicken or egg bhurji with sauteed vegetables and 1 roti",
          "ग्रिल्ड चिकन या अंडा भुर्जी, भुनी सब्ज़ियां और 1 रोटी"
        ]
      },
      swaps: [
        [
          "White rice → a smaller portion of millets mixed with brown rice",
          "सफ़ेद चावल → मोटे अनाज में ब्राउन राइस मिलाकर कम मात्रा"
        ],
        [
          "Sugary chai or cold drink → plain buttermilk (chaas) or unsweetened tea",
          "चीनी वाली चाय या कोल्ड ड्रिंक → सादी छाछ या बिना चीनी की चाय"
        ]
      ],
      tip: [
        "Rice, roti and potato are all starches, so watch the total portion. Fill half the thali with sabzi and salad first.",
        "चावल, रोटी और आलू सभी स्टार्च हैं, इसलिए कुल मात्रा पर ध्यान दें। थाली का आधा हिस्सा पहले सब्ज़ी और सलाद से भरें।"
      ],
      regions: {
        north: [
          "Swap part of the wheat flour for besan or chana atta, and choose tandoori or grilled dishes over creamy gravies.",
          "गेहूं के आटे का कुछ हिस्सा बेसन या चना आटे से बदलें, और मलाईदार ग्रेवी की जगह तंदूरी या ग्रिल्ड व्यंजन चुनें।"
        ],
        south: [
          "Idli, dosa and rice are starch-heavy: pair them with sambar full of vegetables, keep rice portions small and try ragi dosa.",
          "इडली, डोसा और चावल स्टार्च वाले हैं: इन्हें सब्ज़ियों से भरे सांभर के साथ लें, चावल कम रखें और रागी डोसा आज़माएं।"
        ],
        west: [
          "Prefer jowar or bajra bhakri with pithla, usal or bhaji, and go easy on sweet farsan, jalebi and sweetened shrikhand.",
          "ज्वार या बाजरे की भाकरी के साथ पिठला, उसल या भाजी लें, और मीठे फरसाण, जलेबी व मीठे श्रीखंड से बचें।"
        ],
        east: [
          "Fish with greens suits this plate. Keep rice portions small and treat sweets like rasgulla as a rare treat.",
          "मछली और हरी सब्ज़ियां इस थाली के अनुकूल हैं। चावल कम रखें और रसगुल्ला जैसी मिठाइयों को कभी-कभार की चीज़ मानें।"
        ]
      }
    },

    /* ---------------- USA ---------------- */
    {
      id: "us", flag: "🇺🇸",
      name: ["United States", "अमेरिका"],
      veg: [
        "Leafy greens, broccoli, peppers, green beans, tomatoes, cauliflower, zucchini",
        "पत्तेदार साग, ब्रोकली, शिमला मिर्च, फ्रेंच बीन्स, टमाटर, फूलगोभी, ज़ुकीनी"
      ],
      carb: [
        "Oatmeal, whole-grain bread, brown rice, quinoa, sweet potato, corn tortillas",
        "ओटमील, साबुत अनाज की ब्रेड, ब्राउन राइस, क्विनोआ, शकरकंद, कॉर्न टॉर्टिला"
      ],
      proteinV: [
        "Beans, lentils, tofu, eggs, Greek yogurt, nuts",
        "बीन्स, दालें, टोफू, अंडे, ग्रीक योगर्ट, मेवे"
      ],
      proteinN: [
        "Grilled chicken, turkey, fish such as salmon, lean cuts of beef",
        "ग्रिल्ड चिकन, टर्की, सैल्मन जैसी मछली, कम चर्बी वाला बीफ़"
      ],
      limit: [
        "Soda and sweet coffee drinks, white bread and bagels, fries, pastries and donuts, sugary cereal, very large restaurant portions",
        "सोडा और मीठी कॉफ़ी, सफ़ेद ब्रेड और बैगल, फ्राइज़, पेस्ट्री और डोनट, मीठे सीरियल, रेस्तरां की बहुत बड़ी मात्रा"
      ],
      day: {
        b: [
          "Oatmeal with berries and nuts, or a veggie omelette with whole-grain toast",
          "बेरी और मेवों के साथ ओटमील, या सब्ज़ियों वाला ऑमलेट और साबुत अनाज का टोस्ट"
        ],
        s: [
          "Apple slices with peanut butter or a small handful of almonds",
          "सेब के टुकड़े पीनट बटर के साथ या मुट्ठी भर बादाम"
        ],
        lv: [
          "Big salad with chickpeas, olive oil dressing and a whole-grain wrap",
          "चना, ऑलिव ऑयल ड्रेसिंग और साबुत अनाज के रैप के साथ बड़ा सलाद"
        ],
        ln: [
          "Grilled chicken salad with beans and an apple",
          "बीन्स वाला ग्रिल्ड चिकन सलाद और एक सेब"
        ],
        dv: [
          "Bean and vegetable chili with a small side of brown rice",
          "बीन्स और सब्ज़ियों की चिली, साथ में थोड़ा ब्राउन राइस"
        ],
        dn: [
          "Baked salmon, roasted broccoli and a small sweet potato",
          "बेक्ड सैल्मन, भुनी ब्रोकली और एक छोटा शकरकंद"
        ]
      },
      swaps: [
        [
          "Soda → sparkling water with lemon",
          "सोडा → नींबू के साथ सादा सोडा वाटर"
        ],
        [
          "Fries → a side salad or roasted vegetables",
          "फ्राइज़ → साइड सलाद या भुनी सब्ज़ियां"
        ]
      ],
      tip: [
        "At restaurants, ask for dressings on the side, share large entrees and fill half your plate with vegetables first.",
        "रेस्तरां में ड्रेसिंग अलग से मांगें, बड़ी डिश बांटकर खाएं और पहले आधी प्लेट सब्ज़ियों से भरें।"
      ]
    },

    /* ---------------- UK ---------------- */
    {
      id: "uk", flag: "🇬🇧",
      name: ["United Kingdom", "यूनाइटेड किंगडम"],
      veg: [
        "Cabbage, broccoli, carrots, peas, leeks, spinach, mixed salad",
        "पत्तागोभी, ब्रोकली, गाजर, मटर, लीक, पालक, मिक्स सलाद"
      ],
      carb: [
        "Porridge oats, wholemeal bread, jacket potato with the skin, wholewheat pasta, brown rice",
        "पोरिज ओट्स, होलमील ब्रेड, छिलके सहित बेक्ड आलू, साबुत गेहूं का पास्ता, ब्राउन राइस"
      ],
      proteinV: [
        "Reduced-sugar baked beans, lentils, eggs, a little cheese, nuts, tofu",
        "कम चीनी वाली बेक्ड बीन्स, दालें, अंडे, थोड़ा पनीर-चीज़, मेवे, टोफू"
      ],
      proteinN: [
        "Grilled or baked fish, chicken, turkey, lean mince",
        "ग्रिल्ड या बेक्ड मछली, चिकन, टर्की, कम चर्बी वाला कीमा"
      ],
      limit: [
        "Sugary fizzy drinks and squash, biscuits and cakes, white bread, chips, pies and pastry, sweetened breakfast cereals",
        "मीठे फिज़ी ड्रिंक और स्क्वैश, बिस्कुट और केक, सफ़ेद ब्रेड, चिप्स, पाई और पेस्ट्री, मीठे नाश्ते वाले सीरियल"
      ],
      day: {
        b: [
          "Porridge made with water or semi-skimmed milk, topped with berries",
          "पानी या आधे मलाई-रहित दूध से बना पोरिज, ऊपर बेरी"
        ],
        s: [
          "A pear and a few unsalted nuts",
          "एक नाशपाती और कुछ बिना नमक के मेवे"
        ],
        lv: [
          "Lentil soup with a slice of wholemeal bread and salad",
          "दाल का सूप, होलमील ब्रेड का एक स्लाइस और सलाद"
        ],
        ln: [
          "Tuna and salad sandwich on wholemeal bread, with an apple",
          "होलमील ब्रेड पर ट्यूना और सलाद सैंडविच, साथ में एक सेब"
        ],
        dv: [
          "Jacket potato with beans and a side salad, with only a little butter",
          "बीन्स वाला बेक्ड आलू और साइड सलाद, मक्खन बहुत थोड़ा"
        ],
        dn: [
          "Grilled fish with boiled new potatoes and peas or greens",
          "ग्रिल्ड मछली, उबले छोटे आलू और मटर या हरी सब्ज़ियां"
        ]
      },
      swaps: [
        [
          "Chips → baked potato wedges or boiled potatoes",
          "चिप्स → बेक्ड आलू वेज या उबले आलू"
        ],
        [
          "Sugary squash → water or unsweetened tea",
          "मीठा स्क्वैश → पानी या बिना चीनी की चाय"
        ]
      ],
      tip: [
        "Fish and chips is fine as an occasional treat: keep the portion small, skip the extra chips and add peas or a side salad.",
        "फ़िश एंड चिप्स कभी-कभार ठीक है: मात्रा छोटी रखें, अतिरिक्त चिप्स छोड़ें और मटर या साइड सलाद जोड़ें।"
      ]
    },

    /* ---------------- JAPAN ---------------- */
    {
      id: "jp", flag: "🇯🇵",
      name: ["Japan", "जापान"],
      veg: [
        "Cabbage, spinach, daikon, mushrooms, seaweed, broccoli, cucumber",
        "पत्तागोभी, पालक, डाइकॉन (मूली), मशरूम, समुद्री शैवाल, ब्रोकली, खीरा"
      ],
      carb: [
        "A small bowl of rice (mixed-grain or brown if possible), soba noodles, barley rice",
        "चावल की एक छोटी कटोरी (हो सके तो मिश्रित अनाज या ब्राउन), सोबा नूडल्स, जौ वाला चावल"
      ],
      proteinV: [
        "Tofu, natto, edamame, eggs, miso soup with tofu",
        "टोफू, नाटो, एडामामे, अंडे, टोफू वाला मिसो सूप"
      ],
      proteinN: [
        "Grilled or steamed fish such as mackerel and salmon, chicken, sashimi",
        "मैकेरल और सैल्मन जैसी ग्रिल्ड या भाप में पकी मछली, चिकन, साशिमी"
      ],
      limit: [
        "Sweet canned coffee and sugary drinks, large servings of ramen noodles, tempura and fried foods, sweets like wagashi, very large bowls of white rice",
        "मीठी कैन वाली कॉफ़ी और मीठे पेय, रामेन नूडल्स की बड़ी मात्रा, टेम्पुरा और तले खाद्य, वागाशी जैसी मिठाइयां, सफ़ेद चावल के बहुत बड़े कटोरे"
      ],
      day: {
        b: [
          "Miso soup, natto, a small bowl of rice and a side of vegetables",
          "मिसो सूप, नाटो, चावल की एक छोटी कटोरी और सब्ज़ियां"
        ],
        s: [
          "Edamame or unsweetened green tea",
          "एडामामे या बिना चीनी की ग्रीन टी"
        ],
        lv: [
          "Soba noodles with vegetables and tofu",
          "सब्ज़ियों और टोफू के साथ सोबा नूडल्स"
        ],
        ln: [
          "Grilled fish set meal with vegetables, miso soup and a small bowl of rice",
          "ग्रिल्ड मछली का सेट भोजन, सब्ज़ियां, मिसो सूप और चावल की छोटी कटोरी"
        ],
        dv: [
          "Tofu and vegetable hot pot with a small bowl of rice",
          "टोफू और सब्ज़ियों का हॉट पॉट, साथ में चावल की छोटी कटोरी"
        ],
        dn: [
          "Steamed fish, seaweed salad, simmered vegetables and a small bowl of rice",
          "भाप में पकी मछली, समुद्री शैवाल का सलाद, उबली सब्ज़ियां और चावल की छोटी कटोरी"
        ]
      },
      swaps: [
        [
          "Large rice bowl → small bowl of mixed-grain rice",
          "चावल का बड़ा कटोरा → मिश्रित अनाज के चावल की छोटी कटोरी"
        ],
        [
          "Sweet canned coffee → unsweetened green or barley tea",
          "मीठी कैन वाली कॉफ़ी → बिना चीनी की ग्रीन टी या जौ की चाय"
        ]
      ],
      tip: [
        "Eating vegetables and protein before the rice may help many people avoid sharp rises in blood sugar.",
        "चावल से पहले सब्ज़ियां और प्रोटीन खाने से कई लोगों में ब्लड शुगर तेज़ी से बढ़ने से बचाव में मदद मिल सकती है।"
      ]
    },

    /* ---------------- MEXICO ---------------- */
    {
      id: "mx", flag: "🇲🇽",
      name: ["Mexico", "मेक्सिको"],
      veg: [
        "Nopales (cactus paddles), tomatoes, peppers, zucchini, leafy greens, cucumber, jicama",
        "नोपालेस (कैक्टस), टमाटर, शिमला मिर्च, ज़ुकीनी, पत्तेदार साग, खीरा, जिकामा"
      ],
      carb: [
        "Small corn tortillas, brown rice, whole-grain bread, a small bowl of hominy (pozole)",
        "छोटे मक्के के टॉर्टिला, ब्राउन राइस, साबुत अनाज की ब्रेड, पोज़ोले की छोटी कटोरी"
      ],
      proteinV: [
        "Black or pinto beans, lentils, eggs, a little cheese, pumpkin seeds",
        "काली या पिंटो बीन्स, दालें, अंडे, थोड़ा पनीर-चीज़, कद्दू के बीज"
      ],
      proteinN: [
        "Grilled chicken, fish, shrimp, lean beef",
        "ग्रिल्ड चिकन, मछली, झींगा, कम चर्बी वाला बीफ़"
      ],
      limit: [
        "Sodas and sweetened aguas frescas, sweet bread (pan dulce), fried tortilla chips, large flour tortillas, creamy sauces, sugary desserts",
        "सोडा और मीठे अगुआस फ्रेस्कास, मीठी ब्रेड (पान दुल्से), तले टॉर्टिला चिप्स, मैदे के बड़े टॉर्टिला, मलाईदार सॉस, मीठे डेज़र्ट"
      ],
      day: {
        b: [
          "Eggs with nopales and one corn tortilla, with salsa",
          "नोपालेस के साथ अंडे और एक मक्के का टॉर्टिला, साथ में सालसा"
        ],
        s: [
          "Jicama and cucumber sticks with lime and chili",
          "नींबू और मिर्च के साथ जिकामा और खीरे की स्टिक"
        ],
        lv: [
          "Black bean and vegetable soup with a corn tortilla",
          "काली बीन्स और सब्ज़ियों का सूप, साथ में मक्के का टॉर्टिला"
        ],
        ln: [
          "Grilled chicken tacos on small corn tortillas with lots of salad and salsa",
          "छोटे मक्के के टॉर्टिला पर ग्रिल्ड चिकन टैको, ढेर सारा सलाद और सालसा"
        ],
        dv: [
          "Baked (not fried) vegetable and bean tostada with salad",
          "बेक्ड (तला नहीं) सब्ज़ी और बीन्स का टोस्टादा, सलाद के साथ"
        ],
        dn: [
          "Grilled fish with cabbage slaw, salsa and a small portion of brown rice",
          "ग्रिल्ड मछली, पत्तागोभी स्लॉ, सालसा और थोड़ा ब्राउन राइस"
        ]
      },
      swaps: [
        [
          "Soda or sweet agua fresca → water with lime or unsweetened hibiscus tea",
          "सोडा या मीठा अगुआ फ्रेस्का → नींबू वाला पानी या बिना चीनी की हिबिस्कस चाय"
        ],
        [
          "Flour tortilla → small corn tortilla",
          "मैदे का टॉर्टिला → छोटा मक्के का टॉर्टिला"
        ]
      ],
      tip: [
        "Beans and nopales are fibre-rich staples: make them a daily habit and keep tortillas to two or three small ones.",
        "बीन्स और नोपालेस फाइबर से भरपूर मुख्य चीज़ें हैं: इन्हें रोज़ की आदत बनाएं और टॉर्टिला दो या तीन छोटे ही रखें।"
      ]
    },

    /* ---------------- ITALY / MEDITERRANEAN ---------------- */
    {
      id: "it", flag: "🇮🇹",
      name: ["Italy", "इटली"],
      veg: [
        "Tomatoes, zucchini, eggplant, leafy greens, artichokes, peppers, fennel",
        "टमाटर, ज़ुकीनी, बैंगन, पत्तेदार साग, आर्टिचोक, शिमला मिर्च, सौंफ़ कंद"
      ],
      carb: [
        "Whole-wheat pasta (small portion, al dente), farro, barley, whole-grain bread",
        "साबुत गेहूं का पास्ता (छोटी मात्रा, अल डेंटे), फ़ारो, जौ, साबुत अनाज की ब्रेड"
      ],
      proteinV: [
        "Chickpeas, lentils, white beans, a little ricotta, eggs, nuts",
        "चना, दालें, सफ़ेद बीन्स, थोड़ा रिकोटा, अंडे, मेवे"
      ],
      proteinN: [
        "Fish, seafood, chicken, a little lean meat",
        "मछली, समुद्री भोजन, चिकन, थोड़ा कम चर्बी वाला मांस"
      ],
      limit: [
        "Sugary drinks, pastries and sweet croissants, very large pasta and pizza servings, sweets and gelato, processed cured meats",
        "मीठे पेय, पेस्ट्री और मीठे क्रोसां, पास्ता और पिज़्ज़ा की बहुत बड़ी मात्रा, मिठाइयां और जिलेटो, प्रोसेस्ड नमकीन मांस"
      ],
      day: {
        b: [
          "Plain yogurt with nuts and fruit, or whole-grain toast with a little ricotta",
          "सादा दही, मेवे और फल, या थोड़े रिकोटा के साथ साबुत अनाज का टोस्ट"
        ],
        s: [
          "A few olives or almonds with a piece of fruit",
          "कुछ जैतून या बादाम और एक फल"
        ],
        lv: [
          "Minestrone or lentil soup with a slice of whole-grain bread",
          "मिनेस्ट्रोन या दाल का सूप, साथ में साबुत अनाज की ब्रेड का एक स्लाइस"
        ],
        ln: [
          "Grilled fish with a big mixed salad and a little whole-grain bread",
          "ग्रिल्ड मछली, बड़ा मिक्स सलाद और थोड़ी साबुत अनाज की ब्रेड"
        ],
        dv: [
          "A small bowl of whole-wheat pasta with vegetables and olive oil, plus salad",
          "सब्ज़ियों और ऑलिव ऑयल के साथ साबुत गेहूं के पास्ता की छोटी कटोरी, और सलाद"
        ],
        dn: [
          "Grilled chicken or fish with roasted vegetables and beans",
          "भुनी सब्ज़ियों और बीन्स के साथ ग्रिल्ड चिकन या मछली"
        ]
      },
      swaps: [
        [
          "Large plate of white pasta → half portion of whole-wheat pasta plus extra vegetables",
          "सफ़ेद पास्ता की बड़ी प्लेट → साबुत गेहूं के पास्ता की आधी मात्रा और अतिरिक्त सब्ज़ियां"
        ],
        [
          "Pastry breakfast → yogurt with nuts and fruit",
          "पेस्ट्री का नाश्ता → मेवे और फल के साथ दही"
        ]
      ],
      tip: [
        "This plate follows the Mediterranean way of eating (Italy, Greece, Spain). Olive oil is a healthy main fat, but measure it: it is calorie-dense, so a little goes a long way.",
        "यह थाली भूमध्यसागरीय खान-पान (इटली, ग्रीस, स्पेन) के अनुरूप है। ऑलिव ऑयल एक स्वस्थ मुख्य वसा है, लेकिन इसे नापकर डालें: इसमें कैलोरी अधिक होती है, इसलिए थोड़ा ही काफ़ी है।"
      ]
    },

    /* ---------------- CHINA ---------------- */
    {
      id: "cn", flag: "🇨🇳",
      name: ["China", "चीन"],
      veg: [
        "Bok choy, gai lan (Chinese broccoli), cabbage, mushrooms, bitter melon, eggplant, spinach",
        "बोक चॉय, गाई लान (चीनी ब्रोकली), पत्तागोभी, मशरूम, करेला, बैंगन, पालक"
      ],
      carb: [
        "Brown or mixed-grain rice in a small bowl, steamed corn, whole-wheat noodles, thin millet or oat congee",
        "छोटी कटोरी में ब्राउन या मिश्रित अनाज का चावल, भाप में पकी मक्का, साबुत गेहूं के नूडल्स, पतला बाजरा या ओट कांजी"
      ],
      proteinV: [
        "Tofu, edamame, eggs, unsweetened soy milk, mung beans",
        "टोफू, एडामामे, अंडे, बिना चीनी का सोया दूध, मूंग"
      ],
      proteinN: [
        "Steamed or braised fish, chicken, shrimp, lean pork",
        "भाप में पकी या ब्रेज़्ड मछली, चिकन, झींगा, कम चर्बी वाला पोर्क"
      ],
      limit: [
        "Sweet drinks and bubble tea, sweet sauces (like sweet-and-sour), deep-fried dishes, big portions of white rice and noodles, mooncakes and pastries",
        "मीठे पेय और बबल टी, मीठे सॉस (जैसे स्वीट-एंड-सावर), डीप-फ्राइड व्यंजन, सफ़ेद चावल और नूडल्स की बड़ी मात्रा, मूनकेक और पेस्ट्री"
      ],
      day: {
        b: [
          "Unsweetened soy milk with a boiled egg and a small whole-grain steamed bun",
          "बिना चीनी का सोया दूध, एक उबला अंडा और साबुत अनाज का छोटा भाप वाला बन"
        ],
        s: [
          "A small portion of fruit or a handful of unsalted nuts",
          "थोड़ा फल या मुट्ठी भर बिना नमक के मेवे"
        ],
        lv: [
          "Stir-fried tofu with mixed vegetables and a small bowl of brown rice",
          "मिक्स सब्ज़ियों के साथ स्टर-फ्राइड टोफू और ब्राउन राइस की छोटी कटोरी"
        ],
        ln: [
          "Steamed fish with stir-fried greens and a small bowl of mixed-grain rice",
          "भाप में पकी मछली, स्टर-फ्राइड हरी सब्ज़ियां और मिश्रित अनाज के चावल की छोटी कटोरी"
        ],
        dv: [
          "Tofu cooked with less oil, plus stir-fried bok choy",
          "कम तेल में बना टोफू और स्टर-फ्राइड बोक चॉय"
        ],
        dn: [
          "Chicken and vegetable stir-fry with little oil, and a clear soup",
          "कम तेल में चिकन और सब्ज़ियों की स्टर-फ्राई, साथ में साफ़ सूप"
        ]
      },
      swaps: [
        [
          "Bubble tea → unsweetened green, oolong or jasmine tea",
          "बबल टी → बिना चीनी की ग्रीन, ऊलोंग या चमेली की चाय"
        ],
        [
          "Bowl of white rice → half rice, half extra vegetables",
          "सफ़ेद चावल का कटोरा → आधा चावल, आधा अतिरिक्त सब्ज़ियां"
        ]
      ],
      tip: [
        "Choose steaming, boiling and light stir-frying over deep-frying, and go easy on salty sauces such as soy sauce.",
        "डीप-फ्राइंग की जगह भाप में पकाना, उबालना और हल्की स्टर-फ्राई चुनें, और सोया सॉस जैसे नमकीन सॉस कम लें।"
      ]
    },

    /* ---------------- MIDDLE EAST ---------------- */
    {
      id: "me", flag: "🌍",
      name: ["Middle East", "मध्य पूर्व"],
      veg: [
        "Cucumber and tomato salad, tabbouleh (more parsley, less bulgur), grilled eggplant, okra, leafy greens, zucchini",
        "खीरा-टमाटर सलाद, तबूले (ज़्यादा अजमोद, कम बुलगर), ग्रिल्ड बैंगन, भिंडी, पत्तेदार साग, ज़ुकीनी"
      ],
      carb: [
        "Whole-wheat pita (small), freekeh, bulgur, brown rice, barley",
        "साबुत गेहूं की पिटा (छोटी), फ्रीकेह, बुलगर, ब्राउन राइस, जौ"
      ],
      proteinV: [
        "Hummus, ful medames (fava beans), lentil soup, baked or grilled falafel, eggs, labneh",
        "हम्मस, फूल मेदामेस (बाकला), दाल का सूप, बेक्ड या ग्रिल्ड फलाफल, अंडे, लबनेह"
      ],
      proteinN: [
        "Grilled chicken or fish, shish tawook, a small portion of grilled lamb",
        "ग्रिल्ड चिकन या मछली, शिश तावूक, ग्रिल्ड मेमने की छोटी मात्रा"
      ],
      limit: [
        "Sweet drinks and heavily sweetened tea or coffee, pastries like baklava and kunafa, large rice dishes such as kabsa and biryani, fried snacks, large amounts of dates",
        "मीठे पेय और बहुत मीठी चाय या कॉफ़ी, बकलावा और कुनाफा जैसी पेस्ट्री, कबसा और बिरयानी जैसे चावल के बड़े व्यंजन, तले स्नैक्स, खजूर की अधिक मात्रा"
      ],
      day: {
        b: [
          "Ful medames or a boiled egg with cucumber, tomato and a small piece of whole-wheat bread",
          "फूल मेदामेस या उबला अंडा, खीरा, टमाटर और साबुत गेहूं की ब्रेड का एक छोटा टुकड़ा"
        ],
        s: [
          "Plain yogurt (laban) or a few nuts",
          "सादा दही (लबन) या कुछ मेवे"
        ],
        lv: [
          "Lentil soup with tabbouleh and a small whole-wheat pita",
          "तबूले के साथ दाल का सूप और छोटी साबुत गेहूं की पिटा"
        ],
        ln: [
          "Grilled chicken shish tawook with a big salad and hummus",
          "ग्रिल्ड चिकन शिश तावूक, बड़ा सलाद और हम्मस"
        ],
        dv: [
          "Okra or eggplant vegetable stew with a small portion of brown rice",
          "भिंडी या बैंगन की सब्ज़ी का स्टू, थोड़े ब्राउन राइस के साथ"
        ],
        dn: [
          "Grilled fish with grilled vegetables and a green salad",
          "ग्रिल्ड मछली, ग्रिल्ड सब्ज़ियां और हरा सलाद"
        ]
      },
      swaps: [
        [
          "Large serving of rice → a small portion mixed with extra vegetables",
          "चावल की बड़ी मात्रा → थोड़ा चावल अतिरिक्त सब्ज़ियों में मिलाकर"
        ],
        [
          "Sweet pastries → fresh fruit, or a couple of dates with nuts as an occasional treat",
          "मीठी पेस्ट्री → ताज़ा फल, या कभी-कभार मेवों के साथ दो खजूर"
        ]
      ],
      tip: [
        "If you fast (for example in Ramadan), break the fast gently with water and a small number of dates, then a balanced plate. Speak to your doctor first if you take diabetes medicines.",
        "यदि आप उपवास रखते हैं (जैसे रमज़ान में), तो पानी और कुछ खजूर से धीरे-धीरे उपवास खोलें, फिर संतुलित थाली लें। यदि आप डायबिटीज़ की दवाएं लेते हैं, तो पहले डॉक्टर से बात करें।"
      ]
    }

  ];

  const REGION_KEYS = ["north", "south", "west", "east"];
  const REGION_LABEL = {
    north: "regionNorth",
    south: "regionSouth",
    west: "regionWest",
    east: "regionEast"
  };


  /* =========================================
     STATE (remembered between visits)
  ========================================= */

  function remember(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) { /* storage blocked: not a problem */ }
  }

  const savedCountry = remember("diacareCountry", "in");

  const state = {
    country: COUNTRIES.some(c => c.id === savedCountry) ? savedCountry : "in",
    pref: remember("diacarePref", "veg") === "non" ? "non" : "veg",
    plate: "veg",
    region: "west"
  };

  const current = () => COUNTRIES.find(c => c.id === state.country);


  /* =========================================
     DRAWING
  ========================================= */

  function chips(text) {
    return text
      .split(",")
      .map(item => item.trim())
      .filter(Boolean)
      .map(item => `<span class="food-chip">${escapeHtml(item)}</span>`)
      .join("");
  }

  function renderCountries() {

    grid.innerHTML = COUNTRIES.map(country => `
      <button type="button"
        class="country-button${country.id === state.country ? " active" : ""}"
        data-country="${country.id}"
        aria-pressed="${country.id === state.country}">
        <span class="country-flag" aria-hidden="true">${country.flag}</span>
        <span>${escapeHtml(country.name[lang()])}</span>
      </button>`).join("");

    prefToggle.querySelectorAll(".mode-button").forEach(button => {
      const on = button.dataset.pref === state.pref;
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
    });

  }

  /* the plate: half vegetables, a quarter protein, a quarter grains */
  function plateSvg() {

    const slices = [
      { key: "veg",     d: "M120,120 L120,28 A92,92 0 0 0 120,212 Z",   icon: "🥬", x: 70,  y: 126 },
      { key: "protein", d: "M120,120 L120,28 A92,92 0 0 1 212,120 Z",   icon: "🍗", x: 168, y: 76 },
      { key: "carb",    d: "M120,120 L212,120 A92,92 0 0 1 120,212 Z",  icon: "🌾", x: 168, y: 170 }
    ];

    const label = {
      veg: t("plateVeg"),
      protein: t("plateProtein"),
      carb: t("plateCarb")
    };

    return `
      <svg class="plate-svg" viewBox="0 0 240 240" role="group"
           aria-label="${escapeHtml(t("plateSvgLabel"))}">
        <circle class="plate-rim" cx="120" cy="120" r="112"/>
        <circle class="plate-face" cx="120" cy="120" r="98"/>
        ${slices.map(slice => `
          <g class="slice slice-${slice.key}${state.plate === slice.key ? " active" : ""}"
             data-slice="${slice.key}" role="button" tabindex="0"
             aria-pressed="${state.plate === slice.key}"
             aria-label="${escapeHtml(label[slice.key])}">
            <path d="${slice.d}"/>
            <text x="${slice.x}" y="${slice.y}" text-anchor="middle"
                  dominant-baseline="central" class="slice-icon">${slice.icon}</text>
          </g>`).join("")}
      </svg>`;

  }

  function plateDetail(country) {

    const info = {
      veg: {
        title: t("plateVeg"),
        share: t("plateHalf"),
        items: country.veg[lang()]
      },
      protein: {
        title: t("plateProtein"),
        share: t("plateQuarter"),
        items: (state.pref === "veg" ? country.proteinV : country.proteinN)[lang()]
      },
      carb: {
        title: t("plateCarb"),
        share: t("plateQuarter"),
        items: country.carb[lang()]
      }
    }[state.plate];

    return `
      <div class="plate-detail plate-${state.plate}">
        <div class="plate-detail-head">
          <strong>${escapeHtml(info.title)}</strong>
          <span class="share-pill">${escapeHtml(info.share)}</span>
        </div>
        <div class="food-chips">${chips(info.items)}</div>
      </div>`;

  }

  function mealCard(icon, titleKey, text) {
    return `
      <div class="meal-card">
        <span class="meal-icon" aria-hidden="true">${icon}</span>
        <strong>${escapeHtml(t(titleKey))}</strong>
        <p>${escapeHtml(text)}</p>
      </div>`;
  }

  function swapLine(pair) {

    const [from, to] = pair[lang()].split("→").map(part => part.trim());

    return `
      <li class="swap">
        <span class="swap-from">${escapeHtml(from)}</span>
        <span class="swap-arrow" aria-hidden="true">→</span>
        <span class="swap-to">${escapeHtml(to)}</span>
      </li>`;

  }

  function regionCard(country) {

    if (!country.regions) return "";

    return `
      <div class="region-card">
        <h3>${escapeHtml(t("regionTitle"))}</h3>
        <div class="mode-switch compact" role="group">
          ${REGION_KEYS.map(key => `
            <button type="button"
              class="mode-button${state.region === key ? " active" : ""}"
              data-region="${key}"
              aria-pressed="${state.region === key}">
              ${escapeHtml(t(REGION_LABEL[key]))}
            </button>`).join("")}
        </div>
        <p>${escapeHtml(country.regions[state.region][lang()])}</p>
      </div>`;

  }

  function renderContent() {

    const country = current();
    const vegetarian = state.pref === "veg";

    content.innerHTML = `
      <div class="country-banner">
        <span class="country-flag big" aria-hidden="true">${country.flag}</span>
        <h3>${escapeHtml(country.name[lang()])}</h3>
      </div>

      <div class="plate-layout">

        <div class="plate-figure">${plateSvg()}</div>

        <div class="plate-info">
          <h3>${escapeHtml(t("plateTitle"))}</h3>
          <p class="plate-hint">${escapeHtml(t("plateHint"))}</p>
          ${plateDetail(country)}
        </div>

      </div>

      <h3 class="diet-subtitle">${escapeHtml(t("dayTitle"))}</h3>

      <div class="meal-grid">
        ${mealCard("☀️", "mealBreakfast", country.day.b[lang()])}
        ${mealCard("🍛", "mealLunch", (vegetarian ? country.day.lv : country.day.ln)[lang()])}
        ${mealCard("🍎", "mealSnack", country.day.s[lang()])}
        ${mealCard("🌙", "mealDinner", (vegetarian ? country.day.dv : country.day.dn)[lang()])}
      </div>

      <div class="diet-two">

        <div class="limit-card">
          <h3>${escapeHtml(t("limitTitle"))}</h3>
          <div class="food-chips limit">${chips(country.limit[lang()])}</div>
        </div>

        <div class="swaps-card">
          <h3>${escapeHtml(t("swapsTitle"))}</h3>
          <ul class="swap-list">${country.swaps.map(swapLine).join("")}</ul>
        </div>

      </div>

      <div class="tip-card">
        <strong>💡 ${escapeHtml(t("tipTitle"))}</strong>
        <p>${escapeHtml(country.tip[lang()])}</p>
      </div>

      ${regionCard(country)}
    `;

  }


  /* ----- tips from the Risk Check answers ----- */

  function renderPersonal() {

    const lines = [];

    const bmi = typeof getBmi === "function" ? getBmi() : null;

    if (bmi !== null && bmi >= 25) {
      lines.push(tf("personalBmi", { bmi: bmi.toFixed(1) }));
    }

    if (answers.bp === "yes") {
      lines.push(t("personalBp"));
    }

    if (answers.activity === "0" || answers.activity === "1") {
      lines.push(t("personalActivity"));
    }

    if (answers.family === "yes") {
      lines.push(t("personalFamily"));
    }

    const anyAnswer =
      bmi !== null ||
      ["bp", "activity", "family"].some(key => answers[key]);

    if (lines.length === 0 && anyAnswer) {
      lines.push(t("personalGood"));
    }

    if (!anyAnswer) {

      personal.innerHTML = `
        <div class="personal-card empty">
          <strong>🎯 ${escapeHtml(t("personalTitle"))}</strong>
          <p>${escapeHtml(t("personalEmpty"))}</p>
          <a class="btn btn-primary" href="#/check">${escapeHtml(t("personalLink"))}</a>
        </div>`;

      return;

    }

    personal.innerHTML = `
      <div class="personal-card">
        <strong>🎯 ${escapeHtml(t("personalTitle"))}</strong>
        <ul>${lines.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      </div>`;

  }

  function renderAll() {
    renderCountries();
    renderContent();
    renderPersonal();
  }


  /* =========================================
     EVENTS
  ========================================= */

  grid.addEventListener("click", event => {

    const button = event.target.closest(".country-button");

    if (!button) return;

    state.country = button.dataset.country;
    save("diacareCountry", state.country);

    renderCountries();
    renderContent();

    content.classList.remove("fx-swap");
    void content.offsetWidth;
    content.classList.add("fx-swap");

  });

  prefToggle.addEventListener("click", event => {

    const button = event.target.closest(".mode-button");

    if (!button) return;

    state.pref = button.dataset.pref;
    save("diacarePref", state.pref);

    renderCountries();
    renderContent();

  });

  content.addEventListener("click", event => {

    const slice = event.target.closest(".slice");

    if (slice) {
      state.plate = slice.dataset.slice;
      renderContent();
      return;
    }

    const region = event.target.closest("[data-region]");

    if (region) {
      state.region = region.dataset.region;
      renderContent();
    }

  });

  content.addEventListener("keydown", event => {

    if (event.key !== "Enter" && event.key !== " ") return;

    const slice = event.target.closest(".slice");

    if (slice) {
      event.preventDefault();
      state.plate = slice.dataset.slice;
      renderContent();

      /* keep keyboard focus on the slice that was just chosen */
      const again = content.querySelector(`.slice[data-slice="${state.plate}"]`);
      if (again) again.focus();
    }

  });

  printButton.addEventListener("click", () => window.print());

  document.addEventListener("diacare:language", renderAll);

  /* refresh the personal tips each time the page opens */
  document.addEventListener("diacare:page", event => {
    if (event.detail.page === "diet") renderPersonal();
  });

  renderAll();

})();
