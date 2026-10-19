/* =========================================
   DIACARE
   Main JavaScript
========================================= */


/* =========================================
   LANGUAGE SYSTEM
========================================= */

const translations = {

  en: {

    navHome: "Home",
    navLearn: "Learn",
    navTesting: "Testing",
    navQuiz: "Quiz",
    navPlan: "My Plan",

    heroEyebrow: "Diabetes Awareness",

    heroTitle:
      "Understand diabetes. Make informed choices.",

    heroText:
      "DiaCare helps you learn about diabetes, understand common symptoms and explore different ways glucose can be checked.",

    startQuiz:
      "Start Awareness Quiz",

    exploreLearn:
      "Explore Information",

    heroNote:
      "This website is for education and awareness. The quiz cannot diagnose diabetes.",

    heroCardTitle:
      "Learn • Check • Understand",

    heroCardText:
      "Explore diabetes information and create your own personalized awareness plan.",

    questions:
      "Questions",

    quickLearnTitle:
      "Learn",

    quickLearnText:
      "Understand the basics",

    quickTestingTitle:
      "Explore Testing",

    quickTestingText:
      "Compare testing approaches",

    quickQuizTitle:
      "Take Quiz",

    quickQuizText:
      "Get personalized guidance",

    learnEyebrow:
      "Learn",

    learnTitle:
      "Diabetes, explained simply",

    learnText:
      "Understanding diabetes starts with knowing what glucose, insulin and common symptoms mean.",

    whatDiabetesTitle:
      "What is diabetes?",

    whatDiabetesText:
      "Diabetes is a group of conditions that affect how the body manages blood glucose. Glucose is an important source of energy for the body.",

    typesTitle:
      "Main types",

    typesText:
      "The main types include type 1 diabetes, type 2 diabetes and gestational diabetes. They have different causes and management approaches.",

    symptomsTitle:
      "Common signs",

    symptomsText:
      "Increased thirst, frequent urination, tiredness and changes in vision can occur with diabetes, although these symptoms can also have other causes.",

    supportTitle:
      "Healthy habits",

    supportText:
      "Regular movement, balanced meals, adequate sleep and appropriate healthcare can support overall health.",

    testingEyebrow:
      "Explore",

    testingTitle:
      "How can diabetes be checked?",

    testingText:
      "Explore the difference between non-invasive approaches and minimally invasive methods.",

    nonInvasiveTab:
      "🌿 Non-invasive",

    minimallyInvasiveTab:
      "🩸 Minimally invasive",

    nonInvasiveTitle:
      "Non-invasive approaches",

    nonInvasiveText:
      "Non-invasive approaches do not require taking blood from the body. Some technologies are being researched to estimate glucose using signals such as light or other measurements.",

    noBloodTitle:
      "No blood sample",

    noBloodText:
      "The method does not require a blood draw or finger-prick.",

    comfortTitle:
      "Comfort-focused",

    comfortText:
      "These approaches aim to make glucose monitoring easier and more comfortable.",

    evolvingTitle:
      "Technology is evolving",

    evolvingText:
      "Many non-invasive glucose technologies are still being researched or have limitations.",

    rememberTitle:
      "Remember:",

    nonInvasiveNote:
      "A non-invasive device should not automatically be assumed to diagnose diabetes. Medical diagnosis requires appropriate clinical assessment and validated testing.",

    minimallyTitle:
      "Minimally invasive methods",

    minimallyText:
      "These methods use a small blood sample or another measurement that involves a minor procedure. They are commonly used to measure glucose more directly.",

    fingerTitle:
      "Finger-prick testing",

    fingerText:
      "A small blood sample can be used with a glucose meter to measure blood glucose.",

    bloodTestTitle:
      "Blood tests",

    bloodTestText:
      "Healthcare professionals can use laboratory tests to assess blood glucose and other markers.",

    monitoringTitle:
      "Continuous monitoring",

    monitoringText:
      "Some glucose-monitoring systems use a small sensor placed under the skin to continuously estimate glucose levels.",

    importantTitle:
      "Important:",

    minimallyNote:
      "The right test depends on the person's situation. A healthcare professional can explain which test is appropriate.",

    knowledgeTitle:
      "Quick knowledge check",

    knowledgeQuestion:
      "Which approach requires a blood sample?",

    knowledgeOption1:
      "🌿 Non-invasive",

    knowledgeOption2:
      "🩸 Blood-based testing",

    quizEyebrow:
      "Interactive Quiz",

    quizTitle:
      "Check your awareness",

    quizText:
      "Answer a few questions about measurable risk factors, then add symptoms if you like. You will get an educational risk estimate, not a diagnosis.",

    back:
      "← Back",

    next:
      "Next →",

    livePlanTitle:
      "Your live plan",

    livePlanText:
      "Your recommendations will update as you answer.",

    liveEmpty:
      "Answer a question to begin creating your plan.",

    decisionTitle:
      "Your decisions",

    decisionEmpty:
      "Your answers will appear here.",

    resultEyebrow:
      "Your DiaCare Summary",

    restart:
      "Take Quiz Again",

    disclaimerTitle:
      "Important",

    disclaimerText:
      "DiaCare is an educational awareness website. This quiz does not diagnose diabetes and should not replace advice, testing or assessment from a qualified healthcare professional. If you are concerned about symptoms, talk to a parent, guardian, trusted adult or healthcare professional.",

    footerText:
      "Learn. Understand. Take informed steps.",

    footerDisclaimer:
      "Created for diabetes awareness and education.",

    yes:
      "Yes",

    no:
      "No",

    resultLow:
      "Your answers did not show several of the symptoms included in this awareness quiz. However, this quiz cannot rule out diabetes.",

    resultFollow:
      "Some of your answers included symptoms or factors worth discussing with a trusted adult or healthcare professional. Your answers do not diagnose diabetes.",

    resultMany:
      "Several of your answers included symptoms that can occur with diabetes. Consider discussing these answers with a trusted adult and a healthcare professional. Only appropriate medical assessment and testing can determine whether diabetes is present.",

    /* ---------- RISK ASSESSMENT (new) ---------- */

    partRisk:
      "Part 1 of 2 · Prediabetes Risk Assessment",

    partSymptoms:
      "Part 2 of 2 · Symptoms & Awareness (optional)",

    symptomsNote:
      "Optional. These answers are not used to calculate your risk estimate.",

    skipSymptoms:
      "Skip symptom questions →",

    skip:
      "Skip →",

    seeResults:
      "See Results →",

    errRequired:
      "Please answer this question to continue.",

    errAge:
      "Please enter a whole number between {min} and {max}. This assessment is designed for adults aged {min}–{max}.",

    errHeightCm:
      "Please enter a height between 100 and 250 cm.",

    errHeightFtIn:
      "Please enter a valid height: feet (about 3–8) and inches (0–11).",

    errWeightKg:
      "Please enter a weight between 30 and 300 kg.",

    errWeightLb:
      "Please enter a weight between 66 and 660 lb.",

    errBmi:
      "These values give a BMI of {bmi}, which looks unrealistic. Please double-check your height and weight.",

    unitYears: "years",
    unitCm: "cm",
    unitKg: "kg",
    unitLb: "lb",
    labelFt: "ft",
    labelIn: "in",
    unitToggleCm: "cm",
    unitToggleFtIn: "ft & in",
    unitToggleKg: "kg",
    unitToggleLb: "lb",

    bmiTitle:
      "Your BMI (calculated automatically)",

    bmiShort:
      "BMI (calculated)",

    bmiWaiting:
      "Enter a valid weight to see your BMI.",

    bmiUnder:
      "Below the usual healthy range",

    bmiHealthy:
      "Within the usual healthy range",

    bmiOver:
      "In the overweight range",

    bmiObese:
      "In the obesity range",

    bmiNote:
      "BMI is a rough screening measure and does not describe body composition.",

    riskLabel:
      "Your estimated prediabetes risk is:",

    riskLow: "LOW",
    riskModerate: "MODERATE",
    riskHigh: "HIGH",

    riskLowText:
      "Based on the information you entered, most common risk factors were not present. This does not rule out prediabetes, which often has no symptoms.",

    riskModerateText:
      "Some common risk factors were present. Consider asking a healthcare professional whether a simple blood test (such as HbA1c) would be useful for you.",

    riskHighText:
      "Several common risk factors were present. Consider speaking with a healthcare professional about a blood test (such as HbA1c). This is not a diagnosis.",

    resultPendingTitle:
      "Calculating your estimate…",

    resultPendingText:
      "Please wait a moment.",

    resultErrorTitle:
      "Risk estimate unavailable",

    resultErrorText:
      "We couldn't get a risk estimate right now. Your answers have not been lost, so you can try again.",

    retry:
      "Try again",

    sourceMock:
      "🧪 Demo mode: this estimate comes from a simple illustrative scoring rule used while the machine-learning model is being connected. It is not a trained prediction.",

    sourceModel:
      "This estimate was produced by a statistical model trained on national health-survey data. It is a screening estimate, not your personal medical probability.",

    modelScore:
      "Model score: {score} (a relative score, not a medical probability)",

    factorsTitle:
      "What contributed to this estimate?",

    factorsIntro:
      "These are the general risk factors this tool looks at. They explain your result in simple terms; they are not exact model weights. Your sex was also taken into account (unless you chose not to say).",

    factorAge: "Age",
    factorBmi: "BMI",
    factorFamily: "Family history",
    factorBp: "Blood pressure",
    factorActivity: "Physical activity",

    tagHigher: "May raise risk",
    tagNeutral: "No added risk here",
    tagLower: "Tends to lower risk",

    factorAgeLow:
      "Younger adults generally have a lower risk, although risk rises gradually over time.",

    factorAgeMid:
      "Risk of prediabetes rises gradually with age.",

    factorAgeHigh:
      "Risk of prediabetes is higher after about age 45.",

    factorBmiUnder:
      "Your BMI is below the usual healthy range. Low weight is not a typical prediabetes risk factor, but it is worth discussing if it is unintentional.",

    factorBmiHealthy:
      "Your BMI is in the usual healthy range, which tends to go with a lower risk.",

    bmiSouthAsianNote:
      "Some guidelines use a lower cut-off (from 23) for South Asian adults.",

    factorBmiOver:
      "Your BMI is in the overweight range. Extra body weight is one of the most common risk factors.",

    factorBmiObese:
      "Your BMI is in the obesity range. Higher body weight is strongly linked with higher risk.",

    factorFamilyYes:
      "Having a close relative with diabetes can raise your risk.",

    factorFamilyNo:
      "You reported no close relative with diabetes, so this did not add to your estimate.",

    factorBpYes:
      "A history of high blood pressure often goes together with a higher risk.",

    factorBpNo:
      "You reported no history of high blood pressure, so this did not add to your estimate.",

    factorActNone:
      "Very little regular activity is linked with a higher risk.",

    factorActSome:
      "Some activity helps, but many guidelines suggest about 150 minutes a week of moderate activity.",

    factorActGood:
      "You reported about 150 minutes a week or more. Regular activity tends to lower risk.",

    tipsTitle:
      "Tips based on your answers",

    symptomTitle:
      "Symptoms & awareness",

    symptomIntro:
      "Prediabetes often has no noticeable symptoms, so symptoms alone cannot show whether it is present. These answers are for awareness only and were not used in your risk estimate.",

    symptomSkipped:
      "You skipped the optional symptom questions.",

    resultDisclaimer:
      "This assessment is for educational and risk-awareness purposes only. It does not diagnose diabetes or prediabetes. A blood test and consultation with a healthcare professional are required for diagnosis.",

    recAge:
      "🎂 Risk of prediabetes tends to rise with age, so regular health check-ups become more useful over time.",

    recSexUnspecified:
      "🧑 You chose not to share your sex. The estimate is calculated without relying on this answer.",

    recBmi:
      "⚖️ Your BMI is {bmi} ({category}). BMI is only a rough guide, but it is one of the factors used in this assessment.",

    recBpYes:
      "🩺 You reported a history of high blood pressure. It is worth mentioning when you discuss diabetes screening with a healthcare professional.",

    recBpNo:
      "🩺 You reported no history of high blood pressure. Regular blood pressure checks are still part of general health.",

    recAct0:
      "🚶 You reported less than 30 minutes of activity a week. Age- and health-appropriate activity you enjoy can be a useful part of overall health.",

    recAct1:
      "🚶 You reported 30–149 minutes of activity a week. Many guidelines suggest around 150 minutes a week of moderate activity, if it is suitable for you.",

    recAct2:
      "🚶 You reported 150–299 minutes a week, which meets a commonly used guideline. Keep going with activities you enjoy.",

    recAct3:
      "🚶 You reported 300 minutes or more a week. Regular activity supports overall health; balance it with rest.",

    /* ---------- NEW AWARENESS QUESTIONS: advice lines ---------- */

    recHungerYes:
      "🍽️ You reported feeling much hungrier than usual. This can have many causes; if it is new or keeps happening, consider mentioning it to a healthcare professional.",
    recHungerNo:
      "🍽️ You selected no for unusually strong hunger.",

    recWeightYes:
      "📉 You reported losing weight without trying. Unintentional weight loss is worth discussing with a healthcare professional, whatever the cause.",
    recWeightNo:
      "📉 You selected no for unexplained weight loss.",

    recTinglingYes:
      "🖐️ You reported tingling, numbness or pain in your hands or feet. This has many possible causes; if it continues, a healthcare professional can help find out why.",
    recTinglingNo:
      "🖐️ You selected no for tingling, numbness or pain in your hands or feet.",

    recSkinYes:
      "🧴 You noticed dark, velvety skin patches. These can be linked to insulin resistance and other conditions, so they are worth showing to a healthcare professional.",
    recSkinNo:
      "🧴 You selected no for dark, velvety skin patches.",

    recSugaryYes:
      "🥤 You reported sugary drinks or sweets on most days. Cutting back gradually is a simple habit change that supports overall health.",
    recSugaryNo:
      "🥤 You reported not having sugary drinks or sweets on most days. Keeping this habit supports overall health.",

    recTestedYes:
      "🧪 You have had a blood sugar test in the last 3 years. Keep your results handy and ask a healthcare professional how often to repeat it.",
    recTestedNo:
      "🧪 You have not had a blood sugar test in the last 3 years. If you have risk factors, ask a healthcare professional whether a test makes sense for you. The Find Care section below can help you locate a centre.",


    /* ---------- CHARTS ---------- */

    chartsTitle:
      "Your results at a glance",

    chartsIntro:
      "These charts only summarise your own answers. They are not a diagnosis and not a probability of having diabetes.",

    chartFactorsTitle:
      "Your risk-factor profile",

    chartSymptomsTitle:
      "Symptom awareness answers",

    chartSkipped:
      "Skipped",

    chartFactorsCenter:
      "factors",

    chartSymptomsCenter:
      "questions",

    chartFactorsLabel:
      "Donut chart of your five risk factors",

    chartSymptomsLabel:
      "Donut chart of your symptom answers",


    /* ---------- FIND CARE ---------- */

    navCare:
      "Find Care",

    careCtaText:
      "Thinking about getting checked? Find hospitals, clinics and labs near you.",

    careCtaButton:
      "Find nearby centres",

    careEyebrow:
      "Find Care",

    careTitle:
      "Find diabetes testing near you",

    careText:
      "Search for nearby hospitals, clinics and diagnostic labs where a blood test such as HbA1c or fasting glucose may be available.",

    careLocate:
      "📍 Use my location",

    careOr:
      "or",

    careSearchPlaceholder:
      "City or area, e.g. Pimpri, Pune",

    careSearchLabel:
      "Search by city or area",

    careSearchButton:
      "Search",

    careRadiusLabel:
      "Search distance",

    careLocating:
      "Getting your location…",

    careGeocoding:
      "Looking up that place…",

    careSearching:
      "Searching for places near {place}…",

    careDenied:
      "Location permission was blocked. You can type your city or area instead.",

    careUnsupported:
      "Your browser cannot share its location. Please type your city or area instead.",

    careInsecure:
      "Location only works on a secure (https) page. Please type your city or area instead.",

    careLocationFailed:
      "We could not get your location. Please type your city or area instead.",

    careNeedQuery:
      "Please type a city or area first.",

    careNotFound:
      "We could not find that place. Try a nearby city name.",

    careError:
      "The map service did not respond. Please try again in a moment, or use the Google Maps link below.",

    careNone:
      "No hospitals, clinics or labs were found within {km} km. Try a larger distance or the Google Maps link below.",

    careFoundLine:
      "Showing {shown} of {total} places within {km} km of {place}, nearest first.",

    careYourLocation:
      "your location",

    careFilterAll:
      "All",

    careFilterHospital:
      "Hospitals",

    careFilterClinic:
      "Clinics",

    careFilterLab:
      "Labs",

    kindHospital:
      "Hospital",

    kindClinic:
      "Clinic",

    kindLab:
      "Diagnostic lab",

    careUnnamed:
      "Unnamed place",

    careDirections:
      "Directions",

    careCall:
      "Call",

    careWebsite:
      "Website",

    careShowMore:
      "Show more",

    careHintDiabetes:
      "Mentions diabetes care",

    careHintDiag:
      "Mentions diagnostics",

    careGoogle:
      "Search on Google Maps instead",

    careNote:
      "Listings come from OpenStreetMap, which volunteers keep up to date, so some places may be missing or out of date. A place being listed does not mean it offers diabetes tests: please call ahead and ask. Your location is used only to run this search and is not stored by DiaCare; the coordinates are sent to OpenStreetMap services to find places. If you feel very unwell, seek urgent medical care or call your local emergency number (112 in India).",

    kmUnit:
      "km"
  },


  hi: {

    navHome: "होम",
    navLearn: "जानें",
    navTesting: "जांच के तरीके",
    navQuiz: "क्विज़",
    navPlan: "मेरा प्लान",

    heroEyebrow: "डायबिटीज़ जागरूकता",

    heroTitle:
      "डायबिटीज़ को समझें। सही जानकारी के साथ निर्णय लें।",

    heroText:
      "DiaCare आपको डायबिटीज़, सामान्य लक्षणों और ग्लूकोज़ की जांच के विभिन्न तरीकों को समझने में मदद करता है।",

    startQuiz:
      "जागरूकता क्विज़ शुरू करें",

    exploreLearn:
      "जानकारी देखें",

    heroNote:
      "यह वेबसाइट शिक्षा और जागरूकता के लिए है। यह क्विज़ डायबिटीज़ का निदान नहीं कर सकता।",

    heroCardTitle:
      "जानें • समझें • जागरूक रहें",

    heroCardText:
      "डायबिटीज़ के बारे में जानें और अपनी जानकारी के आधार पर एक व्यक्तिगत जागरूकता प्लान बनाएं।",

    questions:
      "प्रश्न",

    quickLearnTitle:
      "जानें",

    quickLearnText:
      "बुनियादी जानकारी समझें",

    quickTestingTitle:
      "जांच के तरीके",

    quickTestingText:
      "विभिन्न तरीकों को समझें",

    quickQuizTitle:
      "क्विज़ लें",

    quickQuizText:
      "व्यक्तिगत जानकारी पाएं",

    learnEyebrow:
      "जानें",

    learnTitle:
      "डायबिटीज़ को आसान भाषा में समझें",

    learnText:
      "डायबिटीज़ को समझने के लिए ग्लूकोज़, इंसुलिन और सामान्य लक्षणों के बारे में जानना उपयोगी है।",

    whatDiabetesTitle:
      "डायबिटीज़ क्या है?",

    whatDiabetesText:
      "डायबिटीज़ ऐसी स्थितियों का समूह है जो शरीर द्वारा रक्त में मौजूद ग्लूकोज़ को नियंत्रित करने के तरीके को प्रभावित करती हैं। ग्लूकोज़ शरीर के लिए ऊर्जा का एक महत्वपूर्ण स्रोत है।",

    typesTitle:
      "मुख्य प्रकार",

    typesText:
      "मुख्य प्रकारों में टाइप 1 डायबिटीज़, टाइप 2 डायबिटीज़ और गर्भावस्था के दौरान होने वाली डायबिटीज़ शामिल हैं। इनके कारण और प्रबंधन अलग-अलग हो सकते हैं।",

    symptomsTitle:
      "सामान्य संकेत",

    symptomsText:
      "बहुत अधिक प्यास लगना, बार-बार पेशाब आना, थकान और दृष्टि में बदलाव डायबिटीज़ में हो सकते हैं, लेकिन इनके अन्य कारण भी हो सकते हैं।",

    supportTitle:
      "स्वस्थ आदतें",

    supportText:
      "नियमित शारीरिक गतिविधि, संतुलित भोजन, पर्याप्त नींद और उचित स्वास्थ्य देखभाल सामान्य स्वास्थ्य में मदद कर सकती है।",

    testingEyebrow:
      "जानें",

    testingTitle:
      "डायबिटीज़ की जांच कैसे की जा सकती है?",

    testingText:
      "नॉन-इनवेसिव और कम-इनवेसिव जांच के तरीकों के बीच अंतर समझें।",

    nonInvasiveTab:
      "🌿 नॉन-इनवेसिव",

    minimallyInvasiveTab:
      "🩸 कम-इनवेसिव",

    nonInvasiveTitle:
      "नॉन-इनवेसिव तरीके",

    nonInvasiveText:
      "नॉन-इनवेसिव तरीकों में शरीर से रक्त लेने की आवश्यकता नहीं होती। कुछ तकनीकों में प्रकाश या अन्य संकेतों की मदद से ग्लूकोज़ का अनुमान लगाने पर शोध किया जा रहा है।",

    noBloodTitle:
      "रक्त का नमूना नहीं",

    noBloodText:
      "इस तरीके में रक्त निकालने या उंगली में सुई चुभाने की आवश्यकता नहीं होती।",

    comfortTitle:
      "अधिक आरामदायक",

    comfortText:
      "इन तकनीकों का उद्देश्य ग्लूकोज़ की निगरानी को आसान और अधिक आरामदायक बनाना है।",

    evolvingTitle:
      "तकनीक विकसित हो रही है",

    evolvingText:
      "कई नॉन-इनवेसिव ग्लूकोज़ तकनीकों पर अभी भी शोध चल रहा है या उनमें कुछ सीमाएं हो सकती हैं।",

    rememberTitle:
      "ध्यान रखें:",

    nonInvasiveNote:
      "किसी नॉन-इनवेसिव डिवाइस को अपने आप डायबिटीज़ का निदान करने वाला नहीं मानना चाहिए। सही निदान के लिए उचित चिकित्सकीय जांच और मान्य परीक्षण आवश्यक होते हैं।",

    minimallyTitle:
      "कम-इनवेसिव तरीके",

    minimallyText:
      "इन तरीकों में रक्त की थोड़ी मात्रा या ऐसी माप शामिल हो सकती है जिसमें छोटी प्रक्रिया की आवश्यकता होती है। इनका उपयोग ग्लूकोज़ को अधिक सीधे मापने के लिए किया जाता है।",

    fingerTitle:
      "फिंगर-प्रिक जांच",

    fingerText:
      "ग्लूकोज़ मीटर की मदद से रक्त की थोड़ी मात्रा लेकर रक्त में ग्लूकोज़ मापा जा सकता है।",

    bloodTestTitle:
      "रक्त जांच",

    bloodTestText:
      "स्वास्थ्य विशेषज्ञ रक्त में ग्लूकोज़ और अन्य संकेतकों की जांच के लिए प्रयोगशाला परीक्षणों का उपयोग कर सकते हैं।",

    monitoringTitle:
      "लगातार निगरानी",

    monitoringText:
      "कुछ ग्लूकोज़ मॉनिटरिंग सिस्टम त्वचा के नीचे एक छोटा सेंसर लगाकर ग्लूकोज़ का लगातार अनुमान लगाते हैं।",

    importantTitle:
      "महत्वपूर्ण:",

    minimallyNote:
      "कौन सी जांच उपयुक्त है यह व्यक्ति की स्थिति पर निर्भर करता है। स्वास्थ्य विशेषज्ञ उचित जांच के बारे में बता सकते हैं।",

    knowledgeTitle:
      "छोटी ज्ञान जांच",

    knowledgeQuestion:
      "किस तरीके में रक्त के नमूने की आवश्यकता होती है?",

    knowledgeOption1:
      "🌿 नॉन-इनवेसिव",

    knowledgeOption2:
      "🩸 रक्त आधारित जांच",

    quizEyebrow:
      "इंटरैक्टिव क्विज़",

    quizTitle:
      "अपनी जागरूकता जांचें",

    quizText:
      "मापने योग्य जोखिम कारकों से जुड़े कुछ प्रश्नों का उत्तर दें, फिर चाहें तो लक्षण भी जोड़ें। आपको शैक्षणिक जोखिम अनुमान मिलेगा, निदान नहीं।",

    back:
      "← पीछे",

    next:
      "आगे →",

    livePlanTitle:
      "आपका लाइव प्लान",

    livePlanText:
      "आपके उत्तरों के साथ सिफारिशें बदलती रहेंगी।",

    liveEmpty:
      "अपना प्लान बनाने के लिए किसी प्रश्न का उत्तर दें।",

    decisionTitle:
      "आपके निर्णय",

    decisionEmpty:
      "आपके उत्तर यहां दिखाई देंगे।",

    resultEyebrow:
      "आपका DiaCare सारांश",

    restart:
      "क्विज़ फिर से लें",

    disclaimerTitle:
      "महत्वपूर्ण",

    disclaimerText:
      "DiaCare एक शैक्षणिक जागरूकता वेबसाइट है। यह क्विज़ डायबिटीज़ का निदान नहीं करता और योग्य स्वास्थ्य विशेषज्ञ की सलाह, जांच या मूल्यांकन का विकल्प नहीं है। यदि आपको किसी लक्षण को लेकर चिंता है, तो माता-पिता, अभिभावक, किसी विश्वसनीय वयस्क या स्वास्थ्य विशेषज्ञ से बात करें।",

    footerText:
      "जानें। समझें। सही जानकारी के साथ कदम उठाएं।",

    footerDisclaimer:
      "डायबिटीज़ जागरूकता और शिक्षा के लिए बनाया गया।",

    yes:
      "हां",

    no:
      "नहीं",

    resultLow:
      "आपके उत्तरों में इस जागरूकता क्विज़ में शामिल कई लक्षण नहीं दिखाई दिए। फिर भी यह क्विज़ डायबिटीज़ को पूरी तरह से बाहर नहीं कर सकता।",

    resultFollow:
      "आपके कुछ उत्तरों में ऐसे लक्षण या कारक शामिल थे जिनके बारे में किसी विश्वसनीय वयस्क या स्वास्थ्य विशेषज्ञ से बात करना उपयोगी हो सकता है। आपके उत्तर डायबिटीज़ का निदान नहीं करते।",

    resultMany:
      "आपके कई उत्तरों में ऐसे लक्षण शामिल थे जो डायबिटीज़ में हो सकते हैं। इन उत्तरों के बारे में किसी विश्वसनीय वयस्क और स्वास्थ्य विशेषज्ञ से बात करने पर विचार करें। डायबिटीज़ की पुष्टि के लिए उचित चिकित्सकीय जांच और परीक्षण आवश्यक हैं।",

    /* ---------- जोखिम आकलन (नया) ---------- */

    partRisk:
      "भाग 1/2 · प्रीडायबिटीज़ जोखिम आकलन",

    partSymptoms:
      "भाग 2/2 · लक्षण और जागरूकता (वैकल्पिक)",

    symptomsNote:
      "वैकल्पिक। ये उत्तर आपके जोखिम अनुमान की गणना में उपयोग नहीं किए जाते।",

    skipSymptoms:
      "लक्षण वाले प्रश्न छोड़ें →",

    skip:
      "छोड़ें →",

    seeResults:
      "परिणाम देखें →",

    errRequired:
      "जारी रखने के लिए कृपया इस प्रश्न का उत्तर दें।",

    errAge:
      "कृपया {min} से {max} के बीच की पूर्ण संख्या लिखें। यह आकलन {min}–{max} वर्ष के वयस्कों के लिए बनाया गया है।",

    errHeightCm:
      "कृपया 100 से 250 सेमी के बीच ऊंचाई लिखें।",

    errHeightFtIn:
      "कृपया सही ऊंचाई लिखें: फीट (लगभग 3–8) और इंच (0–11)।",

    errWeightKg:
      "कृपया 30 से 300 किग्रा के बीच वज़न लिखें।",

    errWeightLb:
      "कृपया 66 से 660 पाउंड के बीच वज़न लिखें।",

    errBmi:
      "इन मानों से BMI {bmi} आता है, जो अवास्तविक लगता है। कृपया अपनी ऊंचाई और वज़न दोबारा जांचें।",

    unitYears: "वर्ष",
    unitCm: "सेमी",
    unitKg: "किग्रा",
    unitLb: "पाउंड",
    labelFt: "फीट",
    labelIn: "इंच",
    unitToggleCm: "सेमी",
    unitToggleFtIn: "फीट और इंच",
    unitToggleKg: "किग्रा",
    unitToggleLb: "पाउंड",

    bmiTitle:
      "आपका BMI (अपने-आप गणना किया गया)",

    bmiShort:
      "BMI (गणना किया गया)",

    bmiWaiting:
      "अपना BMI देखने के लिए सही वज़न लिखें।",

    bmiUnder:
      "सामान्य स्वस्थ सीमा से कम",

    bmiHealthy:
      "सामान्य स्वस्थ सीमा में",

    bmiOver:
      "अधिक वज़न की सीमा में",

    bmiObese:
      "मोटापे की सीमा में",

    bmiNote:
      "BMI एक मोटा स्क्रीनिंग माप है और शरीर की संरचना नहीं बताता।",

    riskLabel:
      "आपका अनुमानित प्रीडायबिटीज़ जोखिम है:",

    riskLow: "कम",
    riskModerate: "मध्यम",
    riskHigh: "अधिक",

    riskLowText:
      "आपके दिए गए विवरण के अनुसार अधिकतर सामान्य जोखिम कारक मौजूद नहीं थे। इससे प्रीडायबिटीज़ पूरी तरह बाहर नहीं होती, क्योंकि इसमें अक्सर कोई लक्षण नहीं होते।",

    riskModerateText:
      "कुछ सामान्य जोखिम कारक मौजूद थे। किसी स्वास्थ्य विशेषज्ञ से पूछने पर विचार करें कि क्या आपके लिए कोई सरल रक्त जांच (जैसे HbA1c) उपयोगी होगी।",

    riskHighText:
      "कई सामान्य जोखिम कारक मौजूद थे। HbA1c जैसी रक्त जांच के बारे में किसी स्वास्थ्य विशेषज्ञ से बात करने पर विचार करें। यह निदान नहीं है।",

    resultPendingTitle:
      "आपका अनुमान तैयार हो रहा है…",

    resultPendingText:
      "कृपया थोड़ा इंतज़ार करें।",

    resultErrorTitle:
      "जोखिम अनुमान उपलब्ध नहीं है",

    resultErrorText:
      "अभी जोखिम अनुमान नहीं मिल सका। आपके उत्तर सुरक्षित हैं, आप दोबारा कोशिश कर सकते हैं।",

    retry:
      "फिर कोशिश करें",

    sourceMock:
      "🧪 डेमो मोड: यह अनुमान एक सरल उदाहरण स्कोरिंग नियम से आया है, जिसे मशीन-लर्निंग मॉडल जुड़ने तक उपयोग किया जा रहा है। यह प्रशिक्षित मॉडल की भविष्यवाणी नहीं है।",

    sourceModel:
      "यह अनुमान राष्ट्रीय स्वास्थ्य-सर्वेक्षण डेटा पर प्रशिक्षित एक सांख्यिकीय मॉडल से बनाया गया है। यह एक स्क्रीनिंग अनुमान है, आपकी व्यक्तिगत चिकित्सकीय संभावना नहीं।",

    modelScore:
      "मॉडल स्कोर: {score} (एक तुलनात्मक स्कोर, चिकित्सकीय संभावना नहीं)",

    factorsTitle:
      "इस अनुमान में किन बातों का योगदान रहा?",

    factorsIntro:
      "ये वे सामान्य जोखिम कारक हैं जिन्हें यह टूल देखता है। ये आपके परिणाम को आसान भाषा में समझाते हैं; ये मॉडल के सटीक भार नहीं हैं। आपका लिंग भी ध्यान में रखा गया (यदि आपने बताना नहीं चुना तो नहीं)।",

    factorAge: "उम्र",
    factorBmi: "BMI",
    factorFamily: "पारिवारिक इतिहास",
    factorBp: "रक्तचाप",
    factorActivity: "शारीरिक गतिविधि",

    tagHigher: "जोखिम बढ़ा सकता है",
    tagNeutral: "यहां अतिरिक्त जोखिम नहीं",
    tagLower: "जोखिम घटाने में सहायक",

    factorAgeLow:
      "कम उम्र के वयस्कों में आमतौर पर जोखिम कम होता है, हालांकि समय के साथ यह धीरे-धीरे बढ़ता है।",

    factorAgeMid:
      "उम्र बढ़ने के साथ प्रीडायबिटीज़ का जोखिम धीरे-धीरे बढ़ता है।",

    factorAgeHigh:
      "लगभग 45 वर्ष की उम्र के बाद प्रीडायबिटीज़ का जोखिम अधिक होता है।",

    factorBmiUnder:
      "आपका BMI सामान्य स्वस्थ सीमा से कम है। कम वज़न प्रीडायबिटीज़ का सामान्य जोखिम कारक नहीं है, लेकिन यदि यह अनचाहा है तो इस पर बात करना उचित है।",

    factorBmiHealthy:
      "आपका BMI सामान्य स्वस्थ सीमा में है, जो आमतौर पर कम जोखिम से जुड़ा होता है।",

    bmiSouthAsianNote:
      "कुछ दिशानिर्देश दक्षिण एशियाई वयस्कों के लिए कम सीमा (23 से) का उपयोग करते हैं।",

    factorBmiOver:
      "आपका BMI अधिक वज़न की सीमा में है। शरीर का अतिरिक्त वज़न सबसे आम जोखिम कारकों में से एक है।",

    factorBmiObese:
      "आपका BMI मोटापे की सीमा में है। अधिक शारीरिक वज़न अधिक जोखिम से मज़बूती से जुड़ा है।",

    factorFamilyYes:
      "किसी करीबी रिश्तेदार को डायबिटीज़ होने से आपका जोखिम बढ़ सकता है।",

    factorFamilyNo:
      "आपने बताया कि किसी करीबी रिश्तेदार को डायबिटीज़ नहीं है, इसलिए इससे आपके अनुमान में कुछ नहीं जुड़ा।",

    factorBpYes:
      "उच्च रक्तचाप का इतिहास अक्सर अधिक जोखिम के साथ पाया जाता है।",

    factorBpNo:
      "आपने उच्च रक्तचाप का कोई इतिहास नहीं बताया, इसलिए इससे आपके अनुमान में कुछ नहीं जुड़ा।",

    factorActNone:
      "बहुत कम नियमित शारीरिक गतिविधि अधिक जोखिम से जुड़ी है।",

    factorActSome:
      "कुछ गतिविधि मदद करती है, लेकिन कई दिशानिर्देश सप्ताह में लगभग 150 मिनट मध्यम गतिविधि का सुझाव देते हैं।",

    factorActGood:
      "आपने सप्ताह में लगभग 150 मिनट या उससे अधिक गतिविधि बताई। नियमित गतिविधि आमतौर पर जोखिम घटाती है।",

    tipsTitle:
      "आपके उत्तरों पर आधारित सुझाव",

    symptomTitle:
      "लक्षण और जागरूकता",

    symptomIntro:
      "प्रीडायबिटीज़ में अक्सर कोई स्पष्ट लक्षण नहीं होते, इसलिए केवल लक्षणों से यह नहीं पता चल सकता कि यह मौजूद है या नहीं। ये उत्तर केवल जागरूकता के लिए हैं और आपके जोखिम अनुमान में उपयोग नहीं किए गए।",

    symptomSkipped:
      "आपने वैकल्पिक लक्षण प्रश्न छोड़ दिए।",

    resultDisclaimer:
      "यह आकलन केवल शैक्षणिक और जोखिम-जागरूकता के उद्देश्य से है। यह डायबिटीज़ या प्रीडायबिटीज़ का निदान नहीं करता। निदान के लिए रक्त जांच और स्वास्थ्य विशेषज्ञ से परामर्श आवश्यक है।",

    recAge:
      "🎂 उम्र बढ़ने के साथ प्रीडायबिटीज़ का जोखिम बढ़ने लगता है, इसलिए समय के साथ नियमित स्वास्थ्य जांच अधिक उपयोगी होती है।",

    recSexUnspecified:
      "🧑 आपने अपना लिंग बताना नहीं चुना। अनुमान इस उत्तर पर निर्भर किए बिना निकाला जाता है।",

    recBmi:
      "⚖️ आपका BMI {bmi} है ({category})। BMI केवल एक मोटा संकेतक है, लेकिन यह इस आकलन में उपयोग किए गए कारकों में से एक है।",

    recBpYes:
      "🩺 आपने उच्च रक्तचाप का इतिहास बताया। डायबिटीज़ स्क्रीनिंग पर स्वास्थ्य विशेषज्ञ से बात करते समय इसे बताना उपयोगी है।",

    recBpNo:
      "🩺 आपने उच्च रक्तचाप का कोई इतिहास नहीं बताया। नियमित रक्तचाप जांच फिर भी सामान्य स्वास्थ्य का हिस्सा है।",

    recAct0:
      "🚶 आपने सप्ताह में 30 मिनट से कम गतिविधि बताई। अपनी उम्र और स्वास्थ्य के अनुसार ऐसी गतिविधियां चुनना उपयोगी हो सकता है जो आपको पसंद हों।",

    recAct1:
      "🚶 आपने सप्ताह में 30–149 मिनट गतिविधि बताई। कई दिशानिर्देश, यदि आपके लिए उपयुक्त हो, तो सप्ताह में लगभग 150 मिनट मध्यम गतिविधि का सुझाव देते हैं।",

    recAct2:
      "🚶 आपने सप्ताह में 150–299 मिनट बताए, जो एक आम दिशानिर्देश को पूरा करता है। अपनी पसंद की गतिविधियां जारी रखें।",

    recAct3:
      "🚶 आपने सप्ताह में 300 मिनट या अधिक बताए। नियमित गतिविधि सामान्य स्वास्थ्य में मदद करती है; इसे आराम के साथ संतुलित रखें।",

    /* ---------- नए जागरूकता प्रश्न: सुझाव ---------- */

    recHungerYes:
      "🍽️ आपने बताया कि आपको सामान्य से बहुत अधिक भूख लग रही है। इसके कई कारण हो सकते हैं; यदि यह नया है या बना रहता है, तो स्वास्थ्य विशेषज्ञ को बताने पर विचार करें।",
    recHungerNo:
      "🍽️ आपने असामान्य रूप से अधिक भूख के लिए 'नहीं' चुना।",

    recWeightYes:
      "📉 आपने बताया कि बिना प्रयास के आपका वज़न कम हुआ है। बिना कारण वज़न घटना किसी भी स्थिति में स्वास्थ्य विशेषज्ञ से बात करने योग्य है।",
    recWeightNo:
      "📉 आपने बिना कारण वज़न घटने के लिए 'नहीं' चुना।",

    recTinglingYes:
      "🖐️ आपने हाथों या पैरों में झुनझुनी, सुन्नपन या दर्द बताया। इसके कई संभावित कारण हैं; यदि यह बना रहता है, तो स्वास्थ्य विशेषज्ञ कारण पता करने में मदद कर सकते हैं।",
    recTinglingNo:
      "🖐️ आपने हाथों या पैरों में झुनझुनी, सुन्नपन या दर्द के लिए 'नहीं' चुना।",

    recSkinYes:
      "🧴 आपने त्वचा पर गहरे, मखमली धब्बे देखे। ये इंसुलिन प्रतिरोध और अन्य स्थितियों से जुड़े हो सकते हैं, इसलिए इन्हें स्वास्थ्य विशेषज्ञ को दिखाना उचित है।",
    recSkinNo:
      "🧴 आपने त्वचा के गहरे, मखमली धब्बों के लिए 'नहीं' चुना।",

    recSugaryYes:
      "🥤 आपने बताया कि आप ज़्यादातर दिनों में मीठे पेय या मिठाइयां लेते हैं। धीरे-धीरे इन्हें कम करना एक सरल आदत-बदलाव है जो सामान्य स्वास्थ्य में मदद करता है।",
    recSugaryNo:
      "🥤 आपने बताया कि आप ज़्यादातर दिनों में मीठे पेय या मिठाइयां नहीं लेते। यह आदत सामान्य स्वास्थ्य में मदद करती है।",

    recTestedYes:
      "🧪 आपने पिछले 3 वर्षों में ब्लड शुगर की जांच करवाई है। अपनी रिपोर्ट संभालकर रखें और स्वास्थ्य विशेषज्ञ से पूछें कि इसे कितनी बार दोहराना चाहिए।",
    recTestedNo:
      "🧪 आपने पिछले 3 वर्षों में ब्लड शुगर की जांच नहीं करवाई है। यदि आपमें जोखिम कारक हैं, तो स्वास्थ्य विशेषज्ञ से पूछें कि क्या आपके लिए जांच उचित होगी। नीचे 'पास की जांच सुविधा' भाग केंद्र ढूंढने में मदद कर सकता है।",


    /* ---------- चार्ट ---------- */

    chartsTitle:
      "आपके परिणाम एक नज़र में",

    chartsIntro:
      "ये चार्ट केवल आपके अपने उत्तरों का सारांश दिखाते हैं। ये निदान नहीं हैं और डायबिटीज़ होने की संभावना भी नहीं बताते।",

    chartFactorsTitle:
      "आपकी जोखिम-कारक रूपरेखा",

    chartSymptomsTitle:
      "लक्षण जागरूकता के उत्तर",

    chartSkipped:
      "छोड़े गए",

    chartFactorsCenter:
      "कारक",

    chartSymptomsCenter:
      "प्रश्न",

    chartFactorsLabel:
      "आपके पांच जोखिम कारकों का डोनट चार्ट",

    chartSymptomsLabel:
      "आपके लक्षण उत्तरों का डोनट चार्ट",


    /* ---------- पास की जांच सुविधा ---------- */

    navCare:
      "जांच केंद्र",

    careCtaText:
      "जांच करवाने के बारे में सोच रहे हैं? अपने पास के अस्पताल, क्लिनिक और लैब ढूंढें।",

    careCtaButton:
      "पास के केंद्र ढूंढें",

    careEyebrow:
      "जांच केंद्र",

    careTitle:
      "अपने पास डायबिटीज़ जांच की सुविधा ढूंढें",

    careText:
      "पास के अस्पताल, क्लिनिक और डायग्नोस्टिक लैब खोजें जहां HbA1c या फास्टिंग ग्लूकोज़ जैसी रक्त जांच उपलब्ध हो सकती है।",

    careLocate:
      "📍 मेरी लोकेशन उपयोग करें",

    careOr:
      "या",

    careSearchPlaceholder:
      "शहर या इलाका, जैसे पिंपरी, पुणे",

    careSearchLabel:
      "शहर या इलाके से खोजें",

    careSearchButton:
      "खोजें",

    careRadiusLabel:
      "खोज की दूरी",

    careLocating:
      "आपकी लोकेशन ली जा रही है…",

    careGeocoding:
      "वह जगह खोजी जा रही है…",

    careSearching:
      "{place} के पास स्थान खोजे जा रहे हैं…",

    careDenied:
      "लोकेशन की अनुमति नहीं मिली। आप अपना शहर या इलाका लिख सकते हैं।",

    careUnsupported:
      "आपका ब्राउज़र लोकेशन साझा नहीं कर सकता। कृपया अपना शहर या इलाका लिखें।",

    careInsecure:
      "लोकेशन केवल सुरक्षित (https) पेज पर काम करती है। कृपया अपना शहर या इलाका लिखें।",

    careLocationFailed:
      "आपकी लोकेशन नहीं मिल सकी। कृपया अपना शहर या इलाका लिखें।",

    careNeedQuery:
      "कृपया पहले कोई शहर या इलाका लिखें।",

    careNotFound:
      "वह जगह नहीं मिली। किसी पास के शहर का नाम आज़माएं।",

    careError:
      "मैप सेवा ने जवाब नहीं दिया। कृपया थोड़ी देर में फिर कोशिश करें, या नीचे दिया Google Maps लिंक उपयोग करें।",

    careNone:
      "{km} किमी के भीतर कोई अस्पताल, क्लिनिक या लैब नहीं मिली। अधिक दूरी या नीचे दिया Google Maps लिंक आज़माएं।",

    careFoundLine:
      "{place} से {km} किमी के भीतर {total} में से {shown} स्थान, सबसे पास वाले पहले।",

    careYourLocation:
      "आपकी लोकेशन",

    careFilterAll:
      "सभी",

    careFilterHospital:
      "अस्पताल",

    careFilterClinic:
      "क्लिनिक",

    careFilterLab:
      "लैब",

    kindHospital:
      "अस्पताल",

    kindClinic:
      "क्लिनिक",

    kindLab:
      "डायग्नोस्टिक लैब",

    careUnnamed:
      "बिना नाम का स्थान",

    careDirections:
      "रास्ता",

    careCall:
      "कॉल करें",

    careWebsite:
      "वेबसाइट",

    careShowMore:
      "और दिखाएं",

    careHintDiabetes:
      "डायबिटीज़ देखभाल का उल्लेख",

    careHintDiag:
      "जांच सेवाओं का उल्लेख",

    careGoogle:
      "इसके बजाय Google Maps पर खोजें",

    careNote:
      "सूची OpenStreetMap से आती है, जिसे स्वयंसेवक अपडेट रखते हैं, इसलिए कुछ स्थान छूट सकते हैं या पुराने हो सकते हैं। किसी स्थान का सूची में होना यह नहीं दर्शाता कि वहां डायबिटीज़ जांच होती है: कृपया पहले फोन करके पूछ लें। आपकी लोकेशन केवल इस खोज के लिए उपयोग होती है और DiaCare इसे सेव नहीं करता; स्थान खोजने के लिए निर्देशांक OpenStreetMap सेवाओं को भेजे जाते हैं। यदि आप बहुत अस्वस्थ महसूस करें, तो तुरंत चिकित्सा सहायता लें या अपने स्थानीय आपातकालीन नंबर पर कॉल करें (भारत में 112)।",

    kmUnit:
      "किमी"
  }

};


/* =========================================
   QUIZ SETTINGS
========================================= */

/*
  IMPORTANT: AGE_MIN / AGE_MAX must match the age range the ML model
  was trained on. After training, check "age_min" and "age_max" in
  ml/artifacts/model_metadata.json and keep the numbers identical here.
*/
const AGE_MIN = 20;
const AGE_MAX = 69;

/* Sanity limits used to reject impossible values */
const INPUT_LIMITS = {
  heightCm: { min: 100, max: 250 },
  weightKg: { min: 30, max: 300 },
  bmi:      { min: 10, max: 70 }
};

const YES_NO_OPTIONS = [
  { value: "yes", en: "Yes", hi: "हां" },
  { value: "no",  en: "No",  hi: "नहीं" }
];


/* =========================================
   QUIZ QUESTIONS

   Every question has:
     id       - key used in the `answers` object
     section  - "risk"     = used by the ML risk model
                "symptoms" = awareness only, NEVER sent to the model
     type     - "choice" (default), "number", "height", "weight"
     optional - true = the person may skip it
========================================= */

const questions = [

  /* ---------- PART 1: PREDIABETES RISK ASSESSMENT ---------- */

  {
    id: "age",
    section: "risk",
    type: "number",
    min: AGE_MIN,
    max: AGE_MAX,
    errorKey: "errAge",
    unitKey: "unitYears",

    question: {
      en: "What is your age?",
      hi: "आपकी उम्र क्या है?"
    },

    hint: {
      en: `Enter your age in years (${AGE_MIN}–${AGE_MAX}).`,
      hi: `अपनी उम्र वर्षों में लिखें (${AGE_MIN}–${AGE_MAX}).`
    }
  },


  {
    id: "sex",
    section: "risk",

    question: {
      en: "What is your sex (assigned at birth)?",
      hi: "आपका लिंग क्या है (जन्म के समय दर्ज)?"
    },

    hint: {
      en: "You can choose “Prefer not to say”. The estimate is then calculated without using this answer.",
      hi: "आप “बताना नहीं चाहते” चुन सकते हैं। तब अनुमान इस उत्तर का उपयोग किए बिना निकाला जाएगा।"
    },

    options: [
      { value: "male",        en: "Male",           hi: "पुरुष" },
      { value: "female",      en: "Female",         hi: "महिला" },
      { value: "unspecified", en: "Prefer not to say", hi: "बताना नहीं चाहते" }
    ]
  },


  {
    id: "height",
    section: "risk",
    type: "height",

    question: {
      en: "What is your height?",
      hi: "आपकी ऊंचाई कितनी है?"
    },

    hint: {
      en: "Choose centimetres or feet & inches.",
      hi: "सेंटीमीटर या फीट और इंच चुनें।"
    }
  },


  {
    id: "weight",
    section: "risk",
    type: "weight",

    question: {
      en: "What is your weight?",
      hi: "आपका वज़न कितना है?"
    },

    hint: {
      en: "Choose kilograms or pounds. Your BMI is calculated for you.",
      hi: "किलोग्राम या पाउंड चुनें। आपका BMI अपने-आप निकाला जाएगा।"
    }
  },


  {
    id: "family",
    section: "risk",

    question: {
      en: "Does diabetes run in your family?",
      hi: "क्या आपके परिवार में किसी को डायबिटीज़ है?"
    },

    hint: {
      en: "Count close blood relatives such as a parent, brother, sister or child who were told by a doctor that they have diabetes.",
      hi: "माता-पिता, भाई-बहन या बच्चे जैसे करीबी रक्त संबंधियों को गिनें, जिन्हें डॉक्टर ने डायबिटीज़ बताई हो।"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "bp",
    section: "risk",

    question: {
      en: "Have you ever been told by a doctor or healthcare professional that you have high blood pressure?",
      hi: "क्या किसी डॉक्टर या स्वास्थ्य विशेषज्ञ ने आपको कभी बताया है कि आपको उच्च रक्तचाप (हाई ब्लड प्रेशर) है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "activity",
    section: "risk",

    question: {
      en: "In a typical week, about how much time do you spend in total on physical activity that makes you breathe harder than normal?",
      hi: "एक सामान्य सप्ताह में, आप कुल कितना समय ऐसी शारीरिक गतिविधि में बिताते हैं जिससे आपकी सांस सामान्य से तेज़ चलती है?"
    },

    hint: {
      en: "Include exercise, sports, brisk walking, cycling and physically active work or chores. (150 minutes is about 30 minutes on 5 days.)",
      hi: "व्यायाम, खेल, तेज़ चलना, साइकिल चलाना और शारीरिक मेहनत वाला काम या घरेलू काम गिनें। (150 मिनट यानी 5 दिन में लगभग 30 मिनट प्रतिदिन।)"
    },

    /* values 0-3 are the exact numbers sent to the model */
    options: [
      { value: "0", en: "Less than 30 minutes",   hi: "30 मिनट से कम" },
      { value: "1", en: "30–149 minutes",         hi: "30–149 मिनट" },
      { value: "2", en: "150–299 minutes",        hi: "150–299 मिनट" },
      { value: "3", en: "300 minutes or more",    hi: "300 मिनट या अधिक" }
    ]
  },


  /* ---------- PART 2: SYMPTOMS & AWARENESS (optional) ---------- */

  {
    id: "thirst",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you noticed unusual thirst recently?",
      hi: "क्या आपने हाल में सामान्य से अधिक प्यास महसूस की है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "urination",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you been urinating more often than usual?",
      hi: "क्या आपको सामान्य से अधिक बार पेशाब आ रहा है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "fatigue",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you been feeling unusually tired or low on energy?",
      hi: "क्या आपको असामान्य रूप से थकान या कम ऊर्जा महसूस हो रही है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "vision",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you noticed changes or blurriness in your vision?",
      hi: "क्या आपने अपनी दृष्टि में बदलाव या धुंधलापन देखा है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "healing",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you noticed cuts or wounds taking longer than expected to heal?",
      hi: "क्या आपने देखा है कि कट या घाव ठीक होने में सामान्य से अधिक समय ले रहे हैं?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "hunger",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you been feeling much hungrier than usual, even after eating?",
      hi: "क्या आपको खाने के बाद भी सामान्य से बहुत अधिक भूख लग रही है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "weightloss",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you lost weight without trying to?",
      hi: "क्या आपका वज़न बिना प्रयास के कम हुआ है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "tingling",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you felt tingling, numbness or pain in your hands or feet?",
      hi: "क्या आपको हाथों या पैरों में झुनझुनी, सुन्नपन या दर्द महसूस हुआ है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "skin",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you noticed dark, velvety patches of skin on your neck, armpits or groin?",
      hi: "क्या आपने गर्दन, बगल या जांघ के जोड़ पर त्वचा के गहरे, मखमली धब्बे देखे हैं?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "sugary",
    section: "symptoms",
    optional: true,

    question: {
      en: "Do you have sugary drinks or sweets on most days?",
      hi: "क्या आप ज़्यादातर दिनों में मीठे पेय या मिठाइयां लेते हैं?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "tested",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you had a blood sugar test in the last 3 years?",
      hi: "क्या पिछले 3 वर्षों में आपने ब्लड शुगर की जांच करवाई है?"
    },

    options: YES_NO_OPTIONS
  },


  {
    id: "checkup",
    section: "symptoms",
    optional: true,

    question: {
      en: "Have you recently discussed your health concerns with a healthcare professional?",
      hi: "क्या आपने हाल में अपनी स्वास्थ्य संबंधी चिंताओं के बारे में किसी स्वास्थ्य विशेषज्ञ से बात की है?"
    },

    options: YES_NO_OPTIONS
  }

];

/* ids of the awareness-only symptom / sign questions.
   (Lifestyle questions "sugary" and "tested", and "checkup", are
   awareness-only too but are not counted as symptoms.) */
const SYMPTOM_IDS = [
  "thirst", "urination", "fatigue", "vision", "healing",
  "hunger", "weightloss", "tingling", "skin"
];



/* =========================================
   STATE
========================================= */

let currentLanguage =
  localStorage.getItem("diacare-language") || "en";

let currentQuestion = 0;

let answers = {};

/* chosen units for the height / weight questions */
let unitPrefs = {
  height: "cm",     /* "cm" or "ftin" */
  weight: "kg"      /* "kg" or "lb"   */
};

let currentTheme =
  localStorage.getItem("diacare-theme") || "light";


/* =========================================
   DOM ELEMENTS
========================================= */

const languageSelect =
  document.getElementById("languageSelect");

const themeToggle =
  document.getElementById("themeToggle");

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");

const questionArea =
  document.getElementById("questionArea");

const questionNumber =
  document.getElementById("questionNumber");

const progressBar =
  document.getElementById("progressBar");

const progressPercent =
  document.getElementById("progressPercent");

const backButton =
  document.getElementById("backButton");

const nextButton =
  document.getElementById("nextButton");

const liveRecommendations =
  document.getElementById("liveRecommendations");

const decisionTrail =
  document.getElementById("decisionTrail");

const quizResult =
  document.getElementById("quizResult");

const resultTitle =
  document.getElementById("resultTitle");

const resultText =
  document.getElementById("resultText");

const finalRecommendations =
  document.getElementById("finalRecommendations");

const restartQuiz =
  document.getElementById("restartQuiz");

/* risk-result elements (added for the risk assessment) */
const questionCount =
  document.getElementById("questionCount");

const riskLevel =
  document.getElementById("riskLevel");

const riskScoreNote =
  document.getElementById("riskScoreNote");

const riskSourceNote =
  document.getElementById("riskSourceNote");

const factorsBlock =
  document.getElementById("factorsBlock");

const riskFactors =
  document.getElementById("riskFactors");

const tipsBlock =
  document.getElementById("tipsBlock");

const symptomBlock =
  document.getElementById("symptomBlock");

const symptomRecommendations =
  document.getElementById("symptomRecommendations");

const retryResults =
  document.getElementById("retryResults");

const chartsBlock =
  document.getElementById("chartsBlock");

const chartFactors =
  document.getElementById("chartFactors");

const chartSymptoms =
  document.getElementById("chartSymptoms");

const careCta =
  document.getElementById("careCta");


/* =========================================
   TRANSLATION HELPER
========================================= */

function t(key) {

  return translations[currentLanguage][key] ||
         translations.en[key] ||
         key;

}


/* =========================================
   APPLY TRANSLATIONS
========================================= */

function applyTranslations() {

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key = element.dataset.i18n;

      if (translations[currentLanguage][key]) {

        element.textContent =
          translations[currentLanguage][key];

      }

    });


  document.documentElement.lang =
    currentLanguage === "hi"
      ? "hi"
      : "en";


  renderQuestion();

  updateRecommendations();

  updateDecisionTrail();

  updateResultLanguage();

  /* defined in find-care.js (loaded after this file) */
  if (typeof renderCare === "function") {
    renderCare();
  }

}


/* =========================================
   LANGUAGE SELECTOR
========================================= */

languageSelect.value =
  currentLanguage;


languageSelect.addEventListener(
  "change",
  event => {

    currentLanguage =
      event.target.value;

    localStorage.setItem(
      "diacare-language",
      currentLanguage
    );

    applyTranslations();

  }
);


/* =========================================
   DARK MODE
========================================= */

function applyTheme() {

  if (currentTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";

  } else {

    document.body.classList.remove("dark");

    themeToggle.textContent = "🌙";

  }

}


themeToggle.addEventListener(
  "click",
  () => {

    currentTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    localStorage.setItem(
      "diacare-theme",
      currentTheme
    );

    applyTheme();

  }
);


/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener(
  "click",
  () => {

    mainNav.classList.toggle("open");

  }
);


mainNav
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mainNav.classList.remove("open");

      }
    );

  });


/* =========================================
   SMALL HELPERS
========================================= */

/* Translation with {placeholders}, e.g. tf("errAge", { min: 20 }) */
function tf(key, vars = {}) {
  let text = t(key);

  Object.keys(vars).forEach(name => {
    text = text.split(`{${name}}`).join(vars[name]);
  });

  return text;
}

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[character])
  );
}

/* Returns a finite number or NaN (never throws) */
function parseNumber(value) {
  if (value === undefined || value === null) {
    return NaN;
  }

  const text = String(value).trim().replace(",", ".");

  if (text === "") {
    return NaN;
  }

  const number = Number(text);

  return Number.isFinite(number) ? number : NaN;
}

function roundTo(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function isBlank(value) {
  return String(value ?? "").trim() === "";
}


/* =========================================
   HEIGHT / WEIGHT / BMI
   (everything is converted to cm and kg)
========================================= */

function getHeightCm() {
  if (unitPrefs.height === "ftin") {
    const feet = parseNumber(answers.height_ft);

    /* empty inches field counts as 0 inches */
    const inches = isBlank(answers.height_in)
      ? 0
      : parseNumber(answers.height_in);

    if (
      !Number.isFinite(feet) ||
      !Number.isFinite(inches) ||
      feet < 0 ||
      inches < 0 ||
      inches >= 12
    ) {
      return NaN;
    }

    return (feet * 12 + inches) * 2.54;
  }

  return parseNumber(answers.height);
}

function getWeightKg() {
  const raw = parseNumber(answers.weight);

  if (!Number.isFinite(raw)) {
    return NaN;
  }

  return unitPrefs.weight === "lb"
    ? raw * 0.45359237
    : raw;
}

function isHeightInRange(cm) {
  return (
    Number.isFinite(cm) &&
    cm >= INPUT_LIMITS.heightCm.min &&
    cm <= INPUT_LIMITS.heightCm.max
  );
}

function isWeightInRange(kg) {
  return (
    Number.isFinite(kg) &&
    kg >= INPUT_LIMITS.weightKg.min &&
    kg <= INPUT_LIMITS.weightKg.max
  );
}

/* BMI = kg / m². Returns null until height and weight are both valid. */
function getBmi() {
  const heightCm = getHeightCm();
  const weightKg = getWeightKg();

  if (!isHeightInRange(heightCm) || !isWeightInRange(weightKg)) {
    return null;
  }

  return weightKg / ((heightCm / 100) ** 2);
}

function getBmiCategoryKey(bmi) {
  if (bmi < 18.5) return "bmiUnder";
  if (bmi < 25)   return "bmiHealthy";
  if (bmi < 30)   return "bmiOver";
  return "bmiObese";
}


/* =========================================
   VALIDATION
   status: "empty" | "invalid" | "valid"
========================================= */

function validateQuestion(question) {
  const type = question.type || "choice";

  /* ----- choice ----- */
  if (type === "choice") {
    return answers[question.id]
      ? { status: "valid" }
      : { status: "empty" };
  }

  /* ----- whole number (age) ----- */
  if (type === "number") {
    if (isBlank(answers[question.id])) {
      return { status: "empty" };
    }

    const number = parseNumber(answers[question.id]);

    if (
      !Number.isInteger(number) ||
      number < question.min ||
      number > question.max
    ) {
      return {
        status: "invalid",
        message: tf(question.errorKey, {
          min: question.min,
          max: question.max
        })
      };
    }

    return { status: "valid", value: number };
  }

  /* ----- height ----- */
  if (type === "height") {
    const usingFeet = unitPrefs.height === "ftin";

    const isEmpty = usingFeet
      ? isBlank(answers.height_ft)
      : isBlank(answers.height);

    if (isEmpty) {
      return { status: "empty" };
    }

    const heightCm = getHeightCm();

    if (!isHeightInRange(heightCm)) {
      return {
        status: "invalid",
        message: t(usingFeet ? "errHeightFtIn" : "errHeightCm")
      };
    }

    return { status: "valid", value: heightCm };
  }

  /* ----- weight (also checks the resulting BMI) ----- */
  if (type === "weight") {
    if (isBlank(answers.weight)) {
      return { status: "empty" };
    }

    const weightKg = getWeightKg();

    if (!isWeightInRange(weightKg)) {
      return {
        status: "invalid",
        message: t(unitPrefs.weight === "lb" ? "errWeightLb" : "errWeightKg")
      };
    }

    const heightCm = getHeightCm();

    if (isHeightInRange(heightCm)) {
      const bmi = weightKg / ((heightCm / 100) ** 2);

      if (bmi < INPUT_LIMITS.bmi.min || bmi > INPUT_LIMITS.bmi.max) {
        return {
          status: "invalid",
          message: tf("errBmi", { bmi: roundTo(bmi, 1) })
        };
      }
    }

    return { status: "valid", value: weightKg };
  }

  return { status: "empty" };
}

function isAnswered(question) {
  return validateQuestion(question).status === "valid";
}

function showFieldError(validation) {
  const box = document.getElementById("fieldError");

  if (!box) return;

  box.textContent =
    validation.status === "invalid"
      ? validation.message
      : t("errRequired");
}

function clearFieldError() {
  const box = document.getElementById("fieldError");

  if (box) {
    box.textContent = "";
  }
}

function shakeQuestionArea() {
  questionArea.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(0)" }
    ],
    { duration: 250 }
  );
}


/* =========================================
   QUIZ QUESTION RENDERING
========================================= */

function renderQuestion() {

  const question = questions[currentQuestion];
  const type = question.type || "choice";

  const sectionLabel =
    question.section === "symptoms"
      ? t("partSymptoms")
      : t("partRisk");

  const hintHtml = question.hint
    ? `<p class="question-hint">${escapeHtml(question.hint[currentLanguage])}</p>`
    : "";

  const noteHtml =
    question.section === "symptoms"
      ? `<p class="section-note">${escapeHtml(t("symptomsNote"))}</p>`
      : "";

  let bodyHtml = "";

  if (type === "choice") {
    bodyHtml = buildChoiceHtml(question);
  } else if (type === "number") {
    bodyHtml = buildNumberHtml(question);
  } else if (type === "height") {
    bodyHtml = buildHeightHtml();
  } else if (type === "weight") {
    bodyHtml = buildWeightHtml();
  }

  const skipHtml =
    question.section === "symptoms"
      ? `
        <button
          type="button"
          class="skip-link"
          id="skipSymptoms"
        >
          ${escapeHtml(t("skipSymptoms"))}
        </button>
      `
      : "";

  questionArea.innerHTML = `
    <span class="section-pill ${question.section}">
      ${escapeHtml(sectionLabel)}
    </span>

    ${noteHtml}

    <h3>
      ${escapeHtml(question.question[currentLanguage])}
    </h3>

    ${hintHtml}

    ${bodyHtml}

    <p
      class="field-error"
      id="fieldError"
      role="alert"
    ></p>

    ${skipHtml}
  `;

  if (type === "choice") {
    bindChoiceEvents(question);
  } else if (type === "number") {
    bindNumberEvents(question);
  } else if (type === "height") {
    bindHeightEvents(question);
  } else if (type === "weight") {
    bindWeightEvents(question);
  }

  const skipButton = document.getElementById("skipSymptoms");

  if (skipButton) {
    skipButton.addEventListener("click", showResults);
  }

  updateQuizProgress();
}


/* ---------- choice (Yes/No, sex, activity) ---------- */

function buildChoiceHtml(question) {
  const selectedAnswer = answers[question.id];

  return `
    <div class="answer-options">
      ${question.options.map(option => `
        <button
          type="button"
          class="answer-option${selectedAnswer === option.value ? " selected" : ""}"
          data-value="${escapeHtml(option.value)}"
          aria-pressed="${selectedAnswer === option.value}"
        >
          ${escapeHtml(option[currentLanguage])}
        </button>
      `).join("")}
    </div>
  `;
}

function bindChoiceEvents(question) {
  questionArea
    .querySelectorAll(".answer-option")
    .forEach(button => {
      button.addEventListener("click", () => {
        answers[question.id] = button.dataset.value;
        invalidateResults();
        renderQuestion();
        updateRecommendations();
        updateDecisionTrail();
      });
    });
}


/* ---------- number input (age) ---------- */

function buildNumberHtml(question) {
  return `
    <div class="field-row">
      <input
        type="number"
        class="number-input"
        id="numberInput"
        inputmode="numeric"
        step="1"
        min="${question.min}"
        max="${question.max}"
        value="${escapeHtml(answers[question.id] ?? "")}"
        aria-label="${escapeHtml(question.question[currentLanguage])}"
        aria-describedby="fieldError"
        autocomplete="off"
      >
      <span class="unit-label">${escapeHtml(t(question.unitKey))}</span>
    </div>
  `;
}

function bindNumberEvents(question) {
  const input = document.getElementById("numberInput");

  attachFieldBehaviour(input, question, () => {
    answers[question.id] = input.value;
  });
}


/* ---------- height (cm OR feet + inches) ---------- */

function buildHeightHtml() {
  const usingFeet = unitPrefs.height === "ftin";

  const inputs = usingFeet
    ? `
      <div class="field-row">
        <input
          type="number"
          class="number-input"
          id="heightFeet"
          inputmode="numeric"
          step="1"
          min="0"
          value="${escapeHtml(answers.height_ft ?? "")}"
          aria-label="${escapeHtml(t("labelFt"))}"
          aria-describedby="fieldError"
          autocomplete="off"
        >
        <span class="unit-label">${escapeHtml(t("labelFt"))}</span>

        <input
          type="number"
          class="number-input"
          id="heightInches"
          inputmode="decimal"
          step="any"
          min="0"
          max="11.99"
          value="${escapeHtml(answers.height_in ?? "")}"
          aria-label="${escapeHtml(t("labelIn"))}"
          aria-describedby="fieldError"
          autocomplete="off"
        >
        <span class="unit-label">${escapeHtml(t("labelIn"))}</span>
      </div>
    `
    : `
      <div class="field-row">
        <input
          type="number"
          class="number-input"
          id="heightCm"
          inputmode="decimal"
          step="any"
          min="0"
          value="${escapeHtml(answers.height ?? "")}"
          aria-label="${escapeHtml(t("unitCm"))}"
          aria-describedby="fieldError"
          autocomplete="off"
        >
        <span class="unit-label">${escapeHtml(t("unitCm"))}</span>
      </div>
    `;

  return `
    <div class="unit-toggle" role="group">
      <button
        type="button"
        class="unit-button${usingFeet ? "" : " active"}"
        data-unit="cm"
      >${escapeHtml(t("unitToggleCm"))}</button>

      <button
        type="button"
        class="unit-button${usingFeet ? " active" : ""}"
        data-unit="ftin"
      >${escapeHtml(t("unitToggleFtIn"))}</button>
    </div>

    ${inputs}
  `;
}

function bindHeightEvents(question) {
  bindUnitToggle("height", () => {
    convertHeightUnit();
  });

  if (unitPrefs.height === "ftin") {
    const feet = document.getElementById("heightFeet");
    const inches = document.getElementById("heightInches");

    attachFieldBehaviour(feet, question, () => {
      answers.height_ft = feet.value;
    });

    attachFieldBehaviour(inches, question, () => {
      answers.height_in = inches.value;
    });
  } else {
    const cm = document.getElementById("heightCm");

    attachFieldBehaviour(cm, question, () => {
      answers.height = cm.value;
    });
  }
}

/* Carry the number over when the person switches unit */
function convertHeightUnit() {
  const newUnit = unitPrefs.height;   /* already switched */
  const wasFeet = newUnit === "cm";   /* so previous unit was ft/in */

  if (wasFeet) {
    /* ft/in -> cm */
    const cm = getHeightCmFromFeetInches();

    answers.height = Number.isFinite(cm)
      ? String(roundTo(cm, 1))
      : "";
  } else {
    /* cm -> ft/in */
    const cm = parseNumber(answers.height);

    if (Number.isFinite(cm) && cm > 0) {
      const totalInches = Math.round(cm / 2.54);

      answers.height_ft = String(Math.floor(totalInches / 12));
      answers.height_in = String(totalInches % 12);
    } else {
      answers.height_ft = "";
      answers.height_in = "";
    }
  }
}

function getHeightCmFromFeetInches() {
  const feet = parseNumber(answers.height_ft);

  const inches = isBlank(answers.height_in)
    ? 0
    : parseNumber(answers.height_in);

  if (!Number.isFinite(feet) || !Number.isFinite(inches)) {
    return NaN;
  }

  return (feet * 12 + inches) * 2.54;
}


/* ---------- weight (kg OR lb) + live BMI card ---------- */

function buildWeightHtml() {
  const usingPounds = unitPrefs.weight === "lb";

  return `
    <div class="unit-toggle" role="group">
      <button
        type="button"
        class="unit-button${usingPounds ? "" : " active"}"
        data-unit="kg"
      >${escapeHtml(t("unitToggleKg"))}</button>

      <button
        type="button"
        class="unit-button${usingPounds ? " active" : ""}"
        data-unit="lb"
      >${escapeHtml(t("unitToggleLb"))}</button>
    </div>

    <div class="field-row">
      <input
        type="number"
        class="number-input"
        id="weightInput"
        inputmode="decimal"
        step="any"
        min="0"
        value="${escapeHtml(answers.weight ?? "")}"
        aria-label="${escapeHtml(t("unitToggleKg"))}"
        aria-describedby="fieldError"
        autocomplete="off"
      >
      <span class="unit-label">${escapeHtml(usingPounds ? t("unitLb") : t("unitKg"))}</span>
    </div>

    <div
      class="bmi-card"
      id="bmiCard"
      aria-live="polite"
    ></div>
  `;
}

function bindWeightEvents(question) {
  bindUnitToggle("weight", () => {
    convertWeightUnit();
  });

  const input = document.getElementById("weightInput");

  attachFieldBehaviour(input, question, () => {
    answers.weight = input.value;
  });

  renderBmiCard();
}

function convertWeightUnit() {
  const newUnit = unitPrefs.weight;   /* already switched */
  const raw = parseNumber(answers.weight);

  if (!Number.isFinite(raw) || raw <= 0) {
    answers.weight = "";
    return;
  }

  answers.weight =
    newUnit === "lb"
      ? String(roundTo(raw * 2.20462262, 1))   /* kg -> lb */
      : String(roundTo(raw / 2.20462262, 1));  /* lb -> kg */
}

function renderBmiCard() {
  const card = document.getElementById("bmiCard");

  if (!card) return;

  const bmi = getBmi();

  if (bmi === null) {
    card.innerHTML = `
      <span class="bmi-title">${escapeHtml(t("bmiTitle"))}</span>
      <span class="bmi-waiting">${escapeHtml(t("bmiWaiting"))}</span>
    `;
    return;
  }

  card.innerHTML = `
    <span class="bmi-title">${escapeHtml(t("bmiTitle"))}</span>
    <strong class="bmi-value">${roundTo(bmi, 1).toFixed(1)}</strong>
    <span class="bmi-category">${escapeHtml(t(getBmiCategoryKey(bmi)))}</span>
    <small class="bmi-note">${escapeHtml(t("bmiNote"))}</small>
  `;
}


/* ---------- shared behaviour for numeric fields ---------- */

function attachFieldBehaviour(input, question, saveValue) {
  if (!input) return;

  input.addEventListener("input", () => {
    saveValue();
    invalidateResults();

    /* hide the error as soon as the value becomes valid */
    if (validateQuestion(question).status === "valid") {
      clearFieldError();
    }

    renderBmiCard();
    updateRecommendations();
    updateDecisionTrail();
  });

  /* only complain after the person leaves the field */
  input.addEventListener("blur", () => {
    const validation = validateQuestion(question);

    if (validation.status === "invalid") {
      showFieldError(validation);
    }
  });

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextButton.click();
    }
  });
}

function bindUnitToggle(key, convert) {
  questionArea
    .querySelectorAll(".unit-button")
    .forEach(button => {
      button.addEventListener("click", () => {
        if (unitPrefs[key] === button.dataset.unit) return;

        unitPrefs[key] = button.dataset.unit;
        convert();
        invalidateResults();
        renderQuestion();
        updateRecommendations();
        updateDecisionTrail();
      });
    });
}

function focusFirstInput() {
  const input = questionArea.querySelector(".number-input");

  if (input) {
    input.focus({ preventScroll: true });
  }
}


/* =========================================
   QUIZ PROGRESS
========================================= */

function updateQuizProgress() {

  const total =
    questions.length;

  const progress =
    ((currentQuestion + 1) / total) * 100;

  questionNumber.textContent =
    currentLanguage === "hi"
      ? `प्रश्न ${currentQuestion + 1} / ${total}`
      : `Question ${currentQuestion + 1} of ${total}`;

  progressBar.style.width =
    `${progress}%`;

  progressPercent.textContent =
    `${Math.round(progress)}%`;

  backButton.disabled =
    currentQuestion === 0;

  const question =
    questions[currentQuestion];

  const isLast =
    currentQuestion === total - 1;

  if (isLast) {
    nextButton.textContent = t("seeResults");
  } else if (question.optional && !isAnswered(question)) {
    nextButton.textContent = t("skip");
  } else {
    nextButton.textContent = t("next");
  }
}


/* =========================================
   MOVE TO NEXT QUESTION
========================================= */

nextButton.addEventListener(
  "click",
  () => {

    const question =
      questions[currentQuestion];

    const validation =
      validateQuestion(question);

    /* Required questions must be valid.
       Optional questions may be skipped (empty),
       but a typed value can never be invalid. */
    const blocked =
      question.optional
        ? validation.status === "invalid"
        : validation.status !== "valid";

    if (blocked) {
      showFieldError(validation);
      shakeQuestionArea();
      return;
    }

    if (
      currentQuestion <
      questions.length - 1
    ) {

      currentQuestion++;
      renderQuestion();
      focusFirstInput();

      document
        .getElementById("quiz")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    } else {

      showResults();

    }

  }
);


/* =========================================
   BACK BUTTON
========================================= */

backButton.addEventListener(
  "click",
  () => {

    if (currentQuestion > 0) {

      currentQuestion--;
      renderQuestion();
      focusFirstInput();

    }

  }
);


/* =========================================
   PERSONALIZED RECOMMENDATIONS

   Returns one item per ANSWERED question, in
   question order:  { id, group, text }
   group "risk"     -> tips shown in the risk results
   group "symptoms" -> awareness-only symptom notes
========================================= */

function getRecommendationItems() {

  const items = [];
  const hi = currentLanguage === "hi";

  const add = (id, group, text) => {
    items.push({ id, group, text });
  };

  /* ----- AGE ----- */
  if (isAnswered(questions.find(q => q.id === "age"))) {
    add("age", "risk", t("recAge"));
  }

  /* ----- SEX ----- */
  if (answers.sex === "unspecified") {
    add("sex", "risk", t("recSexUnspecified"));
  }

  /* ----- BMI (shown once weight + height are valid) ----- */
  const bmi = getBmi();

  if (bmi !== null) {
    add(
      "weight",
      "risk",
      tf("recBmi", {
        bmi: roundTo(bmi, 1).toFixed(1),
        category: t(getBmiCategoryKey(bmi)).toLowerCase()
      })
    );
  }

  /* ----- FAMILY HISTORY ----- */
  if (answers.family === "yes") {
    add("family", "risk",
      hi
        ? "🧬 आपने बताया कि परिवार में डायबिटीज़ है। पारिवारिक इतिहास एक महत्वपूर्ण स्वास्थ्य जानकारी है, इसलिए इसे नियमित स्वास्थ्य चर्चा में बताना उपयोगी है।"
        : "🧬 You indicated a family history of diabetes. Family history is useful health information to mention during routine healthcare discussions."
    );
  } else if (answers.family === "no") {
    add("family", "risk",
      hi
        ? "🧬 आपने परिवार में डायबिटीज़ के लिए 'नहीं' चुना।"
        : "🧬 You selected no for a family history of diabetes."
    );
  }

  /* ----- BLOOD PRESSURE ----- */
  if (answers.bp === "yes") {
    add("bp", "risk", t("recBpYes"));
  } else if (answers.bp === "no") {
    add("bp", "risk", t("recBpNo"));
  }

  /* ----- PHYSICAL ACTIVITY ----- */
  if (["0", "1", "2", "3"].includes(answers.activity)) {
    add("activity", "risk", t(`recAct${answers.activity}`));
  }

  /* ----- SYMPTOMS (awareness only) ----- */

  /* THIRST */
  if (answers.thirst === "yes") {
    add("thirst", "symptoms",
      hi
        ? "💧 आपने अधिक प्यास के लिए 'हां' चुना। यह कई कारणों से हो सकता है; यदि यह बना रहता है तो किसी विश्वसनीय वयस्क या स्वास्थ्य विशेषज्ञ से बात करें।"
        : "💧 You selected yes for unusual thirst. This can have many causes; if it continues, consider discussing it with a trusted adult or healthcare professional."
    );
  } else if (answers.thirst === "no") {
    add("thirst", "symptoms",
      hi
        ? "💧 आपने असामान्य प्यास के लिए 'नहीं' चुना। पर्याप्त पानी पीना सामान्य स्वास्थ्य के लिए उपयोगी है।"
        : "💧 You selected no for unusual thirst. Staying appropriately hydrated supports general health."
    );
  }

  /* URINATION */
  if (answers.urination === "yes") {
    add("urination", "symptoms",
      hi
        ? "🚻 बार-बार पेशाब आना कई कारणों से हो सकता है। यदि यह नया या लगातार है, तो किसी स्वास्थ्य विशेषज्ञ से बात करना उचित हो सकता है।"
        : "🚻 Frequent urination can have several causes. If this is new or persistent, discussing it with a healthcare professional may be appropriate."
    );
  } else if (answers.urination === "no") {
    add("urination", "symptoms",
      hi
        ? "🚻 आपने बार-बार पेशाब आने के लिए 'नहीं' चुना।"
        : "🚻 You selected no for frequent urination."
    );
  }

  /* FATIGUE */
  if (answers.fatigue === "yes") {
    add("fatigue", "symptoms",
      hi
        ? "⚡ आपने थकान के लिए 'हां' चुना। थकान के कई कारण हो सकते हैं; यदि यह बनी रहती है तो किसी विश्वसनीय वयस्क या स्वास्थ्य विशेषज्ञ से बात करें।"
        : "⚡ You selected yes for unusual tiredness. Fatigue can have many causes; if it persists, consider discussing it with a trusted adult or healthcare professional."
    );
  } else if (answers.fatigue === "no") {
    add("fatigue", "symptoms",
      hi
        ? "⚡ आपने असामान्य थकान के लिए 'नहीं' चुना।"
        : "⚡ You selected no for unusual tiredness."
    );
  }

  /* VISION */
  if (answers.vision === "yes") {
    add("vision", "symptoms",
      hi
        ? "👁️ आपने दृष्टि में बदलाव के लिए 'हां' चुना। दृष्टि में बदलाव के कई कारण हो सकते हैं और लगातार बदलाव के लिए स्वास्थ्य विशेषज्ञ से बात करना उपयोगी है।"
        : "👁️ You selected yes for vision changes. Vision changes can have several causes, and persistent changes are worth discussing with a healthcare professional."
    );
  } else if (answers.vision === "no") {
    add("vision", "symptoms",
      hi
        ? "👁️ आपने दृष्टि में बदलाव के लिए 'नहीं' चुना।"
        : "👁️ You selected no for vision changes."
    );
  }

  /* HEALING */
  if (answers.healing === "yes") {
    add("healing", "symptoms",
      hi
        ? "🩹 आपने घाव के धीरे ठीक होने के लिए 'हां' चुना। यदि यह बार-बार होता है, तो किसी स्वास्थ्य विशेषज्ञ से बात करें।"
        : "🩹 You selected yes for slower healing. If this happens repeatedly, consider discussing it with a healthcare professional."
    );
  } else if (answers.healing === "no") {
    add("healing", "symptoms",
      hi
        ? "🩹 आपने घाव के धीरे ठीक होने के लिए 'नहीं' चुना।"
        : "🩹 You selected no for slower healing."
    );
  }

  /* NEW AWARENESS QUESTIONS (yes/no -> advice line from translations) */
  [
    ["hunger",     "symptoms", "recHunger"],
    ["weightloss", "symptoms", "recWeight"],
    ["tingling",   "symptoms", "recTingling"],
    ["skin",       "symptoms", "recSkin"],
    ["sugary",     "symptoms", "recSugary"],
    ["tested",     "symptoms", "recTested"]
  ].forEach(([id, group, key]) => {
    if (answers[id] === "yes") {
      add(id, group, t(`${key}Yes`));
    } else if (answers[id] === "no") {
      add(id, group, t(`${key}No`));
    }
  });

  /* CHECKUP */
  if (answers.checkup === "yes") {
    add("checkup", "symptoms",
      hi
        ? "🩺 आपने बताया कि आपने स्वास्थ्य विशेषज्ञ से बात की है। स्वास्थ्य संबंधी चिंताओं को साझा करना एक अच्छा कदम है।"
        : "🩺 You indicated that you have discussed your concerns with a healthcare professional. Sharing health concerns is a useful step."
    );
  } else if (answers.checkup === "no") {
    add("checkup", "symptoms",
      hi
        ? "🩺 आपने हाल में स्वास्थ्य विशेषज्ञ से बात नहीं की है। यदि आपके उत्तरों को लेकर चिंता है, तो किसी विश्वसनीय वयस्क के साथ स्वास्थ्य विशेषज्ञ से बात करने पर विचार करें।"
        : "🩺 You indicated that you have not recently discussed your concerns with a healthcare professional. If you are concerned about your answers, consider speaking with a trusted adult and healthcare professional."
    );
  }

  return items;
}

/* One-line summary of the symptom answers (awareness only) */
function getSymptomSummary() {

  const answered =
    SYMPTOM_IDS.filter(id => answers[id]);

  if (answered.length === 0) {
    return null;
  }

  const count =
    SYMPTOM_IDS.filter(id => answers[id] === "yes").length;

  const hi = currentLanguage === "hi";

  if (count >= 4) {
    return hi
      ? "⭐ आपके कई उत्तरों में ऐसे लक्षण शामिल हैं जो डायबिटीज़ में हो सकते हैं। यह निदान नहीं है, लेकिन किसी विश्वसनीय वयस्क और स्वास्थ्य विशेषज्ञ से बात करना उचित रहेगा।"
      : "⭐ Several of your answers included symptoms that can occur with diabetes. This is not a diagnosis, but discussing them with a trusted adult and healthcare professional would be appropriate.";
  }

  if (count >= 1) {
    return hi
      ? "⭐ आपके कुछ उत्तरों में ऐसे लक्षण शामिल हैं जिनके कई कारण हो सकते हैं। यदि वे बने रहते हैं, तो किसी विश्वसनीय वयस्क या स्वास्थ्य विशेषज्ञ से बात करें।"
      : "⭐ Some of your answers included symptoms that can have many causes. If they persist, consider discussing them with a trusted adult or healthcare professional.";
  }

  return hi
    ? "🌱 इस क्विज़ में आपके उत्तरों से कई सामान्य डायबिटीज़ लक्षण सामने नहीं आए। फिर भी यह क्विज़ डायबिटीज़ को पूरी तरह से बाहर नहीं कर सकता।"
    : "🌱 Your answers did not show several of the common diabetes symptoms included in this quiz. However, this quiz cannot rule out diabetes.";
}


/* =========================================
   UPDATE LIVE RECOMMENDATIONS
========================================= */

function updateRecommendations() {

  const items =
    getRecommendationItems();

  if (items.length === 0) {

    liveRecommendations.innerHTML = `
      <li class="empty-recommendation">
        <span>💡</span>
        <span>
          ${t("liveEmpty")}
        </span>
      </li>
    `;

    return;

  }

  /* Show only the 4 most recent items during the live quiz */
  const visible =
    items.slice(-4);

  liveRecommendations.innerHTML =
    visible.map(item => `
      <li>
        ${escapeHtml(item.text)}
      </li>
    `).join("");

}


/* =========================================
   DECISION TRAIL
========================================= */

function formatAnswer(question) {

  const type =
    question.type || "choice";

  if (type === "choice") {
    const option =
      question.options.find(
        item => item.value === answers[question.id]
      );

    return option ? option[currentLanguage] : "";
  }

  if (type === "number") {
    return `${parseNumber(answers[question.id])} ${t(question.unitKey)}`;
  }

  if (type === "height") {
    if (unitPrefs.height === "ftin") {
      const inches = isBlank(answers.height_in)
        ? 0
        : parseNumber(answers.height_in);

      return `${parseNumber(answers.height_ft)} ${t("labelFt")} ${inches} ${t("labelIn")}`;
    }

    return `${parseNumber(answers.height)} ${t("unitCm")}`;
  }

  if (type === "weight") {
    return `${parseNumber(answers.weight)} ${t(unitPrefs.weight === "lb" ? "unitLb" : "unitKg")}`;
  }

  return "";
}

function updateDecisionTrail() {

  const answeredQuestions =
    questions.filter(isAnswered);

  if (answeredQuestions.length === 0) {

    decisionTrail.innerHTML = `
      <p class="empty-decision">
        ${t("decisionEmpty")}
      </p>
    `;

    return;

  }

  const rows = [];

  answeredQuestions.forEach(question => {

    rows.push(`
      <div class="decision-item">
        <span>
          ${escapeHtml(question.question[currentLanguage])}
        </span>
        <span class="decision-answer">
          ${escapeHtml(formatAnswer(question))}
        </span>
      </div>
    `);

    /* show the calculated BMI right after the weight row */
    if (question.id === "weight") {
      const bmi = getBmi();

      if (bmi !== null) {
        rows.push(`
          <div class="decision-item">
            <span>${escapeHtml(t("bmiShort"))}</span>
            <span class="decision-answer">
              ${roundTo(bmi, 1).toFixed(1)}
            </span>
          </div>
        `);
      }
    }

  });

  decisionTrail.innerHTML =
    rows.join("");

}


/* =========================================
   BUILD THE PAYLOAD FOR THE RISK MODEL

   Only the 6 risk-assessment answers go in here.
   Symptom answers are deliberately NOT included.
   Returns null if a required answer is missing.
========================================= */

function buildRiskPayload() {

  const riskQuestions =
    questions.filter(q => q.section === "risk");

  if (!riskQuestions.every(isAnswered)) {
    return null;
  }

  const heightCm = getHeightCm();
  const weightKg = getWeightKg();
  const bmi = weightKg / ((heightCm / 100) ** 2);

  return {
    age: parseNumber(answers.age),

    /* "male" | "female" | "unspecified" */
    sex: answers.sex,

    height: roundTo(heightCm, 1),   /* always centimetres */
    weight: roundTo(weightKg, 1),   /* always kilograms   */
    bmi: roundTo(bmi, 2),

    family_history: answers.family === "yes" ? 1 : 0,
    high_blood_pressure: answers.bp === "yes" ? 1 : 0,

    /* 0 = <30, 1 = 30-149, 2 = 150-299, 3 = 300+ minutes/week */
    physical_activity: Number(answers.activity)
  };

}


/* =========================================
   RESULTS
========================================= */

let resultState = null;      /* { status, payload, prediction } */
let resultRequestId = 0;     /* ignores out-of-date responses */

/* Hide stale results when an answer changes */
function invalidateResults() {

  resultRequestId++;

  if (resultState) {
    resultState = null;
    quizResult.classList.add("hidden");
  }

}

async function showResults() {

  const payload =
    buildRiskPayload();

  /* A required risk answer is missing -> go and fix it */
  if (!payload) {

    const firstMissing =
      questions.findIndex(
        q => q.section === "risk" && !isAnswered(q)
      );

    currentQuestion = Math.max(firstMissing, 0);
    renderQuestion();

    showFieldError(
      validateQuestion(questions[currentQuestion])
    );

    return;

  }

  const requestId = ++resultRequestId;

  resultState = { status: "loading", payload };

  renderResults();

  quizResult.classList.remove("hidden");

  quizResult.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  try {

    const prediction =
      await DiaCareRiskAPI.predict(payload);

    if (requestId !== resultRequestId) return;

    resultState = { status: "ready", payload, prediction };

  } catch (error) {

    console.error("Risk estimate failed:", error);

    if (requestId !== resultRequestId) return;

    resultState = { status: "error", payload };

  }

  renderResults();

}

retryResults.addEventListener("click", showResults);


/* ----- plain-language explanation of the risk factors ----- */

function buildRiskFactors(payload) {

  const factors = [];

  /* AGE */
  factors.push({
    label: t("factorAge"),
    value: `${payload.age}`,
    tone:
      payload.age >= 45 ? "higher"
      : payload.age >= 35 ? "neutral"
      : "lower",
    text:
      t(
        payload.age >= 45 ? "factorAgeHigh"
        : payload.age >= 35 ? "factorAgeMid"
        : "factorAgeLow"
      )
  });

  /* BMI (use the unrounded value so every place on the page agrees) */
  const bmi = getBmi() ?? payload.bmi;

  let bmiTone = "lower";
  let bmiText = t("factorBmiHealthy");

  if (bmi < 18.5) {
    bmiTone = "neutral";
    bmiText = t("factorBmiUnder");
  } else if (bmi >= 30) {
    bmiTone = "higher";
    bmiText = t("factorBmiObese");
  } else if (bmi >= 25) {
    bmiTone = "higher";
    bmiText = t("factorBmiOver");
  } else if (bmi >= 23) {
    bmiTone = "neutral";
    bmiText = `${t("factorBmiHealthy")} ${t("bmiSouthAsianNote")}`;
  }

  factors.push({
    label: t("factorBmi"),
    value: roundTo(bmi, 1).toFixed(1),
    tone: bmiTone,
    text: bmiText
  });

  /* FAMILY HISTORY */
  factors.push({
    label: t("factorFamily"),
    value: payload.family_history ? t("yes") : t("no"),
    tone: payload.family_history ? "higher" : "neutral",
    text: t(payload.family_history ? "factorFamilyYes" : "factorFamilyNo")
  });

  /* BLOOD PRESSURE */
  factors.push({
    label: t("factorBp"),
    value: payload.high_blood_pressure ? t("yes") : t("no"),
    tone: payload.high_blood_pressure ? "higher" : "neutral",
    text: t(payload.high_blood_pressure ? "factorBpYes" : "factorBpNo")
  });

  /* PHYSICAL ACTIVITY */
  const activityQuestion =
    questions.find(q => q.id === "activity");

  const activityLabel =
    activityQuestion.options
      .find(o => o.value === String(payload.physical_activity))[currentLanguage];

  factors.push({
    label: t("factorActivity"),
    value: activityLabel,
    tone:
      payload.physical_activity === 0 ? "higher"
      : payload.physical_activity === 1 ? "higher"
      : "lower",
    text:
      t(
        payload.physical_activity === 0 ? "factorActNone"
        : payload.physical_activity === 1 ? "factorActSome"
        : "factorActGood"
      )
  });

  return factors;

}

function renderFactors(payload) {

  const tagKey = {
    higher: "tagHigher",
    neutral: "tagNeutral",
    lower: "tagLower"
  };

  riskFactors.innerHTML =
    buildRiskFactors(payload).map(factor => `
      <div class="factor-item factor-${factor.tone}">
        <div class="factor-head">
          <strong>${escapeHtml(factor.label)}</strong>
          <span class="factor-value">${escapeHtml(factor.value)}</span>
          <span class="factor-tag">${escapeHtml(t(tagKey[factor.tone]))}</span>
        </div>
        <p>${escapeHtml(factor.text)}</p>
      </div>
    `).join("");

}



/* =========================================
   DONUT CHARTS (plain SVG, no library)

   slices: [{ key, label, value }]   key -> CSS class "slice-<key>"
   These charts only summarise the person's OWN answers.
   They are never a diagnosis or a probability.
========================================= */

function buildDonut(slices, centerNumber, centerLabel, ariaLabel) {

  const visible = slices.filter(slice => slice.value > 0);
  const total = visible.reduce((sum, slice) => sum + slice.value, 0);

  /* circle with circumference 100, so values map directly to percent */
  const radius = 15.9155;
  let offset = 25;                      /* start at 12 o'clock */

  const arcs = visible.map(slice => {
    const percent = (slice.value / total) * 100;
    const arc = `
      <circle
        class="donut-slice slice-${slice.key}"
        cx="21" cy="21" r="${radius}"
        fill="none" stroke-width="6"
        stroke-dasharray="${percent.toFixed(3)} ${(100 - percent).toFixed(3)}"
        stroke-dashoffset="${offset.toFixed(3)}"
      ></circle>`;
    offset -= percent;
    return arc;
  }).join("");

  const legend = slices.map(slice => `
    <li>
      <span class="legend-swatch slice-${slice.key}" aria-hidden="true"></span>
      <span class="legend-label">${escapeHtml(slice.label)}</span>
      <strong class="legend-value">${slice.value}</strong>
    </li>
  `).join("");

  return `
    <div class="donut-wrap">
      <svg
        class="donut"
        viewBox="0 0 42 42"
        role="img"
        aria-label="${escapeHtml(ariaLabel)}"
      >
        <circle class="donut-track" cx="21" cy="21" r="${radius}"
                fill="none" stroke-width="6"></circle>
        ${arcs}
        <text x="21" y="21.5" class="donut-number"
              text-anchor="middle">${centerNumber}</text>
        <text x="21" y="26.5" class="donut-caption"
              text-anchor="middle">${escapeHtml(centerLabel)}</text>
      </svg>

      <ul class="donut-legend">${legend}</ul>
    </div>
  `;

}

function renderCharts(payload) {

  /* ----- chart 1: how the 5 risk factors line up ----- */
  const factors = buildRiskFactors(payload);

  const count = tone =>
    factors.filter(factor => factor.tone === tone).length;

  chartFactors.innerHTML = buildDonut(
    [
      { key: "higher",  label: t("tagHigher"),  value: count("higher") },
      { key: "neutral", label: t("tagNeutral"), value: count("neutral") },
      { key: "lower",   label: t("tagLower"),   value: count("lower") }
    ],
    factors.length,
    t("chartFactorsCenter"),
    t("chartFactorsLabel")
  );

  /* ----- chart 2: symptom answers (awareness only) ----- */
  const yes = SYMPTOM_IDS.filter(id => answers[id] === "yes").length;
  const no = SYMPTOM_IDS.filter(id => answers[id] === "no").length;
  const skipped = SYMPTOM_IDS.length - yes - no;

  if (yes + no === 0) {
    chartSymptoms.innerHTML =
      `<p class="chart-empty">${escapeHtml(t("symptomSkipped"))}</p>`;
    return;
  }

  chartSymptoms.innerHTML = buildDonut(
    [
      { key: "yes",     label: t("yes"),          value: yes },
      { key: "no",      label: t("no"),           value: no },
      { key: "skipped", label: t("chartSkipped"), value: skipped }
    ],
    SYMPTOM_IDS.length,
    t("chartSymptomsCenter"),
    t("chartSymptomsLabel")
  );

}

/* ----- draw whatever state we are in ----- */

function renderResults() {

  if (!resultState) return;

  const { status, payload, prediction } = resultState;

  const show = (element, visible) =>
    element.classList.toggle("is-hidden", !visible);

  /* start from a clean slate */
  show(riskLevel, false);
  show(riskScoreNote, false);
  show(riskSourceNote, false);
  show(chartsBlock, false);
  show(careCta, false);
  show(factorsBlock, false);
  show(tipsBlock, false);
  show(symptomBlock, false);
  show(retryResults, false);

  riskLevel.className = "risk-level is-hidden";

  /* ----- loading ----- */
  if (status === "loading") {

    resultTitle.textContent = t("resultPendingTitle");
    resultText.textContent = t("resultPendingText");
    return;

  }

  /* ----- error ----- */
  if (status === "error") {

    resultTitle.textContent = t("resultErrorTitle");
    resultText.textContent = t("resultErrorText");
    show(retryResults, true);
    return;

  }

  /* ----- ready ----- */
  const level =
    String(prediction.risk_level).toLowerCase();   /* low | moderate | high */

  const levelKey = {
    low: "Low",
    moderate: "Moderate",
    high: "High"
  }[level] || "Low";

  resultTitle.textContent = t("riskLabel");

  riskLevel.textContent = t(`risk${levelKey}`);
  riskLevel.className = `risk-level risk-${level}`;

  resultText.textContent = t(`risk${levelKey}Text`);

  /* where did this estimate come from? */
  if (prediction.source === "mock") {

    riskSourceNote.textContent = t("sourceMock");
    riskSourceNote.classList.add("demo");
    show(riskSourceNote, true);

  } else {

    riskSourceNote.textContent = t("sourceModel");
    riskSourceNote.classList.remove("demo");
    show(riskSourceNote, true);

    if (typeof prediction.probability === "number") {
      riskScoreNote.textContent =
        tf("modelScore", {
          score: prediction.probability.toFixed(2)
        });
      show(riskScoreNote, true);
    }

  }

  /* factors */
  renderCharts(payload);
  show(chartsBlock, true);

  renderFactors(payload);
  show(factorsBlock, true);

  show(careCta, true);

  /* tips for the risk factors */
  const items = getRecommendationItems();

  const tips =
    items.filter(item => item.group === "risk");

  finalRecommendations.innerHTML =
    tips.map(item => `
      <div class="final-item">
        ${escapeHtml(item.text)}
      </div>
    `).join("");

  show(tipsBlock, tips.length > 0);

  /* symptoms & awareness (separate, never part of the estimate) */
  const symptomItems =
    items.filter(item => item.group === "symptoms");

  const summary = getSymptomSummary();

  const symptomRows = [];

  if (summary) {
    symptomRows.push(summary);
  } else {
    symptomRows.push(t("symptomSkipped"));
  }

  symptomItems.forEach(item => symptomRows.push(item.text));

  symptomRecommendations.innerHTML =
    symptomRows.map(text => `
      <div class="final-item">
        ${escapeHtml(text)}
      </div>
    `).join("");

  show(symptomBlock, true);

}


/* =========================================
   UPDATE RESULT AFTER LANGUAGE CHANGE
========================================= */

function updateResultLanguage() {

  if (
    quizResult.classList.contains("hidden")
  ) {
    return;
  }

  renderResults();

}


/* =========================================
   RESTART QUIZ
========================================= */

restartQuiz.addEventListener(
  "click",
  () => {

    currentQuestion = 0;
    answers = {};

    invalidateResults();
    quizResult.classList.add("hidden");

    renderQuestion();
    updateRecommendations();
    updateDecisionTrail();

    document
      .getElementById("quiz")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);



/* =========================================
   TESTING TABS
========================================= */

const testingTabs =
  document.querySelectorAll(".testing-tab");

const testingPanels =
  document.querySelectorAll(".testing-panel");


testingTabs.forEach(tab => {

  tab.addEventListener(
    "click",
    () => {

      const target =
        tab.dataset.test;


      testingTabs.forEach(item => {

        item.classList.remove("active");

        item.setAttribute(
          "aria-selected",
          "false"
        );

      });


      testingPanels.forEach(panel => {

        panel.classList.remove("active");

      });


      tab.classList.add("active");

      tab.setAttribute(
        "aria-selected",
        "true"
      );


      document
        .getElementById(target)
        .classList.add("active");

    }
  );

});


/* =========================================
   TESTING KNOWLEDGE CHECK
========================================= */

const testAnswers =
  document.querySelectorAll(".test-answer");

const testingFeedback =
  document.getElementById(
    "testingFeedback"
  );


testAnswers.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      if (
        button.dataset.answer === "blood"
      ) {

        testingFeedback.textContent =
          currentLanguage === "hi"
            ? "✓ सही! रक्त आधारित जांच में ग्लूकोज़ मापने के लिए रक्त का नमूना लिया जाता है।"
            : "✓ Correct! Blood-based testing uses a blood sample to measure glucose.";

        testingFeedback.className =
          "testing-feedback correct";

      } else {

        testingFeedback.textContent =
          currentLanguage === "hi"
            ? "पूरी तरह सही नहीं। नॉन-इनवेसिव तरीकों में रक्त का नमूना लेने की आवश्यकता नहीं होती।"
            : "Not quite. Non-invasive approaches do not require taking a blood sample.";

        testingFeedback.className =
          "testing-feedback incorrect";

      }

    }
  );

});


/* =========================================
   INITIALIZE
========================================= */

questionCount.textContent = questions.length;

applyTheme();

applyTranslations();

renderQuestion();

updateRecommendations();

updateDecisionTrail();