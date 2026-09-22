import { DayLesson } from '../types';

export const week3Lessons: DayLesson[] = [
  {
    day: 15,
    week: 3,
    phaseTitle: 'Semana 3: Acción, Pasado y Comunicación Práctica',
    titleEs: 'Pasado Simple: Lo que hice ayer',
    titleEn: 'Preterite Past: What I Did Yesterday',
    subtitle: 'Unlock the power of storytelling. Talk about completed past events.',
    category: 'Grammar',
    cefr: 'A2',
    durationMinutes: 14,
    iconName: 'History',
    summary: 'Master regular and irregular preterite past verbs (fui, comí, hablé, compré).',
    vocabulary: [
      {
        id: 'w3d15_1',
        es: 'Ayer fui al centro',
        en: 'Yesterday I went downtown',
        phonetic: 'ah-YEHR FWY ahl SEHN-troh',
        exampleEs: 'Ayer fui a comprar un regalo para mi madre.',
        exampleEn: 'Yesterday I went to buy a gift for my mother.',
        tip: '"Fui" is the past tense of both "Ir" (to go) and "Ser" (to be)!'
      },
      {
        id: 'w3d15_2',
        es: 'Comí una paella riquísima',
        en: 'I ate a delicious paella',
        phonetic: 'koh-MEE OO-nah pah-EH-yah ree-KEE-see-mah',
        exampleEs: 'Almorcé con un amigo y comí una paella riquísima.',
        exampleEn: 'I had lunch with a friend and ate a delicious paella.',
        tip: 'Adding "-ísimo/a" turns an adjective into "super / extremely": rico -> riquísimo.'
      },
      {
        id: 'w3d15_3',
        es: 'El fin de semana pasado viajé a Valencia',
        en: 'Last weekend I traveled to Valencia',
        phonetic: 'ehl feen deh seh-MAH-nah pah-SAH-doh vyah-HEH ah vah-LEHN-syah',
        exampleEs: 'El año pasado viajé a México por primera vez.',
        exampleEn: 'Last year I traveled to Mexico for the first time.',
        tip: 'For regular -AR verbs in the past "yo" ends in -é: viajar -> viajé.'
      },
      {
        id: 'w3d15_4',
        es: '¿Qué hiciste anoche?',
        en: 'What did you do last night?',
        phonetic: 'keh ee-SEES-teh ah-NOH-cheh',
        exampleEs: '¿Qué hiciste anoche? — Me quedé en casa descansando.',
        exampleEn: 'What did you do last night? — I stayed home resting.',
        tip: '"Anoche" means last night.'
      }
    ],
    grammar: {
      title: 'The Preterite (Completed Past Actions)',
      rule: 'Use the preterite for single actions completed at a specific point in the past. Regular endings: -AR (yo hablé, tú hablaste), -ER/-IR (yo comí, tú comiste).',
      examples: [
        { es: 'Hablé con María ayer.', en: 'I spoke with María yesterday.' },
        { es: 'Ayer viví una aventura.', en: 'Yesterday I experienced an adventure.' }
      ],
      proTip: 'Look for trigger words: ayer (yesterday), anoche (last night), la semana pasada (last week).'
    },
    dialogue: [
      {
        id: 'w3d15_dia_1',
        speaker: 'Carlos',
        role: 'native',
        avatar: '🏄',
        textEs: '¡Hola! ¿Qué tal tu fin de semana? ¿Qué hiciste?',
        textEn: 'Hello! How was your weekend? What did you do?'
      },
      {
        id: 'w3d15_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Fue genial! Fui a la playa y descansé mucho.',
        textEn: 'It was great! I went to the beach and rested a lot.'
      }
    ],
    quiz: [
      {
        id: 'w3d15_q1',
        question: 'Which word means "last night" in Spanish?',
        type: 'multiple-choice',
        options: ['Ayer', 'Anoche', 'Mañana', 'La noche'],
        correctIndex: 1,
        explanation: '"Anoche" is the single Spanish word for last night.'
      }
    ]
  },
  {
    day: 16,
    week: 3,
    phaseTitle: 'Semana 3: Acción, Pasado y Comunicación Práctica',
    titleEs: 'Pasado Descriptivo: Cuando era niño',
    titleEn: 'Imperfect Past: Habits & Memories',
    subtitle: 'Describe how things used to be, childhood memories, and ongoing scenes.',
    category: 'Grammar',
    cefr: 'A2',
    durationMinutes: 12,
    iconName: 'Compass',
    summary: 'Learn the Imperfect tense (era, vivía, jugaba, solía) to describe the background.',
    vocabulary: [
      {
        id: 'w3d16_1',
        es: 'Cuando era niño / pequeña',
        en: 'When I was a kid / young',
        phonetic: 'KWAHN-doh EH-rah NEE-nyoh / peh-KEH-nyah',
        exampleEs: 'Cuando era niño, jugaba al fútbol todos los días.',
        exampleEn: 'When I was a kid, I used to play soccer every day.',
        tip: '"Era" is the imperfect form of Ser.'
      },
      {
        id: 'w3d16_2',
        es: 'Solía vivir en un pueblo pequeño',
        en: 'I used to live in a small town',
        phonetic: 'soh-LEE-ah vee-VEER ehn oon PWEH-bloh peh-KEH-nyoh',
        exampleEs: 'Solía leer muchos cómics de pequeño.',
        exampleEn: 'I used to read a lot of comics when I was young.',
        tip: '"Soler + infinitive" means to usually do or used to do something.'
      },
      {
        id: 'w3d16_3',
        es: 'Antes siempre teníamos tiempo',
        en: 'Before, we always had time',
        phonetic: 'AHN-tehs SYEHM-preh teh-NEE-ah-mohs TYEHM-poh',
        exampleEs: 'Antes las cosas eran más sencillas.',
        exampleEn: 'Things used to be simpler in the past.',
        tip: '"Antes" = before / formerly.'
      },
      {
        id: 'w3d16_4',
        es: 'Hacía mucho sol esa tarde',
        en: 'It was very sunny that afternoon',
        phonetic: 'ah-SEE-ah MOO-choh sohl EH-sah TAR-deh',
        exampleEs: 'Hacía buen tiempo cuando salimos a caminar.',
        exampleEn: 'The weather was nice when we went out walking.',
        tip: 'Use imperfect to paint the background scenery of past stories.'
      }
    ],
    grammar: {
      title: 'Preterite vs. Imperfect (The Classic Duo)',
      rule: 'Preterite tells WHAT happened (action). Imperfect sets the STAGE (time, weather, age, feelings, continuous habits).',
      examples: [
        { es: 'Hacía frío (stage), pero salí a correr (action).', en: 'It was cold, but I went out to run.' },
        { es: 'Cuando tenía diez años, vivía en Madrid.', en: 'When I was ten years old, I lived in Madrid.' }
      ],
      proTip: 'Think of Imperfect as a movie playing, and Preterite as a photo snapshot.'
    },
    dialogue: [
      {
        id: 'w3d16_dia_1',
        speaker: 'Abuela',
        role: 'native',
        avatar: '👵',
        textEs: '¿Dónde vivías cuando eras pequeño?',
        textEn: 'Where did you live when you were little?'
      },
      {
        id: 'w3d16_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Vivía en una casa cerca de las montañas.',
        textEn: 'I lived in a house near the mountains.'
      }
    ],
    quiz: [
      {
        id: 'w3d16_q1',
        question: 'Which tense describes ongoing childhood habits ("I used to play")?',
        type: 'multiple-choice',
        options: ['Pretérito imperfecto (jugaba)', 'Pretérito indefinido (jugué)', 'Futuro (jugaré)', 'Presente (juego)'],
        correctIndex: 0,
        explanation: 'Imperfect is used for repeated past habits and background states.'
      }
    ]
  },
  {
    day: 17,
    week: 3,
    phaseTitle: 'Semana 3: Acción, Pasado y Comunicación Práctica',
    titleEs: 'Planes Futuros e Intenciones',
    titleEn: 'Future Plans & Near Future',
    subtitle: 'Talk about tomorrow, next week, dreams, and upcoming trips.',
    category: 'Conversation',
    cefr: 'A2',
    durationMinutes: 10,
    iconName: 'Calendar',
    summary: 'Use the effortless "Ir a + Infinitivo" formula to express future actions like a pro.',
    vocabulary: [
      {
        id: 'w3d17_1',
        es: 'Voy a viajar a Colombia el próximo mes',
        en: 'I am going to travel to Colombia next month',
        phonetic: 'voy ah vyah-HAR ah koh-LOHM-byah ehl PROHK-see-moh mehs',
        exampleEs: 'El próximo año voy a visitar Buenos Aires.',
        exampleEn: 'Next year I am going to visit Buenos Aires.',
        tip: 'Formula: Voy a + verb. 100% understood everywhere in the Spanish world.'
      },
      {
        id: 'w3d17_2',
        es: '¿Qué vas a hacer este fin de semana?',
        en: 'What are you going to do this weekend?',
        phonetic: 'keh vahs ah ah-SEHR EHS-teh feen deh seh-MAH-nah',
        exampleEs: '¿Qué vas a hacer mañana por la tarde?',
        exampleEn: 'What are you going to do tomorrow afternoon?',
        tip: 'The #1 most common Friday question among Spanish speakers.'
      },
      {
        id: 'w3d17_3',
        es: 'Tengo ganas de probar comida típica',
        en: 'I feel like / look forward to trying local food',
        phonetic: 'TEHN-goh GAH-nahs deh proh-BAR koh-MEE-dah TEE-pee-kah',
        exampleEs: 'Tengo muchas ganas de verte de nuevo.',
        exampleEn: 'I really look forward to seeing you again.',
        tip: '"Tener ganas de" expresses strong desire or eagerness.'
      },
      {
        id: 'w3d17_4',
        es: 'Espero aprender a bailar salsa',
        en: 'I hope / expect to learn to dance salsa',
        phonetic: 'ehs-PEH-roh ah-prehn-DEHR ah bye-LAR SAHL-sah',
        exampleEs: 'Espero conseguir el nuevo trabajo pronto.',
        exampleEn: 'I hope to get the new job soon.',
        tip: '"Esperar" means both to hope and to wait.'
      }
    ],
    grammar: {
      title: 'The "Ir a + Infinitive" Magic Hack',
      rule: 'You do not need to memorize complex future conjugations right away. Just conjugate "Ir" in the present + "a" + infinitive verb: Voy a comer, Vas a viajar, Va a llover.',
      examples: [
        { es: 'Mañana voy a estudiar español.', en: 'Tomorrow I am going to study Spanish.' },
        { es: 'Vamos a cenar juntos.', en: 'We are going to have dinner together.' }
      ],
      proTip: 'Native speakers use this form in spoken conversation more than 80% of the time.'
    },
    dialogue: [
      {
        id: 'w3d17_dia_1',
        speaker: 'Marta',
        role: 'native',
        avatar: '✈️',
        textEs: '¿Cuáles son tus planes para las vacaciones?',
        textEn: 'What are your plans for the holidays?'
      },
      {
        id: 'w3d17_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Voy a viajar a Costa Rica y explorar la selva.',
        textEn: 'I am going to travel to Costa Rica and explore the rainforest.'
      }
    ],
    quiz: [
      {
        id: 'w3d17_q1',
        question: 'How do you say "We are going to eat"?',
        type: 'multiple-choice',
        options: ['Vamos a comer', 'Van a comer', 'Voy a comer', 'Vamos comer'],
        correctIndex: 0,
        explanation: '"Nosotros vamos a comer" = We are going to eat.'
      }
    ]
  },
  {
    day: 18,
    week: 3,
    phaseTitle: 'Semana 3: Acción, Pasado y Comunicación Práctica',
    titleEs: 'En el Médico, Farmacia y Salud',
    titleEn: 'Health, Pharmacy & Medical Help',
    subtitle: 'Explain body aches, symptoms, and buy medicine at the pharmacy.',
    category: 'Survival',
    cefr: 'A2',
    durationMinutes: 12,
    iconName: 'HeartPulse',
    summary: 'Learn key body parts, how to say where it hurts (Me duele), and pharmacy needs.',
    vocabulary: [
      {
        id: 'w3d18_1',
        es: 'Me duele la cabeza / el estómago',
        en: 'My head hurts / My stomach hurts',
        phonetic: 'meh DWEH-leh lah kah-BEH-sah / ehl ehs-TOH-mah-goh',
        exampleEs: 'Tengo fiebre y me duele mucho la garganta.',
        exampleEn: 'I have a fever and my throat hurts a lot.',
        tip: '"Doler" works just like "gustar": Me duele (singular) / Me duelen los ojos (plural).'
      },
      {
        id: 'w3d18_2',
        es: '¿Tiene algo para el dolor de garganta?',
        en: 'Do you have something for a sore throat?',
        phonetic: 'TYEH-neh AHL-goh PAH-rah ehl doh-LOR deh gar-GAHN-tah',
        exampleEs: 'Buenos días, ¿tiene algo para el resfriado?',
        exampleEn: 'Good morning, do you have something for a cold?',
        tip: 'Pharmacists in Hispanic countries are highly knowledgeable and can advise you.'
      },
      {
        id: 'w3d18_3',
        es: 'Pastillas, jarabe, receta médica',
        en: 'Pills, syrup, medical prescription',
        phonetic: 'pahs-TEE-yahs, hah-RAH-beh, reh-SEH-tah MEH-dee-kah',
        exampleEs: 'Tome estas pastillas dos veces al día con agua.',
        exampleEn: 'Take these pills twice a day with water.',
        tip: '"Receta" means both medical prescription and cooking recipe!'
      },
      {
        id: 'w3d18_4',
        es: 'Soy alérgico a la penicilina',
        en: 'I am allergic to penicillin',
        phonetic: 'soy ah-LEHR-hee-koh ah lah peh-nee-see-LEE-nah',
        exampleEs: 'Por favor revise, soy alérgico a los mariscos.',
        exampleEn: 'Please check, I am allergic to shellfish.',
        tip: 'Critical medical phrase to memorize.'
      }
    ],
    grammar: {
      title: 'Expressing Pain with "Doler"',
      rule: 'Like "gustar", the body part is the grammatical subject. Singular: Me duele el brazo. Plural: Me duelen los pies.',
      examples: [
        { es: 'Me duele la espalda.', en: 'My back hurts.' },
        { es: 'Me duelen las piernas de caminar.', en: 'My legs hurt from walking.' }
      ],
      proTip: 'Do NOT say "Mi cabeza duele". Always use "Me duele la cabeza".'
    },
    dialogue: [
      {
        id: 'w3d18_dia_1',
        speaker: 'Farmacéutico',
        role: 'native',
        avatar: '👨‍⚕️',
        textEs: 'Hola, ¿en qué te puedo ayudar hoy?',
        textEn: 'Hello, how can I help you today?'
      },
      {
        id: 'w3d18_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Me duele la cabeza y tengo un poco de fiebre.',
        textEn: 'My head hurts and I have a slight fever.'
      }
    ],
    quiz: [
      {
        id: 'w3d18_q1',
        question: 'Which is correct for "My feet hurt"?',
        type: 'multiple-choice',
        options: ['Me duele los pies', 'Me duelen los pies', 'Mis pies duelen', 'Tengo dolor pies'],
        correctIndex: 1,
        explanation: 'Because "los pies" is plural, Spanish uses "Me duelen los pies".'
      }
    ]
  },
  {
    day: 19,
    week: 3,
    phaseTitle: 'Semana 3: Acción, Pasado y Comunicación Práctica',
    titleEs: 'Opiniones y Sentimientos',
    titleEn: 'Opinions, Feelings & Reactions',
    subtitle: 'Express what you think, agree, disagree, and react to news.',
    category: 'Conversation',
    cefr: 'B1',
    durationMinutes: 12,
    iconName: 'MessageSquare',
    summary: 'Share thoughts using "Creo que...", "En mi opinión...", and conversational reactions.',
    vocabulary: [
      {
        id: 'w3d19_1',
        es: 'Creo que... / Pienso que...',
        en: 'I believe that... / I think that...',
        phonetic: 'KREH-oh keh / PYEHN-soh keh',
        exampleEs: 'Creo que aprender español es una gran decisión.',
        exampleEn: 'I believe that learning Spanish is a great decision.',
        tip: 'Both can be used interchangeably for sharing thoughts.'
      },
      {
        id: 'w3d19_2',
        es: 'Estoy totalmente de acuerdo',
        en: 'I completely agree',
        phonetic: 'ehs-TOY toh-tahl-MEHN-teh deh ah-KWEHR-doh',
        exampleEs: 'Tienes razón, estoy de acuerdo contigo.',
        exampleEn: 'You are right, I agree with you.',
        tip: 'To disagree politely: "No estoy tan seguro" (I am not so sure).'
      },
      {
        id: 'w3d19_3',
        es: '¡Qué buena noticia! / ¡Qué lástima!',
        en: 'What great news! / What a shame/pity!',
        phonetic: 'keh BWEH-nah noh-TEE-syah / keh LAHS-tee-mah',
        exampleEs: '¿Ganaste el premio? ¡Qué increíble noticia!',
        exampleEn: 'You won the prize? What incredible news!',
        tip: 'Formula: "¡Qué + adjective/noun!" for instant reactions (¡Qué bien!, ¡Qué rico!).'
      },
      {
        id: 'w3d19_4',
        es: 'Me parece interesante',
        en: 'It seems interesting to me',
        phonetic: 'meh pah-REH-seh een-teh-reh-SAHN-teh',
        exampleEs: 'Me parece una idea estupenda.',
        exampleEn: 'It seems like a wonderful idea to me.',
        tip: '"Parecer" functions like gustar to give impressions.'
      }
    ],
    grammar: {
      title: 'Giving Reactions with "¡Qué + Word!"',
      rule: 'To react like a native speaker, use "¡Qué...!" + noun or adjective. It corresponds to "How...!" or "What a...!" in English.',
      examples: [
        { es: '¡Qué calor!', en: 'What heat! / It\'s so hot!' },
        { es: '¡Qué sorpresa verte aquí!', en: 'What a surprise to see you here!' }
      ],
      proTip: '¡Qué bonito! (How pretty!), ¡Qué bien! (How wonderful!), ¡Qué pena! (What a pity!).'
    },
    dialogue: [
      {
        id: 'w3d19_dia_1',
        speaker: 'Gabriel',
        role: 'native',
        avatar: '🎭',
        textEs: '¿Qué te parece la película que vimos?',
        textEn: 'What do you think of the movie we watched?'
      },
      {
        id: 'w3d19_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Creo que fue muy emocionante. Me encantó el final.',
        textEn: 'I think it was very exciting. I loved the ending.'
      }
    ],
    quiz: [
      {
        id: 'w3d19_q1',
        question: 'How do you say "I agree with you"?',
        type: 'multiple-choice',
        options: ['Estoy de acuerdo contigo', 'Tengo acuerdo para ti', 'Soy de acuerdo contigo', 'Pienso con tu cabeza'],
        correctIndex: 0,
        explanation: '"Estar de acuerdo con alguien" means to agree with someone.'
      }
    ]
  },
  {
    day: 20,
    week: 3,
    phaseTitle: 'Semana 3: Acción, Pasado y Comunicación Práctica',
    titleEs: 'Cultura, Fiestas y Modismos Hispanos',
    titleEn: 'Culture, Slang & Social Etiquette',
    subtitle: 'Understand tapas culture, two kisses greeting, and regional slang.',
    category: 'Culture',
    cefr: 'B1',
    durationMinutes: 12,
    iconName: 'Flame',
    summary: 'Learn about the social fabric: tapas, el aperitivo, two cheek kisses, and slang.',
    vocabulary: [
      {
        id: 'w3d20_1',
        es: 'Dos besos en las mejillas',
        en: 'Two kisses on the cheeks (greeting)',
        phonetic: 'dohs BEH-sohs ehn lahs meh-HEE-yahs',
        exampleEs: 'En España se saludan con dos besos en la mejilla.',
        exampleEn: 'In Spain people greet with two kisses on the cheek.',
        tip: 'Start right side first! In Latin America, usually one kiss on the right cheek.'
      },
      {
        id: 'w3d20_2',
        es: 'Ir de tapas / El tapeo',
        en: 'Going out for tapas (bar hopping)',
        phonetic: 'eer deh TAH-pahs / ehl tah-PEH-oh',
        exampleEs: 'Los viernes salimos de tapas con los compañeros.',
        exampleEn: 'On Fridays we go out for tapas with coworkers.',
        tip: 'Tapas isn\'t just food; it\'s a social tradition of hopping from bar to bar.'
      },
      {
        id: 'w3d20_3',
        es: '¡Qué guay! / ¡Qué chévere! / ¡Qué padre!',
        en: 'How cool! (Spain / Colombia / Mexico)',
        phonetic: 'keh gwy / keh CHEH-veh-reh / keh PAH-dreh',
        exampleEs: '¿Vas a viajar a Madrid? ¡Qué guay!',
        exampleEn: 'You are traveling to Madrid? How cool!',
        tip: 'Guay = Spain, Chévere = Caribbean/Andean, Padre/Chido = Mexico, Bacán = Chile/Peru.'
      },
      {
        id: 'w3d20_4',
        es: 'La sobremesa',
        en: 'Lingering at the table after a meal talking',
        phonetic: 'lah soh-breh-MEH-sah',
        exampleEs: 'Disfrutamos de una larga sobremesa con café y risas.',
        exampleEn: 'We enjoyed a long post-meal conversation with coffee and laughter.',
        tip: 'Untranslatable cultural word! Rushing away right after eating is considered bad manners.'
      }
    ],
    grammar: {
      title: 'Cultural Fluency: Tú vs. Usted vs. Vosotros',
      rule: 'In Spain, "vosotros" is used for informal plural "you all". In Latin America, "ustedes" is used for BOTH informal and formal plural. Use "Usted" for elders or formal service.',
      examples: [
        { es: '¿Queréis salir? (Spain informal plural)', en: 'Do you guys want to go out?' },
        { es: '¿Ustedes quieren salir? (Latin America plural)', en: 'Do you all want to go out?' }
      ],
      proTip: 'Both forms will be understood anywhere!'
    },
    dialogue: [
      {
        id: 'w3d20_dia_1',
        speaker: 'Alejandro',
        role: 'native',
        avatar: '🍷',
        textEs: '¿Vamos de tapas esta noche por el barrio de La Latina?',
        textEn: 'Shall we go for tapas tonight around La Latina neighborhood?'
      },
      {
        id: 'w3d20_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Me parece un planazo! Me encanta probar tapas.',
        textEn: 'That sounds like an amazing plan! I love trying tapas.'
      }
    ],
    quiz: [
      {
        id: 'w3d20_q1',
        question: 'What is "la sobremesa"?',
        type: 'multiple-choice',
        options: [
          'A dessert menu',
          'The conversation at the table after eating a meal',
          'Paying the restaurant check quickly',
          'A table reservation'
        ],
        correctIndex: 1,
        explanation: '"Sobremesa" is the cherished tradition of chatting around the table after finishing food.'
      }
    ]
  },
  {
    day: 21,
    week: 3,
    phaseTitle: 'Semana 3: Acción, Pasado y Comunicación Práctica',
    titleEs: 'Repaso y Desafío Semanal 3',
    titleEn: 'Week 3 Simulation & B1 Readiness',
    subtitle: 'Three weeks conquered! Test your spontaneous conversational agility.',
    category: 'Milestone',
    cefr: 'B1',
    durationMinutes: 15,
    iconName: 'TrendingUp',
    summary: 'Enter the final stretch. You can now narrate past stories, express opinions, and handle emergencies.',
    vocabulary: [
      {
        id: 'w3d21_1',
        es: '¡Tres semanas completadas!',
        en: 'Three weeks completed!',
        phonetic: 'trehs seh-MAH-nahs kohm-pleh-TAH-dahs',
        exampleEs: '¡Solo falta una semana para los 30 días!',
        exampleEn: 'Only one week left for the 30 days!',
        tip: '90% of language learners quit before week 3. You are in the top tier!'
      },
      {
        id: 'w3d21_2',
        es: 'Puedo pensar en español',
        en: 'I can think in Spanish',
        phonetic: 'PWEH-doh pehn-SAR ehn ehs-pah-NYOHL',
        exampleEs: 'Noto que ya no traduzco cada palabra en mi cabeza.',
        exampleEn: 'I notice I no longer translate every word in my head.',
        tip: 'The tipping point into real conversational fluency.'
      }
    ],
    grammar: {
      title: 'Week 3 Master Formula: Past + Present + Future in One Flow',
      rule: 'Challenge yourself to connect the three time dimensions: "Ayer hice X, hoy estoy haciendo Y, y mañana voy a hacer Z".',
      examples: [
        { es: 'Ayer aprendí el pasado, hoy practico con Sofía, y mañana voy a hablar con nativos.', en: 'Yesterday I learned the past, today I practice with Sofía, and tomorrow I will speak with natives.' }
      ],
      proTip: 'Practice telling your day in 3 steps: past, present, and tomorrow.'
    },
    dialogue: [
      {
        id: 'w3d21_dia_1',
        speaker: 'Sofía AI',
        role: 'native',
        avatar: '💃',
        textEs: '¡Has superado el 70% del curso! ¿Sientes el cambio al hablar?',
        textEn: 'You have passed 70% of the course! Do you feel the change when speaking?'
      },
      {
        id: 'w3d21_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Sí! Ya puedo contar lo que hice ayer y lo que haré mañana.',
        textEn: 'Yes! I can already recount what I did yesterday and what I will do tomorrow.'
      }
    ],
    quiz: [
      {
        id: 'w3d21_q1',
        question: 'Which sentence connects past, present, and future correctly?',
        type: 'multiple-choice',
        options: [
          'Ayer fui al cine, hoy estudio, y mañana voy a descansar.',
          'Ayer voy al cine, hoy fui, mañana estaba.',
          'Ayer descansando, hoy descasé, mañana descanso.',
          'Ayer era hoy fue mañana ser.'
        ],
        correctIndex: 0,
        explanation: 'Fui (past), estudio (present), voy a descansar (future).'
      }
    ]
  }
];
