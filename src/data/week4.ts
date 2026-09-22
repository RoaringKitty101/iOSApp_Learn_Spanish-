import { DayLesson } from '../types';

export const week4Lessons: DayLesson[] = [
  {
    day: 22,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Conectores Avanzados y Fluidez',
    titleEn: 'Connectors & Flow of Speech',
    subtitle: 'Stop sounding like a robot. Speak smoothly like an educated native.',
    category: 'Grammar',
    cefr: 'B1',
    durationMinutes: 12,
    iconName: 'Link',
    summary: 'Master connectors: sin embargo, por lo tanto, además, en cambio, ya que.',
    vocabulary: [
      {
        id: 'w4d22_1',
        es: 'Sin embargo / No obstante',
        en: 'However / Nonetheless',
        phonetic: 'seen ehm-BAR-goh / noh ohbs-TAHN-teh',
        exampleEs: 'Estudió mucho; sin embargo, el examen fue difícil.',
        exampleEn: 'He studied a lot; however, the exam was difficult.',
        tip: 'Adds sophisticated nuance to your speaking and writing.'
      },
      {
        id: 'w4d22_2',
        es: 'Por lo tanto / Así que',
        en: 'Therefore / So',
        phonetic: 'pohr loh TAHN-toh / ah-SEE keh',
        exampleEs: 'Tengo que madrugar, por lo tanto me voy a dormir ya.',
        exampleEn: 'I have to wake up early, therefore I am going to sleep now.',
        tip: '"Así que" is more casual; "por lo tanto" is slightly more formal.'
      },
      {
        id: 'w4d22_3',
        es: 'Además / Por otra parte',
        en: 'Furthermore / On the other hand',
        phonetic: 'ah-deh-MAHS / pohr OH-trah PAR-teh',
        exampleEs: 'La comida es deliciosa y, además, muy económica.',
        exampleEn: 'The food is delicious and, furthermore, very affordable.',
        tip: 'Use to stack positive arguments or points.'
      },
      {
        id: 'w4d22_4',
        es: 'En realidad / De hecho',
        en: 'Actually / In fact',
        phonetic: 'ehn reh-ah-lee-DAHD / deh EH-choh',
        exampleEs: 'En realidad, ya conocía esa ciudad.',
        exampleEn: 'Actually, I already knew that city.',
        tip: 'Warning: "Actualmente" in Spanish means "currently", NOT "actually"! Use "En realidad".'
      }
    ],
    grammar: {
      title: 'False Cognates (Falsos Amigos) to Avoid',
      rule: 'Beware of tricky words: "Actualmente" = Currently (NOT actually), "Embarazada" = Pregnant (NOT embarrassed), "Constipado" = Having a cold (NOT constipated).',
      examples: [
        { es: 'Tengo vergüenza (I feel embarrassed).', en: 'Not "estoy embarazado"!' },
        { es: 'En realidad no me gusta (Actually I don\'t like it).', en: 'Not "actualmente"!' }
      ],
      proTip: 'Knowing false friends saves you from funny cultural misunderstandings.'
    },
    dialogue: [
      {
        id: 'w4d22_dia_1',
        speaker: 'Profesor',
        role: 'native',
        avatar: '👨‍🏫',
        textEs: 'Tu español suena mucho más fluido ahora.',
        textEn: 'Your Spanish sounds much more fluid now.'
      },
      {
        id: 'w4d22_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Gracias. Los conectores me ayudan a unir mis ideas con naturalidad.',
        textEn: 'Thank you. Connectors help me join my ideas naturally.'
      }
    ],
    quiz: [
      {
        id: 'w4d22_q1',
        question: 'What does "Actualmente" mean in Spanish?',
        type: 'multiple-choice',
        options: ['Actually', 'Currently / At present', 'Accidentally', 'Active'],
        correctIndex: 1,
        explanation: '"Actualmente" means currently/nowadays. Use "en realidad" for actually.'
      }
    ]
  },
  {
    day: 23,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Emergencias y Pérdidas',
    titleEn: 'Emergencies & Lost Items',
    subtitle: 'Handle lost passports, emergency calls, and police reports calmly.',
    category: 'Survival',
    cefr: 'B1',
    durationMinutes: 10,
    iconName: 'ShieldAlert',
    summary: 'Never panic abroad. Know how to report lost cards, medical emergencies, and find police.',
    vocabulary: [
      {
        id: 'w4d23_1',
        es: '¡Ayuda! / ¡Socorro!',
        en: 'Help!',
        phonetic: 'ah-YOO-dah / soh-KOHR-roh',
        exampleEs: '¡Por favor, ayúdeme, es una emergencia!',
        exampleEn: 'Please, help me, it is an emergency!',
        tip: 'Emergency phone number across all European Union countries is 112.'
      },
      {
        id: 'w4d23_2',
        es: 'He perdido mi pasaporte / mi billetera',
        en: 'I have lost my passport / my wallet',
        phonetic: 'eh pehr-DEE-doh mee pah-sah-POR-teh / mee bee-yeh-TEH-rah',
        exampleEs: 'He perdido mi cartera en el metro.',
        exampleEn: 'I have lost my wallet on the subway.',
        tip: '"Cartera" is wallet in Spain; "billetera" in Latin America.'
      },
      {
        id: 'w4d23_3',
        es: '¿Dónde está la comisaría de policía?',
        en: 'Where is the police station?',
        phonetic: 'DOHN-deh ehs-TAH lah koh-mee-sah-REE-ah deh poh-lee-SEE-ah',
        exampleEs: 'Necesito poner una denuncia por robo.',
        exampleEn: 'I need to file a police report for theft.',
        tip: '"Poner una denuncia" = to file an official report.'
      },
      {
        id: 'w4d23_4',
        es: 'Llame a una ambulancia, por favor',
        en: 'Call an ambulance, please',
        phonetic: 'YAH-meh ah OO-nah ahm-boo-LAHN-syah, pohr fah-VOR',
        exampleEs: 'Alguien se desmayó, llame a una ambulancia rápido.',
        exampleEn: 'Someone fainted, call an ambulance quickly.',
        tip: 'Use imperative formal "Llame".'
      }
    ],
    grammar: {
      title: 'Present Perfect: "He perdido..." (Have done)',
      rule: 'Use "Haber" + past participle (-ado, -ido) for recent actions with current relevance: He perdido (I have lost), He olvidado (I have forgotten).',
      examples: [
        { es: 'He olvidado mis llaves.', en: 'I have forgotten my keys.' },
        { es: '¿Has visto mi teléfono?', en: 'Have you seen my phone?' }
      ],
      proTip: 'Haber conjugation: He, Has, Ha, Hemos, Han.'
    },
    dialogue: [
      {
        id: 'w4d23_dia_1',
        speaker: 'Policía',
        role: 'native',
        avatar: '👮',
        textEs: 'Buenas tardes. ¿En qué le puedo asistir?',
        textEn: 'Good afternoon. How can I assist you?'
      },
      {
        id: 'w4d23_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'He perdido mi mochila con mis documentos en la estación.',
        textEn: 'I have lost my backpack with my documents at the station.'
      }
    ],
    quiz: [
      {
        id: 'w4d23_q1',
        question: 'What is the Spanish word for filing a police report?',
        type: 'multiple-choice',
        options: ['Hacer una compra', 'Poner una denuncia', 'Llamar al hotel', 'Comprar un billete'],
        correctIndex: 1,
        explanation: '"Poner una denuncia" means to file an official report.'
      }
    ]
  },
  {
    day: 24,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Llamadas y WhatsApp en Español',
    titleEn: 'Phone Calls & Texting Etiquette',
    subtitle: 'Answer calls, leave voicemails, and chat like a native texter.',
    category: 'Conversation',
    cefr: 'B1',
    durationMinutes: 10,
    iconName: 'PhoneCall',
    summary: 'Master phone greetings (¿Dígame?, ¿Bueno?, Aló), audio messages, and texting abbreviations.',
    vocabulary: [
      {
        id: 'w4d24_1',
        es: '¿Dígame? / ¿Bueno? / ¡Aló!',
        en: 'Hello? (answering phone: Spain / Mexico / South America)',
        phonetic: 'DEE-gah-meh / BWEH-noh / ah-LOH',
        exampleEs: '¿Dígame? — Hola, ¿se encuentra Laura?',
        exampleEn: 'Hello? (Spain) — Hi, is Laura available?',
        tip: 'In Spain people answer with "¿Dígame?" or "Sí?". In Mexico: "¿Bueno?". In Colombia: "Aló".'
      },
      {
        id: 'w4d24_2',
        es: '¿De parte de quién?',
        en: 'Who is calling? / On behalf of whom?',
        phonetic: 'deh PAR-teh deh KYEHN',
        exampleEs: '¿De parte de quién, por favor? — De Juan Gómez.',
        exampleEn: 'Who is calling, please? — Juan Gómez.',
        tip: 'Standard formal phone etiquette.'
      },
      {
        id: 'w4d24_3',
        es: 'Te mando un mensaje de audio por WhatsApp',
        en: 'I\'ll send you a voice note on WhatsApp',
        phonetic: 'teh MAHN-doh oon mehn-SAH-heh deh OW-dyoh',
        exampleEs: 'No puedo escribir ahora, te mando un audio.',
        exampleEn: 'I cannot type right now, I will send you a voice note.',
        tip: 'WhatsApp voice notes are the primary communication medium in Hispanic culture!'
      },
      {
        id: 'w4d24_4',
        es: 'Jajaja / Tqm / Xfa (Text slang)',
        en: 'Hahaha / Love you / Please (Spanish text shorthand)',
        phonetic: 'hah-hah-hah',
        exampleEs: '¡Nos vemos a las ocho, xfa no tardes! Jajaja.',
        exampleEn: 'See you at eight, please don\'t be late! Hahaha.',
        tip: 'In Spanish, laughing is written with "J" (jajaja), not "H"!'
      }
    ],
    grammar: {
      title: 'Direct Object Pronouns (lo, la, los, las)',
      rule: 'Replace nouns with pronouns to keep texts snappy: ¿Tienes el billete? -> Sí, LO tengo. ¿Viste a María? -> Sí, LA vi.',
      examples: [
        { es: 'Te lo envío ahora mismo.', en: 'I\'ll send it to you right now.' },
        { es: 'No lo encuentro.', en: 'I can\'t find it.' }
      ],
      proTip: 'Direct pronouns go before the conjugated verb.'
    },
    dialogue: [
      {
        id: 'w4d24_dia_1',
        speaker: 'Voz Telefónica',
        role: 'native',
        avatar: '📞',
        textEs: 'Clínica Dental, ¿dígame?',
        textEn: 'Dental Clinic, speaking?'
      },
      {
        id: 'w4d24_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Hola, llamaba para confirmar mi cita de mañana a las diez.',
        textEn: 'Hi, I was calling to confirm my appointment tomorrow at ten.'
      }
    ],
    quiz: [
      {
        id: 'w4d24_q1',
        question: 'How is laughing in text written in Spanish?',
        type: 'multiple-choice',
        options: ['hahaha', 'jajaja', 'kakaka', 'lalala'],
        correctIndex: 1,
        explanation: 'In Spanish the "J" sounds like English "H", so laughter is "jajaja".'
      }
    ]
  },
  {
    day: 25,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Expresiones Idiomáticas y Dichos',
    titleEn: 'Native Idioms & Colloquial Gems',
    subtitle: 'The colorful phrases native speakers use that aren\'t in standard textbooks.',
    category: 'Culture',
    cefr: 'B1',
    durationMinutes: 12,
    iconName: 'Laugh',
    summary: 'Discover idiomatic expressions like pan comido, tomar el pelo, and ponerse las pilas.',
    vocabulary: [
      {
        id: 'w4d25_1',
        es: 'Es pan comido',
        en: 'It\'s a piece of cake (very easy)',
        phonetic: 'ehs pahn koh-MEE-doh',
        exampleEs: '¡Este examen de español es pan comido!',
        exampleEn: 'This Spanish exam is a piece of cake!',
        tip: 'Literally means "it is eaten bread".'
      },
      {
        id: 'w4d25_2',
        es: 'Tomar el pelo',
        en: 'To pull someone\'s leg / To tease',
        phonetic: 'toh-MAR ehl PEH-loh',
        exampleEs: '¿En serio ganaste la lotería o me estás tomando el pelo?',
        exampleEn: 'Did you really win the lottery or are you pulling my leg?',
        tip: 'Literally means "to take the hair".'
      },
      {
        id: 'w4d25_3',
        es: 'Ponerse las pilas',
        en: 'To put your batteries in / To get to work energetically',
        phonetic: 'poh-NEHR-seh lahs PEE-lahs',
        exampleEs: '¡Vamos a ponernos las pilas para terminar el proyecto!',
        exampleEn: 'Let\'s get our act together to finish the project!',
        tip: 'One of the most beloved motivating phrases across Latin America and Spain.'
      },
      {
        id: 'w4d25_4',
        es: 'Costar un ojo de la cara',
        en: 'To cost an arm and a leg',
        phonetic: 'kohs-TAR oon OH-hoh deh lah KAH-rah',
        exampleEs: 'Ese hotel de lujo cuesta un ojo de la cara.',
        exampleEn: 'That luxury hotel costs an eye from the face!',
        tip: 'Spanish uses "an eye from the face" instead of an arm and leg.'
      }
    ],
    grammar: {
      title: 'Idiomatic Thinking: Why Literal Translation Fails',
      rule: 'Idioms carry emotional and cultural color. When speaking with natives, dropping one natural idiom shows deep language appreciation and builds instant rapport.',
      examples: [
        { es: 'No pasa nada (No problem / Don\'t worry about it).', en: 'Universal Spanish reassurance.' },
        { es: 'Estar en las nubes (To be daydreaming).', en: 'Literally: to be in the clouds.' }
      ],
      proTip: '"No pasa nada" is spoken millions of times daily in Spain.'
    },
    dialogue: [
      {
        id: 'w4d25_dia_1',
        speaker: 'Diego',
        role: 'native',
        avatar: '😎',
        textEs: '¿Crees que aprobarás el examen de español?',
        textEn: 'Do you think you will pass the Spanish exam?'
      },
      {
        id: 'w4d25_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Por supuesto! Estudié todos los días, así que será pan comido.',
        textEn: 'Of course! I studied every day, so it will be a piece of cake.'
      }
    ],
    quiz: [
      {
        id: 'w4d25_q1',
        question: 'What does "Es pan comido" mean?',
        type: 'multiple-choice',
        options: ['It is expensive', 'It is very easy (a piece of cake)', 'It is hot bread', 'It is boring'],
        correctIndex: 1,
        explanation: '"Pan comido" means something is extremely easy to accomplish.'
      }
    ]
  },
  {
    day: 26,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'El Subjuntivo Básico: ¡Ojalá! y Buenos Deseos',
    titleEn: 'The Subjunctive: Wishes & Hopes',
    subtitle: 'Demystify the subjunctive mood through every-day friendly wishes.',
    category: 'Grammar',
    cefr: 'B1',
    durationMinutes: 14,
    iconName: 'Sparkle',
    summary: 'Understand the mood of wishes, doubts, and hopes: ¡Que tengas un buen día! and ¡Ojalá!',
    vocabulary: [
      {
        id: 'w4d26_1',
        es: '¡Ojalá!',
        en: 'I hope so! / God willing!',
        phonetic: 'oh-hah-LAH',
        exampleEs: '¿Hará buen tiempo mañana? — ¡Ojalá!',
        exampleEn: 'Will the weather be nice tomorrow? — I hope so!',
        tip: 'Comes from Arabic "Insha\'Allah". Always triggers subjunctive.'
      },
      {
        id: 'w4d26_2',
        es: '¡Que tengas un buen día!',
        en: 'Have a good day!',
        phonetic: 'keh TEHN-gahs oon bwehn DEE-ah',
        exampleEs: '¡Hasta luego, que tengas un excelente fin de semana!',
        exampleEn: 'See you later, have an excellent weekend!',
        tip: 'Short for "Espero que tengas...". Native Spanish farewell.'
      },
      {
        id: 'w4d26_3',
        es: '¡Que te vaya bien!',
        en: 'I hope all goes well for you!',
        phonetic: 'keh teh VAH-yah byehn',
        exampleEs: 'Buena suerte con tu entrevista, ¡que te vaya muy bien!',
        exampleEn: 'Good luck with your interview, hope it goes very well!',
        tip: 'Said whenever someone is leaving or taking a test/journey.'
      },
      {
        id: 'w4d26_4',
        es: 'Espero que podamos vernos pronto',
        en: 'I hope that we can see each other soon',
        phonetic: 'ehs-PEH-roh keh poh-DAH-mohs vehr-NOHS PROHN-toh',
        exampleEs: 'Fue un placer. Espero que podamos vernos pronto.',
        exampleEn: 'It was a pleasure. I hope that we can see each other soon.',
        tip: 'Formula: Espero que + subjunctive verb.'
      }
    ],
    grammar: {
      title: 'The Subjunctive Switch (Vowel Flip)',
      rule: 'In the present subjunctive, vowels flip! -AR verbs take "E" endings (hablar -> hable), while -ER/-IR verbs take "A" endings (tener -> tenga, comer -> coma).',
      examples: [
        { es: 'Que pases un buen día (pasar -> pases).', en: 'Have a good day.' },
        { es: 'Que duermas bien (dormir -> duermas).', en: 'Sleep well.' }
      ],
      proTip: 'Don\'t fear the subjunctive; you will mostly use it in set phrases of goodwill.'
    },
    dialogue: [
      {
        id: 'w4d26_dia_1',
        speaker: 'Camarero',
        role: 'native',
        avatar: '☕',
        textEs: 'Aquí tiene su cuenta. ¡Que tenga una feliz tarde!',
        textEn: 'Here is your check. Have a happy afternoon!'
      },
      {
        id: 'w4d26_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Igualmente! Muchas gracias por la excelente atención.',
        textEn: 'Likewise! Thank you very much for the excellent service.'
      }
    ],
    quiz: [
      {
        id: 'w4d26_q1',
        question: 'Which phrase is the standard Spanish wish for "Have a good day"?',
        type: 'multiple-choice',
        options: ['Que tienes un buen día', 'Que tengas un buen día', 'Tener buen día hoy', 'Espero tienes día'],
        correctIndex: 1,
        explanation: 'Wishes take the subjunctive: "Que tengas un buen día".'
      }
    ]
  },
  {
    day: 27,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Negociación y Mercados Locales',
    titleEn: 'Markets, Bargaining & Deals',
    subtitle: 'Shop at authentic flea markets, request discounts, and negotiate politely.',
    category: 'Conversation',
    cefr: 'B1',
    durationMinutes: 10,
    iconName: 'BadgePercent',
    summary: 'Visit bustling local markets (El Rastro, San Juan), ask for a deal, and suggest alternatives.',
    vocabulary: [
      {
        id: 'w4d27_1',
        es: '¿Me puede hacer una rebaja / descuento?',
        en: 'Can you give me a discount?',
        phonetic: 'meh PWEH-deh ah-SEHR OO-nah reh-BAH-hah',
        exampleEs: 'Si compro dos piezas, ¿me puede hacer un descuento?',
        exampleEn: 'If I buy two pieces, can you give me a discount?',
        tip: 'In flea markets and craft artisan stalls, friendly bargaining is part of the fun.'
      },
      {
        id: 'w4d27_2',
        es: '¿Cuál es su último precio?',
        en: 'What is your best / final price?',
        phonetic: 'kwahl ehs soo OOL-tee-moh PREH-syoh',
        exampleEs: 'Está muy bonito. ¿Cuál es su último precio?',
        exampleEn: 'It is very nice. What is your best price?',
        tip: 'Always keep a smile and be polite.'
      },
      {
        id: 'w4d27_3',
        es: '¿Qué tal si lo dejamos en veinte?',
        en: 'How about we settle on twenty?',
        phonetic: 'keh tahl see loh deh-HAH-mohs ehn VAYN-teh',
        exampleEs: 'Pide veinticinco. ¿Qué tal si lo dejamos en veinte?',
        exampleEn: 'You ask twenty-five. How about we leave it at twenty?',
        tip: '"¿Qué tal si...?" is a wonderful way to suggest compromises.'
      },
      {
        id: 'w4d27_4',
        es: '¡Trato hecho!',
        en: 'Deal! / It\'s a deal!',
        phonetic: 'TRAH-toh EH-choh',
        exampleEs: 'Veinte euros. ¡Trato hecho, amigo!',
        exampleEn: 'Twenty euros. Deal, my friend!',
        tip: 'Accompany with a firm friendly handshake.'
      }
    ],
    grammar: {
      title: 'Conditional Suggestions with "¿Qué tal si...?"',
      rule: 'Use "¿Qué tal si...?" + present tense to make polite suggestions without being pushy.',
      examples: [
        { es: '¿Qué tal si vamos a comer ahora?', en: 'How about if we go eat now?' },
        { es: '¿Qué tal si probamos otra tienda?', en: 'How about if we try another shop?' }
      ],
      proTip: 'Extremely useful in both shopping and social planning.'
    },
    dialogue: [
      {
        id: 'w4d27_dia_1',
        speaker: 'Vendedor',
        role: 'native',
        avatar: '🏺',
        textEs: 'Esta cerámica artesanal cuesta treinta euros.',
        textEn: 'This handcrafted pottery costs thirty euros.'
      },
      {
        id: 'w4d27_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Es hermosa. ¿Qué tal si me la llevo por veinticinco?',
        textEn: 'It is beautiful. How about if I take it for twenty-five?'
      },
      {
        id: 'w4d27_dia_3',
        speaker: 'Vendedor',
        role: 'native',
        avatar: '🏺',
        textEs: '¡Trato hecho! Te la envuelvo con cuidado.',
        textEn: 'Deal! I will wrap it carefully for you.'
      }
    ],
    quiz: [
      {
        id: 'w4d27_q1',
        question: 'What does "¡Trato hecho!" mean?',
        type: 'multiple-choice',
        options: ['Too expensive!', 'No way!', 'Deal! / It\'s a deal!', 'Please leave'],
        correctIndex: 2,
        explanation: '"Trato hecho" means you agreed on the deal.'
      }
    ]
  },
  {
    day: 28,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Variaciones Regionales: España vs. Latinoamérica',
    titleEn: 'Dialects: Spain & Latin America',
    subtitle: 'Appreciate the rich accents, vocabulary differences, and regional charms.',
    category: 'Culture',
    cefr: 'B1',
    durationMinutes: 12,
    iconName: 'Globe',
    summary: 'Compare words: Coche vs Carro/Auto, Móvil vs Celular, Zumo vs Jugo, Ordenador vs Computadora.',
    vocabulary: [
      {
        id: 'w4d28_1',
        es: 'Coche (España) vs. Carro / Auto (Latinoamérica)',
        en: 'Car',
        phonetic: 'KOH-cheh vs KAH-rroh / OW-toh',
        exampleEs: 'Alquilamos un coche en Madrid / Tomamos un carro en Bogotá.',
        exampleEn: 'We rented a car in Madrid / We took a car in Bogotá.',
        tip: 'Both are instantly understood by every Spanish speaker.'
      },
      {
        id: 'w4d28_2',
        es: 'Móvil (España) vs. Celular (Latinoamérica)',
        en: 'Mobile phone / Cellphone',
        phonetic: 'MOH-veel vs seh-loo-LAR',
        exampleEs: 'Se me acabó la batería del móvil / celular.',
        exampleEn: 'My phone battery died.',
        tip: 'In Spain: el móvil. In Mexico, Argentina, Colombia: el celular.'
      },
      {
        id: 'w4d28_3',
        es: 'Zumo (España) vs. Jugo (Latinoamérica)',
        en: 'Juice',
        phonetic: 'THOO-moh vs HOO-goh',
        exampleEs: 'Un zumo de naranja natural, por favor.',
        exampleEn: 'A fresh orange juice, please.',
        tip: 'In Spain you say "zumo de naranja", in Mexico "jugo de naranja".'
      },
      {
        id: 'w4d28_4',
        es: 'El "voseo" (Argentina, Uruguay, Centroamérica)',
        en: 'Using "vos" instead of "tú"',
        phonetic: 'ehl voh-SEH-oh',
        exampleEs: '¿De dónde sos vos? (Instead of ¿De dónde eres tú?)',
        exampleEn: 'Where are you from? (Rioplatense Spanish)',
        tip: 'Recognizing "vos" will make traveling in Argentina and Uruguay effortless.'
      }
    ],
    grammar: {
      title: 'Pronunciation Harmony: "Ceceo" vs "Seseo"',
      rule: 'In central and northern Spain, "Z" and soft "C" (before e/i) are pronounced like English "th" in "think" (Barcelona = Bar-the-lona). In all of Latin America and southern Spain, it is pronounced as clean "S" (Bar-se-lona).',
      examples: [
        { es: 'Gracias: Grah-thyahs (Spain) vs. Grah-syahs (Latin America).', en: 'Both are 100% correct.' }
      ],
      proTip: 'Choose whichever accent feels natural to you; both are globally celebrated.'
    },
    dialogue: [
      {
        id: 'w4d28_dia_1',
        speaker: 'Martín (Argentina)',
        role: 'native',
        avatar: '🧉',
        textEs: '¡Che! ¿Cómo andás? ¿Querés tomar un mate?',
        textEn: 'Hey! How are you doing? Do you want to drink mate?'
      },
      {
        id: 'w4d28_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Me encantaría probarlo! Me gusta mucho la cultura argentina.',
        textEn: 'I would love to try it! I really like Argentine culture.'
      }
    ],
    quiz: [
      {
        id: 'w4d28_q1',
        question: 'What is the word for "juice" in Spain vs Latin America?',
        type: 'multiple-choice',
        options: ['Zumo (Spain) / Jugo (Latin America)', 'Jugo (Spain) / Zumo (Latin America)', 'Bebida / Refresco', 'Agua / Té'],
        correctIndex: 0,
        explanation: 'Spain uses "zumo", while Latin America uses "jugo".'
      }
    ]
  },
  {
    day: 29,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Inmersión Total y Narración de Historias',
    titleEn: 'Full Immersion & Storytelling',
    subtitle: 'Tell your journey, personal anecdotes, and plans entirely in Spanish.',
    category: 'Milestone',
    cefr: 'B1',
    durationMinutes: 15,
    iconName: 'BookOpen',
    summary: 'The penultimate day: narrate a full personal story with emotion, past tenses, and conclusions.',
    vocabulary: [
      {
        id: 'w4d29_1',
        es: 'Había una vez... / Todo comenzó cuando...',
        en: 'Once upon a time... / It all started when...',
        phonetic: 'ah-BEE-ah OO-nah vehth / TOH-doh koh-mehn-ZOH KWAHN-doh',
        exampleEs: 'Todo comenzó cuando decidí aprender español hace un mes.',
        exampleEn: 'It all started when I decided to learn Spanish a month ago.',
        tip: 'Classic narrative opening.'
      },
      {
        id: 'w4d29_2',
        es: 'De repente / De pronto',
        en: 'Suddenly / All of a sudden',
        phonetic: 'deh reh-PEHN-teh / deh PROHN-toh',
        exampleEs: 'Estábamos caminando y de repente empezó a llover.',
        exampleEn: 'We were walking and suddenly it began to rain.',
        tip: 'Introduces plot twists in your story.'
      },
      {
        id: 'w4d29_3',
        es: 'Al final / Para resumir',
        en: 'In the end / To sum up',
        phonetic: 'ahl fee-NAHL / PAH-rah reh-soo-MEER',
        exampleEs: 'Al final todo salió perfecto y fue inolvidable.',
        exampleEn: 'In the end everything turned out perfect and was unforgettable.',
        tip: 'Brings your story to a satisfying resolution.'
      },
      {
        id: 'w4d29_4',
        es: 'Fue una experiencia inolvidable',
        en: 'It was an unforgettable experience',
        phonetic: 'fweh OO-nah ehks-peh-RYEHN-syah een-ohl-vee-DAH-bleh',
        exampleEs: 'Aprender este idioma ha sido una experiencia inolvidable.',
        exampleEn: 'Learning this language has been an unforgettable experience.',
        tip: '"Inolvidable" is an evocative compliment to any journey.'
      }
    ],
    grammar: {
      title: 'The 3-Act Story Arc in Spanish',
      rule: 'Act 1: Setting (Imperfect: Era un día soleado). Act 2: Inciting incident (Preterite: De repente escuché un ruido). Act 3: Reflection (Present/Future: Ahora sé que...).',
      examples: [
        { es: 'Vivía en el extranjero cuando conocí a mi mejor amigo.', en: 'I was living abroad when I met my best friend.' }
      ],
      proTip: 'You now possess all the grammatical components of a natural storyteller.'
    },
    dialogue: [
      {
        id: 'w4d29_dia_1',
        speaker: 'Sofía AI',
        role: 'native',
        avatar: '💃',
        textEs: '¡Mañana es el gran día de graduación! ¿Cómo te sientes con tu progreso?',
        textEn: 'Tomorrow is the big graduation day! How do you feel with your progress?'
      },
      {
        id: 'w4d29_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Me siento orgulloso. Hace un mes no sabía nada y hoy puedo conversar.',
        textEn: 'I feel proud. A month ago I knew nothing and today I can converse.'
      }
    ],
    quiz: [
      {
        id: 'w4d29_q1',
        question: 'Which connector means "Suddenly" to add drama to a story?',
        type: 'multiple-choice',
        options: ['De repente', 'Por lo tanto', 'Al lado de', 'Muchas gracias'],
        correctIndex: 0,
        explanation: '"De repente" introduces an unexpected sudden action.'
      }
    ]
  },
  {
    day: 30,
    week: 4,
    phaseTitle: 'Semana 4: Fluidez Real y Maestría Conversacional',
    titleEs: 'Graduación B1 y Certificado de Fluidez',
    titleEn: 'Day 30 Graduation & Fluency Certificate',
    subtitle: 'The 30-day milestone! Claim your official B1 Spanish certificate.',
    category: 'Milestone',
    cefr: 'B1',
    durationMinutes: 20,
    iconName: 'Trophy',
    summary: '¡Enhorabuena! You completed the 30-Day Spanish Intensive. Celebrate your fluency and claim your certificate.',
    vocabulary: [
      {
        id: 'w4d30_1',
        es: '¡Enhorabuena! / ¡Felicidades!',
        en: 'Congratulations! / Kudos!',
        phonetic: 'ehn-oh-rah-BWEH-nah / feh-lee-see-DAH-dehs',
        exampleEs: '¡Enhorabuena por completar tus 30 días de español!',
        exampleEn: 'Congratulations on completing your 30 days of Spanish!',
        tip: '"Enhorabuena" is widely used in Spain for congratulations.'
      },
      {
        id: 'w4d30_2',
        es: '¡Soy hispanohablante!',
        en: 'I am a Spanish speaker!',
        phonetic: 'soy ees-pah-noh-ah-BLAHN-teh',
        exampleEs: 'Con orgullo puedo decir: ¡ahora soy hispanohablante!',
        exampleEn: 'With pride I can say: now I am a Spanish speaker!',
        tip: 'Over 500 million people worldwide share this language with you.'
      },
      {
        id: 'w4d30_3',
        es: 'El viaje apenas comienza',
        en: 'The journey is just beginning',
        phonetic: 'ehl VYAH-heh ah-PEH-nahs koh-MYEHN-zah',
        exampleEs: 'Dominar un idioma es abrir una ventana al mundo.',
        exampleEn: 'Mastering a language is opening a window to the world.',
        tip: 'Continue practicing with Sofía AI, movies, music, and travel!'
      },
      {
        id: 'w4d30_4',
        es: '¡Viva el español!',
        en: 'Long live Spanish!',
        phonetic: 'VEE-vah ehl ehs-pah-NYOHL',
        exampleEs: '¡Gracias por todo, viva el español!',
        exampleEn: 'Thank you for everything, long live Spanish!',
        tip: 'Celebrate your dedication and lifelong skill.'
      }
    ],
    grammar: {
      title: 'Your 30-Day Fluency Arsenal',
      rule: 'In 30 days you mastered: 1) Essential survival greetings & food ordering, 2) Numbers, time & navigation, 3) Daily routine & reflexives, 4) Past tenses (Preterite & Imperfect), 5) Future plans, 6) Health & emergencies, 7) Connectors & idioms, and 8) Subjunctive goodwill wishes.',
      examples: [
        { es: 'Puedo viajar a cualquier país hispano con total seguridad.', en: 'I can travel to any Spanish-speaking country with complete confidence.' }
      ],
      proTip: 'Speak with confidence; native speakers value connection over grammatical perfection.'
    },
    dialogue: [
      {
        id: 'w4d30_dia_1',
        speaker: 'Sofía AI',
        role: 'native',
        avatar: '🎓',
        textEs: '¡Felicidades graduado! Has demostrado una disciplina ejemplar.',
        textEn: 'Congratulations graduate! You have demonstrated exemplary discipline.'
      },
      {
        id: 'w4d30_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Muchas gracias por acompañarme cada día en este camino!',
        textEn: 'Thank you so much for accompanying me every day on this path!'
      },
      {
        id: 'w4d30_dia_3',
        speaker: 'Sofía AI',
        role: 'native',
        avatar: '🎓',
        textEs: '¡Tu certificado de fluidez está listo! ¡Que viva tu español!',
        textEn: 'Your certificate of fluency is ready! Long live your Spanish!'
      }
    ],
    quiz: [
      {
        id: 'w4d30_q1',
        question: 'Which of the following is true after completing this 30-day curriculum?',
        type: 'multiple-choice',
        options: [
          'You know over 150 high-frequency phrases and past, present, future grammar',
          'You only learned how to say hello',
          'Spanish can only be spoken in one country',
          'You cannot order food'
        ],
        correctIndex: 0,
        explanation: 'You now command core survival, conversational, and storytelling Spanish!'
      }
    ]
  }
];
