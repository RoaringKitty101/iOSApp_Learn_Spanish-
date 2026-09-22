import { DayLesson } from '../types';

export const week1Lessons: DayLesson[] = [
  {
    day: 1,
    week: 1,
    phaseTitle: 'Semana 1: Supervivencia Esencial',
    titleEs: 'Saludos y Presentaciones',
    titleEn: 'Greetings & Introductions',
    subtitle: 'Master first impressions and fundamental courtesy in Spanish.',
    category: 'Survival',
    cefr: 'A1',
    durationMinutes: 10,
    iconName: 'HandMetal',
    summary: 'Learn how to greet someone, introduce yourself, and ask how someone is doing.',
    vocabulary: [
      {
        id: 'w1d1_1',
        es: '¡Hola! ¿Cómo estás?',
        en: 'Hello! How are you?',
        phonetic: 'OH-lah, KOH-moh ehs-TAHS',
        exampleEs: '¡Hola! ¿Cómo estás? — Muy bien, gracias.',
        exampleEn: 'Hello! How are you? — Very well, thank you.',
        tip: 'Use with friends or casual situations. For formal, use "¿Cómo está usted?".'
      },
      {
        id: 'w1d1_2',
        es: 'Me llamo...',
        en: 'My name is... (I call myself)',
        phonetic: 'meh YAH-moh',
        exampleEs: 'Me llamo Carlos y soy de Madrid.',
        exampleEn: 'My name is Carlos and I am from Madrid.',
        tip: 'Literally means "I call myself". You can also say "Soy..." (I am...).'
      },
      {
        id: 'w1d1_3',
        es: 'Mucho gusto',
        en: 'Nice to meet you',
        phonetic: 'MOO-choh GOOS-toh',
        exampleEs: 'Mucho gusto en conocerte.',
        exampleEn: 'Nice to meet you.',
        tip: 'You can respond with "El gusto es mío" (The pleasure is mine).'
      },
      {
        id: 'w1d1_4',
        es: 'Por favor y Gracias',
        en: 'Please and Thank you',
        phonetic: 'pohr fah-VOR ee GRAH-syahs',
        exampleEs: 'Un café, por favor. — Muchas gracias.',
        exampleEn: 'A coffee, please. — Thank you very much.',
        tip: 'The two magic words that open every door in Spanish-speaking countries.'
      },
      {
        id: 'w1d1_5',
        es: '¿De dónde eres?',
        en: 'Where are you from?',
        phonetic: 'deh DOHN-deh EH-rehs',
        exampleEs: '¿De dónde eres? — Soy de Estados Unidos.',
        exampleEn: 'Where are you from? — I am from the United States.',
        tip: 'Answer with: "Soy de..." followed by your country or city.'
      }
    ],
    grammar: {
      title: 'Ser vs. Estar (Introduction)',
      rule: 'Both mean "to be", but "Ser" is for permanent identity or origin (Soy de México), while "Estar" is for temporary states or locations (Estoy bien).',
      examples: [
        { es: 'Soy estudiante.', en: 'I am a student (identity -> Ser).' },
        { es: 'Estoy contento hoy.', en: 'I am happy today (temporary state -> Estar).' }
      ],
      proTip: 'Remember: PLACE (Position, Location, Action, Condition, Emotion) uses Estar.'
    },
    dialogue: [
      {
        id: 'w1d1_dia_1',
        speaker: 'Mateo',
        role: 'native',
        avatar: '👨‍💼',
        textEs: '¡Hola! Buenos días. ¿Cómo te llamas?',
        textEn: 'Hello! Good morning. What is your name?'
      },
      {
        id: 'w1d1_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Hola! Me llamo Alex. ¿Y tú?',
        textEn: 'Hello! My name is Alex. And you?'
      },
      {
        id: 'w1d1_dia_3',
        speaker: 'Mateo',
        role: 'native',
        avatar: '👨‍💼',
        textEs: 'Mucho gusto, Alex. Yo soy Mateo, de Barcelona.',
        textEn: 'Nice to meet you, Alex. I am Mateo, from Barcelona.'
      }
    ],
    quiz: [
      {
        id: 'w1d1_q1',
        question: 'How do you say "Nice to meet you" in Spanish?',
        type: 'multiple-choice',
        options: ['Por favor', 'Mucho gusto', 'Hasta luego', 'Buenos días'],
        correctIndex: 1,
        explanation: '"Mucho gusto" is the most common way to say nice to meet you.'
      },
      {
        id: 'w1d1_q2',
        question: 'Which phrase answers "¿De dónde eres?"',
        type: 'multiple-choice',
        options: ['Estoy cansado', 'Soy de Colombia', 'Tengo 25 años', 'Me gusta el café'],
        correctIndex: 1,
        explanation: '"Soy de..." is used to state your origin or country.'
      }
    ]
  },
  {
    day: 2,
    week: 1,
    phaseTitle: 'Semana 1: Supervivencia Esencial',
    titleEs: 'Números, Horas y Días',
    titleEn: 'Numbers, Time & Schedules',
    subtitle: 'Master numbers 1-100, tell time, and schedule meetings.',
    category: 'Survival',
    cefr: 'A1',
    durationMinutes: 12,
    iconName: 'Clock',
    summary: 'Count money, ask what time it is, and name the days of the week.',
    vocabulary: [
      {
        id: 'w1d2_1',
        es: '¿Qué hora es?',
        en: 'What time is it?',
        phonetic: 'keh OH-rah ehs',
        exampleEs: 'Disculpe, ¿qué hora es? — Son las tres y media.',
        exampleEn: 'Excuse me, what time is it? — It is half past three.',
        tip: 'For 1:00 use "Es la una". For all other hours, use "Son las..."'
      },
      {
        id: 'w1d2_2',
        es: 'Uno, dos, tres, cuatro, cinco',
        en: 'One, two, three, four, five (1-5)',
        phonetic: 'OO-noh, dohs, trehs, KWAH-troh, SEEN-koh',
        exampleEs: 'Quiero dos boletos, por favor.',
        exampleEn: 'I want two tickets, please.',
        tip: 'Pronounce "cinco" as "SEEN-koh" in Latin America or "THEEN-koh" in Spain.'
      },
      {
        id: 'w1d2_3',
        es: 'Diez, veinte, cincuenta, cien',
        en: 'Ten, twenty, fifty, one hundred (10, 20, 50, 100)',
        phonetic: 'dyehth, VAYN-teh, seen-KWEHN-tah, syehn',
        exampleEs: 'Cuesta cincuenta euros.',
        exampleEn: 'It costs fifty euros.',
        tip: 'Essential for checking bills, shopping, and paying taxis.'
      },
      {
        id: 'w1d2_4',
        es: 'Hoy, Mañana, Ayer',
        en: 'Today, Tomorrow, Yesterday',
        phonetic: 'oy, mah-NYAH-nah, ah-YEHR',
        exampleEs: 'Hoy es lunes, mañana es martes.',
        exampleEn: 'Today is Monday, tomorrow is Tuesday.',
        tip: 'Days of the week in Spanish are not capitalized (lunes, martes, etc.).'
      },
      {
        id: 'w1d2_5',
        es: 'A las ocho de la mañana',
        en: 'At eight in the morning',
        phonetic: 'ah lahs OH-choh deh lah mah-NYAH-nah',
        exampleEs: 'El tren sale a las ocho.',
        exampleEn: 'The train departs at eight.',
        tip: 'Use "a las..." when saying at what time an event occurs.'
      }
    ],
    grammar: {
      title: 'Telling Time with Es la vs Son las',
      rule: 'Use "Es la una" only for one o\'clock (singular). For all other numbers (2 through 12), use "Son las dos", "Son las tres", etc. (plural).',
      examples: [
        { es: 'Es la una y cuarto.', en: 'It is 1:15.' },
        { es: 'Son las siete y media.', en: 'It is 7:30.' }
      ],
      proTip: 'Add "de la mañana" (AM), "de la tarde" (afternoon), or "de la noche" (night).'
    },
    dialogue: [
      {
        id: 'w1d2_dia_1',
        speaker: 'Elena',
        role: 'native',
        avatar: '👩',
        textEs: 'Perdón, ¿a qué hora abre el museo?',
        textEn: 'Excuse me, what time does the museum open?'
      },
      {
        id: 'w1d2_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Abre a las diez de la mañana.',
        textEn: 'It opens at ten in the morning.'
      }
    ],
    quiz: [
      {
        id: 'w1d2_q1',
        question: 'Which is correct for 1:30 PM?',
        type: 'multiple-choice',
        options: ['Son la una y media', 'Es la una y media', 'Son las dos y media', 'Es las una'],
        correctIndex: 1,
        explanation: 'Because 1 is singular, Spanish uses "Es la una y media".'
      }
    ]
  },
  {
    day: 3,
    week: 1,
    phaseTitle: 'Semana 1: Supervivencia Esencial',
    titleEs: 'En el Restaurante y Comida',
    titleEn: 'Ordering Food & Tapas',
    subtitle: 'Order like a local, request the bill, and express dietary needs.',
    category: 'Survival',
    cefr: 'A1',
    durationMinutes: 12,
    iconName: 'Utensils',
    summary: 'Navigate menus, ask for the check, and enjoy Hispanic culinary culture.',
    vocabulary: [
      {
        id: 'w1d3_1',
        es: 'La cuenta, por favor',
        en: 'The bill / check, please',
        phonetic: 'lah KWEHN-tah, pohr fah-VOR',
        exampleEs: 'Camarero, ¿nos trae la cuenta, por favor?',
        exampleEn: 'Waiter, could you bring us the check, please?',
        tip: 'In Spain and Latin America, waiters usually won\'t bring the bill until you ask for it.'
      },
      {
        id: 'w1d3_2',
        es: 'Quisiera pedir...',
        en: 'I would like to order...',
        phonetic: 'kee-SYEH-rah peh-DEER',
        exampleEs: 'Quisiera pedir la paella de mariscos.',
        exampleEn: 'I would like to order the seafood paella.',
        tip: 'Very polite. You can also say: "Para mí..." (For me...).'
      },
      {
        id: 'w1d3_3',
        es: 'Agua sin gas / con gas',
        en: 'Still water / Sparkling water',
        phonetic: 'AH-gwah seen gahs / kohn gahs',
        exampleEs: 'Una botella de agua sin gas, por favor.',
        exampleEn: 'A bottle of still water, please.',
        tip: 'In Spanish restaurants, water is almost always specified with or without gas.'
      },
      {
        id: 'w1d3_4',
        es: '¡Está delicioso!',
        en: 'It is delicious!',
        phonetic: 'ehs-TAH deh-lee-SYOH-soh',
        exampleEs: '¡Muchas gracias! Todo estuvo delicioso.',
        exampleEn: 'Thank you very much! Everything was delicious.',
        tip: 'Notice "está" is used because taste is an ongoing sensory experience.'
      },
      {
        id: 'w1d3_5',
        es: '¿Tiene opciones vegetarianas?',
        en: 'Do you have vegetarian options?',
        phonetic: 'TYEH-neh ohp-SYOH-nehs veh-heh-tah-RYAH-nahs',
        exampleEs: 'Soy vegetariano, ¿qué me recomienda?',
        exampleEn: 'I am vegetarian, what do you recommend?',
        tip: 'For gluten-free, say "sin gluten".'
      }
    ],
    grammar: {
      title: 'Polite Requests with "Quisiera" & "Me gustaría"',
      rule: 'Instead of demanding "Quiero..." (I want), soften your requests like a native with "Quisiera" or "Me gustaría" + infinitive verb.',
      examples: [
        { es: 'Quisiera una mesa para dos.', en: 'I would like a table for two.' },
        { es: 'Me gustaría probar el vino tinto.', en: 'I would like to taste the red wine.' }
      ],
      proTip: '"¿Me puede traer...?" (Can you bring me...?) is also extremely polite.'
    },
    dialogue: [
      {
        id: 'w1d3_dia_1',
        speaker: 'Camarero',
        role: 'native',
        avatar: '👨‍🍳',
        textEs: 'Buenas tardes. ¿Qué les gustaría tomar?',
        textEn: 'Good afternoon. What would you like to drink?'
      },
      {
        id: 'w1d3_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Para mí, un agua sin gas y una tapa de jamón.',
        textEn: 'For me, still water and a ham tapa.'
      },
      {
        id: 'w1d3_dia_3',
        speaker: 'Camarero',
        role: 'native',
        avatar: '👨‍🍳',
        textEs: '¡Enseguida se lo traigo!',
        textEn: 'Right away!'
      }
    ],
    quiz: [
      {
        id: 'w1d3_q1',
        question: 'How do you ask for the check politely?',
        type: 'multiple-choice',
        options: ['¡Dame el dinero!', 'La cuenta, por favor', '¿Cuánto tiempo?', 'Quiero comida'],
        correctIndex: 1,
        explanation: '"La cuenta, por favor" is the standard, polite way to ask for the bill.'
      }
    ]
  },
  {
    day: 4,
    week: 1,
    phaseTitle: 'Semana 1: Supervivencia Esencial',
    titleEs: 'Direcciones y Transporte',
    titleEn: 'Getting Around & Transit',
    subtitle: 'Ask for directions, navigate metros, and find your destination.',
    category: 'Survival',
    cefr: 'A1',
    durationMinutes: 10,
    iconName: 'MapPin',
    summary: 'Never get lost again. Learn left, right, straight ahead, and key transit terms.',
    vocabulary: [
      {
        id: 'w1d4_1',
        es: '¿Dónde está la estación de metro?',
        en: 'Where is the subway station?',
        phonetic: 'DOHN-deh ehs-TAH lah ehs-tah-SYOHN deh MEH-troh',
        exampleEs: 'Disculpe, ¿dónde está la estación más cercana?',
        exampleEn: 'Excuse me, where is the nearest station?',
        tip: 'Structure: "¿Dónde está...?" + location.'
      },
      {
        id: 'w1d4_2',
        es: 'A la derecha / A la izquierda',
        en: 'To the right / To the left',
        phonetic: 'ah lah deh-REH-chah / ah lah ees-KYEHR-dah',
        exampleEs: 'Gire a la derecha en la próxima esquina.',
        exampleEn: 'Turn right at the next corner.',
        tip: 'Remember: "Derecha" is right; "Derecho" (no \'a\') means straight ahead!'
      },
      {
        id: 'w1d4_3',
        es: 'Todo recto / Derecho',
        en: 'Straight ahead',
        phonetic: 'TOH-doh REHK-toh / deh-REH-choh',
        exampleEs: 'Siga todo recto por dos cuadras.',
        exampleEn: 'Continue straight ahead for two blocks.',
        tip: 'In Latin America "cuadra" is block; in Spain they say "manzana".'
      },
      {
        id: 'w1d4_4',
        es: '¿Está cerca o lejos?',
        en: 'Is it near or far?',
        phonetic: 'ehs-TAH SEHR-kah oh LEH-hohs',
        exampleEs: '¿Está cerca caminando? — Sí, a cinco minutos.',
        exampleEn: 'Is it close on foot? — Yes, five minutes away.',
        tip: '"Cerca de" = close to; "Lejos de" = far from.'
      },
      {
        id: 'w1d4_5',
        es: 'Un billete / boleto de ida y vuelta',
        en: 'A round-trip ticket',
        phonetic: 'oon bee-YEH-teh deh EE-dah ee VWEHL-tah',
        exampleEs: 'Un billete de ida y vuelta a Toledo, por favor.',
        exampleEn: 'A round-trip ticket to Toledo, please.',
        tip: '"Ida" = one way; "Ida y vuelta" = round trip.'
      }
    ],
    grammar: {
      title: 'Asking "Where is..." with Estar',
      rule: 'Because locations can change and are spatial, always use "Estar" (never Ser) to ask where places, buildings, or people are located.',
      examples: [
        { es: '¿Dónde está el baño?', en: 'Where is the bathroom?' },
        { es: 'El hotel está enfrente del parque.', en: 'The hotel is in front of the park.' }
      ],
      proTip: 'Enfrente de (in front of), Al lado de (next to), Detrás de (behind).'
    },
    dialogue: [
      {
        id: 'w1d4_dia_1',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Disculpe señor, ¿cómo llego a la Plaza Mayor?',
        textEn: 'Excuse me sir, how do I get to Plaza Mayor?'
      },
      {
        id: 'w1d4_dia_2',
        speaker: 'Transeúnte',
        role: 'native',
        avatar: '🚶‍♂️',
        textEs: 'Camine todo recto y doble a la izquierda. Está allí.',
        textEn: 'Walk straight ahead and turn left. It is right there.'
      }
    ],
    quiz: [
      {
        id: 'w1d4_q1',
        question: 'What does "Todo recto" mean?',
        type: 'multiple-choice',
        options: ['Turn right', 'Straight ahead', 'Turn left', 'Very far'],
        correctIndex: 1,
        explanation: '"Todo recto" (or "todo derecho") means straight ahead.'
      }
    ]
  },
  {
    day: 5,
    week: 1,
    phaseTitle: 'Semana 1: Supervivencia Esencial',
    titleEs: 'En el Hotel y Alojamiento',
    titleEn: 'Checking In & Hotel Stays',
    subtitle: 'Check in smoothly, request amenities, and solve room issues.',
    category: 'Survival',
    cefr: 'A1',
    durationMinutes: 10,
    iconName: 'Building',
    summary: 'Handle hotel check-in, ask for Wi-Fi passwords, and report room requests.',
    vocabulary: [
      {
        id: 'w1d5_1',
        es: 'Tengo una reserva a nombre de...',
        en: 'I have a reservation under the name of...',
        phonetic: 'TEHN-goh OO-nah reh-SEHR-vah ah NOHM-breh deh',
        exampleEs: 'Buenas tardes, tengo una reserva a nombre de Smith.',
        exampleEn: 'Good afternoon, I have a reservation under the name of Smith.',
        tip: 'Have your passport ready; hotels in Spain and Latin America legally require it.'
      },
      {
        id: 'w1d5_2',
        es: '¿Cuál es la contraseña del Wi-Fi?',
        en: 'What is the Wi-Fi password?',
        phonetic: 'kwahl ehs lah kohn-trah-SEH-nyah dehl WEE-fee',
        exampleEs: 'Perdón, ¿cuál es la contraseña del Wi-Fi?',
        exampleEn: 'Excuse me, what is the Wi-Fi password?',
        tip: 'In Spanish, Wi-Fi is pronounced "WEE-fee".'
      },
      {
        id: 'w1d5_3',
        es: 'La llave / La tarjeta de la habitación',
        en: 'The room key / keycard',
        phonetic: 'lah YAH-veh / lah tar-HEH-tah deh lah ah-bee-tah-SYOHN',
        exampleEs: 'Aquí tiene su tarjeta, habitación número cuatrocientos dos.',
        exampleEn: 'Here is your keycard, room number 402.',
        tip: 'If you need extra towels, ask: "¿Me puede dar más toallas?"'
      },
      {
        id: 'w1d5_4',
        es: '¿A qué hora es el desayuno?',
        en: 'What time is breakfast?',
        phonetic: 'ah keh OH-rah ehs ehl deh-sah-YOO-noh',
        exampleEs: 'El desayuno buffet se sirve de siete a diez.',
        exampleEn: 'The buffet breakfast is served from seven to ten.',
        tip: '"Desayuno" = breakfast, "Almuerzo" = lunch, "Cena" = dinner.'
      },
      {
        id: 'w1d5_5',
        es: '¿Puedo dejar mi equipaje aquí?',
        en: 'Can I leave my luggage here?',
        phonetic: 'PWEH-doh deh-HAR mee eh-kee-PAH-heh ah-KEE',
        exampleEs: 'Hice el check-out, ¿puedo dejar mis maletas hasta la tarde?',
        exampleEn: 'I checked out, can I leave my suitcases until the afternoon?',
        tip: '"Equipaje" = luggage; "Maleta" = suitcase.'
      }
    ],
    grammar: {
      title: 'Using "Hay" (There is / There are)',
      rule: '"Hay" is invariable and means both "there is" and "there are". To ask if something exists, just put question marks: "¿Hay Wi-Fi?" (Is there Wi-Fi?).',
      examples: [
        { es: '¿Hay ascensor en el hotel?', en: 'Is there an elevator in the hotel?' },
        { es: 'Hay dos camas en la habitación.', en: 'There are two beds in the room.' }
      ],
      proTip: 'Never say "Hay son" or "Hay es". Always simply "Hay"!'
    },
    dialogue: [
      {
        id: 'w1d5_dia_1',
        speaker: 'Recepcionista',
        role: 'native',
        avatar: '🛎️',
        textEs: '¡Bienvenido! ¿Tiene reserva con nosotros?',
        textEn: 'Welcome! Do you have a reservation with us?'
      },
      {
        id: 'w1d5_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Sí, a nombre de Taylor. Para tres noches.',
        textEn: 'Yes, under the name of Taylor. For three nights.'
      }
    ],
    quiz: [
      {
        id: 'w1d5_q1',
        question: 'How do you say "Is there Wi-Fi?"',
        type: 'multiple-choice',
        options: ['¿Está Wi-Fi?', '¿Es Wi-Fi?', '¿Hay Wi-Fi?', '¿Tiene Wi-Fi es?'],
        correctIndex: 2,
        explanation: '"Hay" is used for existence: "¿Hay Wi-Fi?"'
      }
    ]
  },
  {
    day: 6,
    week: 1,
    phaseTitle: 'Semana 1: Supervivencia Esencial',
    titleEs: 'Compras y Precios',
    titleEn: 'Shopping & Asking Prices',
    subtitle: 'Ask how much items cost, try on clothes, and pay by card.',
    category: 'Survival',
    cefr: 'A1',
    durationMinutes: 10,
    iconName: 'ShoppingBag',
    summary: 'Master shopping dialogues, asking sizes, colors, and payment methods.',
    vocabulary: [
      {
        id: 'w1d6_1',
        es: '¿Cuánto cuesta esto?',
        en: 'How much does this cost?',
        phonetic: 'KWAHN-toh KWEHS-tah EHS-toh',
        exampleEs: 'Disculpe, ¿cuánto cuesta esta camisa azul?',
        exampleEn: 'Excuse me, how much does this blue shirt cost?',
        tip: 'For plural items say: "¿Cuánto cuestan estos?"'
      },
      {
        id: 'w1d6_2',
        es: '¿Puedo pagar con tarjeta?',
        en: 'Can I pay with credit card?',
        phonetic: 'PWEH-doh pah-GAR kohn tar-HEH-tah',
        exampleEs: '¿Aceptan tarjeta de crédito o solo efectivo?',
        exampleEn: 'Do you accept credit card or cash only?',
        tip: '"Efectivo" = cash. "Tarjeta" = card.'
      },
      {
        id: 'w1d6_3',
        es: '¿Tiene una talla más grande / pequeña?',
        en: 'Do you have a bigger / smaller size?',
        phonetic: 'TYEH-neh OO-nah TAH-yah mahs GRAHN-deh / peh-KEH-nyah',
        exampleEs: 'Me queda un poco justa, ¿tiene una talla más grande?',
        exampleEn: 'It is a bit tight, do you have a bigger size?',
        tip: '"Talla" is clothing size; "Número" is shoe size.'
      },
      {
        id: 'w1d6_4',
        es: 'Solo estoy mirando, gracias',
        en: 'I am just looking, thank you',
        phonetic: 'SOH-loh ehs-TOY mee-RAHN-doh, GRAH-syahs',
        exampleEs: '¿Le puedo ayudar en algo? — Solo estoy mirando, gracias.',
        exampleEn: 'Can I help you with something? — I am just looking, thank you.',
        tip: 'The universal polite phrase to browse shops without sales pressure.'
      },
      {
        id: 'w1d6_5',
        es: 'Me lo llevo',
        en: 'I\'ll take it',
        phonetic: 'meh loh YEH-voh',
        exampleEs: 'Me encanta cómo me queda. Me lo llevo.',
        exampleEn: 'I love how it fits me. I\'ll take it.',
        tip: 'Used at the cashier when deciding to purchase.'
      }
    ],
    grammar: {
      title: 'Demonstratives: Este, Esta, Esto',
      rule: 'Use "Este" for masculine nouns (este libro), "Esta" for feminine nouns (esta camisa), and "Esto" for neutral or unknown objects (¿Qué es esto?).',
      examples: [
        { es: 'Este vestido es elegante.', en: 'This dress is elegant.' },
        { es: '¿Cuánto cuesta esto?', en: 'How much is this (unknown object)?' }
      ],
      proTip: 'Remember: "T" has a \'this\': esTe = this, ese = that.'
    },
    dialogue: [
      {
        id: 'w1d6_dia_1',
        speaker: 'Dependiente',
        role: 'native',
        avatar: '👔',
        textEs: 'Hola, ¿buscas alguna talla en particular?',
        textEn: 'Hello, looking for a particular size?'
      },
      {
        id: 'w1d6_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Busco una talla mediana. ¿Puedo probármelo?',
        textEn: 'I am looking for a medium. Can I try it on?'
      }
    ],
    quiz: [
      {
        id: 'w1d6_q1',
        question: 'What is the word for cash in Spanish?',
        type: 'multiple-choice',
        options: ['Tarjeta', 'Efectivo', 'Propina', 'Descuento'],
        correctIndex: 1,
        explanation: '"Efectivo" means cash, while "tarjeta" is card.'
      }
    ]
  },
  {
    day: 7,
    week: 1,
    phaseTitle: 'Semana 1: Supervivencia Esencial',
    titleEs: 'Repaso y Desafío Semanal 1',
    titleEn: 'Week 1 Milestone & Survival Mastery',
    subtitle: 'Consolidate Week 1! Test your confidence across all survival scenarios.',
    category: 'Milestone',
    cefr: 'A1',
    durationMinutes: 15,
    iconName: 'Award',
    summary: 'Celebrate finishing your first week! Review greetings, ordering, transport, and lodging.',
    vocabulary: [
      {
        id: 'w1d7_1',
        es: '¡Lo lograste!',
        en: 'You did it! / You achieved it!',
        phonetic: 'loh loh-GRAHS-teh',
        exampleEs: '¡Terminaste la semana uno, lo lograste!',
        exampleEn: 'You finished week one, you did it!',
        tip: 'From the verb "lograr" (to achieve).'
      },
      {
        id: 'w1d7_2',
        es: 'Hablo un poco de español',
        en: 'I speak a little Spanish',
        phonetic: 'AH-bloh oon POH-koh deh ehs-pah-NYOHL',
        exampleEs: 'Hablo un poco de español pero estoy aprendiendo.',
        exampleEn: 'I speak a little Spanish but I am learning.',
        tip: 'Natives will love you for trying and speaking Spanish!'
      },
      {
        id: 'w1d7_3',
        es: '¿Puede hablar más despacio, por favor?',
        en: 'Can you speak slower, please?',
        phonetic: 'PWEH-deh ah-BLAR mahs dehs-PAH-syoh',
        exampleEs: 'Perdón, ¿puede hablar más despacio?',
        exampleEn: 'Pardon, could you speak more slowly?',
        tip: 'Essential when natives speak rapidly.'
      },
      {
        id: 'w1d7_4',
        es: 'No entiendo / ¿Puede repetirlo?',
        en: 'I don\'t understand / Can you repeat that?',
        phonetic: 'noh ehn-TYEHN-doh / PWEH-deh reh-peh-TEER-loh',
        exampleEs: 'Lo siento, no entiendo bien. ¿Puede repetirlo?',
        exampleEn: 'I am sorry, I do not understand well. Can you repeat it?',
        tip: 'Never be afraid to ask someone to repeat.'
      }
    ],
    grammar: {
      title: 'Week 1 Review: The Golden Survival Trio',
      rule: 'With 3 key verbs (Querer = to want, Poder = can/to be able to, and Tener = to have), you can navigate 90% of travel needs: "Quiero...", "¿Puedo...?", "Tengo...".',
      examples: [
        { es: 'Quiero agua, por favor.', en: 'I want water, please.' },
        { es: '¿Puedo pagar con tarjeta?', en: 'Can I pay with card?' },
        { es: 'Tengo una reserva.', en: 'I have a reservation.' }
      ],
      proTip: 'Combine these with an infinitive verb for endless combinations.'
    },
    dialogue: [
      {
        id: 'w1d7_dia_1',
        speaker: 'Sofía AI',
        role: 'native',
        avatar: '💃',
        textEs: '¡Felicidades por completar tu primera semana de español!',
        textEn: 'Congratulations on completing your first week of Spanish!'
      },
      {
        id: 'w1d7_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Muchas gracias Sofía! Estoy listo para la semana dos.',
        textEn: 'Thank you very much Sofía! I am ready for week two.'
      }
    ],
    quiz: [
      {
        id: 'w1d7_q1',
        question: 'How do you ask a native to speak more slowly?',
        type: 'multiple-choice',
        options: [
          '¿Puede hablar más rápido?',
          '¿Puede hablar más despacio, por favor?',
          'No me hables',
          'Habla muy alto'
        ],
        correctIndex: 1,
        explanation: '"Más despacio" means more slowly.'
      },
      {
        id: 'w1d7_q2',
        question: 'Which verb correctly completes: "Yo ______ una reserva"?',
        type: 'multiple-choice',
        options: ['estoy', 'tengo', 'hago', 'quiero es'],
        correctIndex: 1,
        explanation: '"Tengo una reserva" means I have a reservation.'
      }
    ]
  }
];
