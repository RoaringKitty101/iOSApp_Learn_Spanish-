import { DayLesson } from '../types';

export const week2Lessons: DayLesson[] = [
  {
    day: 8,
    week: 2,
    phaseTitle: 'Semana 2: Vida Diaria y Fundamentos',
    titleEs: 'La Familia y Descripciones',
    titleEn: 'Family & Describing People',
    subtitle: 'Talk about your family members, physical features, and personalities.',
    category: 'Conversation',
    cefr: 'A1',
    durationMinutes: 12,
    iconName: 'Users',
    summary: 'Learn key family members (padres, hermanos, hijos) and adjectives.',
    vocabulary: [
      {
        id: 'w2d8_1',
        es: 'La familia: padre, madre, hermanos',
        en: 'The family: father, mother, siblings',
        phonetic: 'lah fah-MEE-lyah: PAH-dreh, MAH-dreh, ehr-MAH-nohs',
        exampleEs: 'Tengo dos hermanos y una hermana menor.',
        exampleEn: 'I have two brothers and a younger sister.',
        tip: '"Padres" means parents (father and mother), not priests!'
      },
      {
        id: 'w2d8_2',
        es: 'Mi esposo / Mi esposa / Mi pareja',
        en: 'My husband / My wife / My partner',
        phonetic: 'mee ehs-POH-soh / mee ehs-POH-sah / mee pah-REH-hah',
        exampleEs: 'Mi esposa se llama Lucía.',
        exampleEn: 'My wife\'s name is Lucía.',
        tip: '"Pareja" is a gender-neutral word for partner or significant other.'
      },
      {
        id: 'w2d8_3',
        es: 'Alto, bajo, simpático, inteligente',
        en: 'Tall, short, nice/friendly, smart',
        phonetic: 'AHL-toh, BAH-hoh, seem-PAH-tee-koh, een-teh-lee-HEHN-teh',
        exampleEs: 'Mi hermano es muy alto y simpático.',
        exampleEn: 'My brother is very tall and friendly.',
        tip: 'Adjectives match the gender: simpático (m) / simpática (f).'
      },
      {
        id: 'w2d8_4',
        es: '¿Cuántos años tienes?',
        en: 'How old are you?',
        phonetic: 'KWAHN-tohs AH-nyohs TYEH-nehs',
        exampleEs: '¿Cuántos años tienes? — Tengo treinta años.',
        exampleEn: 'How old are you? — I am thirty years old.',
        tip: 'In Spanish, you don\'t "are" age; you "have" years (Tener).'
      }
    ],
    grammar: {
      title: 'Tener for Age and Physical Attributes',
      rule: 'Always use "Tener" (to have) for age, hair color, and eye color: "Tengo ojos verdes" (I have green eyes), "Tengo 28 años" (I am 28 years old).',
      examples: [
        { es: 'Ella tiene veinticinco años.', en: 'She is twenty-five years old.' },
        { es: 'Tiene el pelo rizado.', en: 'He/she has curly hair.' }
      ],
      proTip: 'Never say "Soy 30 años". That\'s an instant English tell!'
    },
    dialogue: [
      {
        id: 'w2d8_dia_1',
        speaker: 'Amigo',
        role: 'native',
        avatar: '🧔',
        textEs: '¿Tienes una familia grande?',
        textEn: 'Do you have a large family?'
      },
      {
        id: 'w2d8_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Sí, tengo tres hermanos y un perro pequeño.',
        textEn: 'Yes, I have three brothers and a small dog.'
      }
    ],
    quiz: [
      {
        id: 'w2d8_q1',
        question: 'How do you say "I am 30 years old"?',
        type: 'multiple-choice',
        options: ['Soy treinta años', 'Estoy treinta años', 'Tengo treinta años', 'Hago treinta años'],
        correctIndex: 2,
        explanation: 'Spanish uses "Tener" for age: "Tengo treinta años".'
      }
    ]
  },
  {
    day: 9,
    week: 2,
    phaseTitle: 'Semana 2: Vida Diaria y Fundamentos',
    titleEs: 'Rutina Diaria y Verbos Reflexivos',
    titleEn: 'Daily Routine & Reflexives',
    subtitle: 'Describe waking up, showering, working, and going to bed.',
    category: 'Grammar',
    cefr: 'A2',
    durationMinutes: 12,
    iconName: 'SunMedium',
    summary: 'Master reflexive verbs like despertarse, ducharse, and acostarse.',
    vocabulary: [
      {
        id: 'w2d9_1',
        es: 'Me despierto a las siete',
        en: 'I wake up at seven',
        phonetic: 'meh dehs-PYEHR-toh ah lahs SYEH-teh',
        exampleEs: 'Normalmente me despierto temprano todos los días.',
        exampleEn: 'Normally I wake up early every day.',
        tip: 'From "despertarse". The "me" shows the action is done to oneself.'
      },
      {
        id: 'w2d9_2',
        es: 'Me ducho y desayuno',
        en: 'I shower and have breakfast',
        phonetic: 'meh DOO-choh ee deh-sah-YOO-noh',
        exampleEs: 'Primero me ducho y luego desayuno un café con tostadas.',
        exampleEn: 'First I shower and then I eat coffee and toast for breakfast.',
        tip: '"Desayunar" is an active verb: "Yo desayuno" (I eat breakfast).'
      },
      {
        id: 'w2d9_3',
        es: 'Empiezo a trabajar / estudiar',
        en: 'I start working / studying',
        phonetic: 'ehm-PYEH-zoh ah trah-bah-HAR',
        exampleEs: 'Empiezo a trabajar a las nueve de la mañana.',
        exampleEn: 'I start working at nine in the morning.',
        tip: '"Empezar a" is always followed by an infinitive verb.'
      },
      {
        id: 'w2d9_4',
        es: 'Me acuesto a medianoche',
        en: 'I go to bed at midnight',
        phonetic: 'meh ah-KWEHS-toh ah meh-dyah-NOH-cheh',
        exampleEs: 'Leo un libro y me acuesto a las once.',
        exampleEn: 'I read a book and go to bed at eleven.',
        tip: '"Acostarse" changes o -> ue in the present tense.'
      }
    ],
    grammar: {
      title: 'Reflexive Pronouns: me, te, se, nos',
      rule: 'Reflexive verbs indicate actions you do to yourself. Put the reflexive pronoun right in front of the conjugated verb: Yo me levanto, Tú te levantas, Él/Ella se levanta.',
      examples: [
        { es: '¿A qué hora te levantas?', en: 'What time do you get up?' },
        { es: 'Nos acostamos temprano.', en: 'We go to bed early.' }
      ],
      proTip: 'When using an infinitive, you can attach it to the end: "Voy a ducharme".'
    },
    dialogue: [
      {
        id: 'w2d9_dia_1',
        speaker: 'Colega',
        role: 'native',
        avatar: '👩‍💻',
        textEs: '¿A qué hora te levantas entre semana?',
        textEn: 'What time do you get up on weekdays?'
      },
      {
        id: 'w2d9_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Me levanto a las seis y media para hacer ejercicio.',
        textEn: 'I get up at six-thirty to exercise.'
      }
    ],
    quiz: [
      {
        id: 'w2d9_q1',
        question: 'Which pronoun fits: "Tú _____ duchas por la mañana"?',
        type: 'multiple-choice',
        options: ['me', 'te', 'se', 'nos'],
        correctIndex: 1,
        explanation: 'For "tú", the reflexive pronoun is "te".'
      }
    ]
  },
  {
    day: 10,
    week: 2,
    phaseTitle: 'Semana 2: Vida Diaria y Fundamentos',
    titleEs: 'Clima, Ropa y Estaciones',
    titleEn: 'Weather, Clothing & Seasons',
    subtitle: 'Discuss the weather forecast and what to wear for every season.',
    category: 'Conversation',
    cefr: 'A1',
    durationMinutes: 10,
    iconName: 'CloudRain',
    summary: 'Say if it is hot, cold, sunny, or raining, and pick your outfit.',
    vocabulary: [
      {
        id: 'w2d10_1',
        es: 'Hace calor / Hace frío',
        en: 'It is hot / It is cold',
        phonetic: 'AH-seh kah-LOR / AH-seh FREE-oh',
        exampleEs: 'Hoy hace mucho calor en Sevilla.',
        exampleEn: 'Today it is very hot in Seville.',
        tip: 'Spanish uses "Hacer" (to make/do) for weather: "Hace buen tiempo".'
      },
      {
        id: 'w2d10_2',
        es: 'Está lloviendo / Hace sol',
        en: 'It is raining / It is sunny',
        phonetic: 'ehs-TAH yoh-VYEHN-doh / AH-seh sohl',
        exampleEs: 'Lleva un paraguas porque está lloviendo.',
        exampleEn: 'Take an umbrella because it is raining.',
        tip: '"Paraguas" (umbrella) is singular and masculine: "el paraguas".'
      },
      {
        id: 'w2d10_3',
        es: 'Llevar puesto: abrigo, camiseta, pantalones',
        en: 'To wear: coat, t-shirt, trousers/pants',
        phonetic: 'yeh-VAR PWEHS-toh: ah-BREE-goh, kah-mee-SEH-tah',
        exampleEs: 'Hoy llevo puesta una camiseta y gafas de sol.',
        exampleEn: 'Today I am wearing a t-shirt and sunglasses.',
        tip: '"Llevar" means both to carry and to wear.'
      },
      {
        id: 'w2d10_4',
        es: 'Primavera, Verano, Otoño, Invierno',
        en: 'Spring, Summer, Autumn/Fall, Winter',
        phonetic: 'pree-mah-VEH-rah, veh-RAH-noh, oh-TOH-nyoh, een-VYEHR-noh',
        exampleEs: 'Mi estación favorita es el otoño.',
        exampleEn: 'My favorite season is autumn.',
        tip: 'All seasons except "la primavera" are masculine: el verano, el otoño, el invierno.'
      }
    ],
    grammar: {
      title: 'Weather Expressions with "Hacer"',
      rule: 'In Spanish, you don\'t say "The weather is cold"; you say "Hace frío" (It makes cold), "Hace viento" (It makes wind), or "Hace sol" (It makes sun).',
      examples: [
        { es: 'Hace mucho calor en verano.', en: 'It is very hot in summer.' },
        { es: '¿Qué tiempo hace hoy?', en: 'What is the weather like today?' }
      ],
      proTip: 'Use "mucho" with Hace (Hace mucho frío), NOT "muy"!'
    },
    dialogue: [
      {
        id: 'w2d10_dia_1',
        speaker: 'Guía',
        role: 'native',
        avatar: '🧢',
        textEs: '¿Qué tiempo hace afuera? ¿Necesitamos chaqueta?',
        textEn: 'What is the weather like outside? Do we need a jacket?'
      },
      {
        id: 'w2d10_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Hace viento y está nublado. Mejor llevamos chaqueta.',
        textEn: 'It is windy and cloudy. We better take a jacket.'
      }
    ],
    quiz: [
      {
        id: 'w2d10_q1',
        question: 'How do you say "It is very cold today"?',
        type: 'multiple-choice',
        options: ['Es muy frío hoy', 'Hace mucho frío hoy', 'Está muy frío hoy', 'Tiene frío hoy'],
        correctIndex: 1,
        explanation: 'Weather in Spanish uses "Hacer": "Hace mucho frío hoy".'
      }
    ]
  },
  {
    day: 11,
    week: 2,
    phaseTitle: 'Semana 2: Vida Diaria y Fundamentos',
    titleEs: 'Gustos, Pasatiempos e Intereses',
    titleEn: 'Likes, Hobbies & Preferences',
    subtitle: 'Express what you love, like, and dislike using the verb Gustar.',
    category: 'Grammar',
    cefr: 'A2',
    durationMinutes: 12,
    iconName: 'Heart',
    summary: 'Master the unique structure of "Me gusta" and talk about music, travel, and sports.',
    vocabulary: [
      {
        id: 'w2d11_1',
        es: 'Me gusta mucho viajar',
        en: 'I really like traveling',
        phonetic: 'meh GOOS-tah MOO-choh vyah-HAR',
        exampleEs: 'Me gusta mucho viajar y conocer nuevas culturas.',
        exampleEn: 'I really like traveling and learning new cultures.',
        tip: 'Literally: "Traveling pleases me".'
      },
      {
        id: 'w2d11_2',
        es: 'Me encanta la música latina',
        en: 'I love Latin music',
        phonetic: 'meh ehn-KAHN-tah lah MOO-see-kah lah-TEE-nah',
        exampleEs: '¡Me encanta la salsa y el reggaetón!',
        exampleEn: 'I love salsa and reggaeton!',
        tip: '"Encantar" is even stronger than "gustar" (to love something).'
      },
      {
        id: 'w2d11_3',
        es: 'No me gusta nada madrugar',
        en: 'I don\'t like waking up early at all',
        phonetic: 'noh meh GOOS-tah NAH-dah mah-droo-GAR',
        exampleEs: 'No me gusta nada el café amargo.',
        exampleEn: 'I don\'t like bitter coffee at all.',
        tip: '"Madrugar" is a unique Spanish verb meaning to wake up very early in the morning.'
      },
      {
        id: 'w2d11_4',
        es: '¿Cuáles son tus pasatiempos?',
        en: 'What are your hobbies?',
        phonetic: 'KWAH-lehs sohn toos pah-sah-TYEHM-pohs',
        exampleEs: 'En mi tiempo libre me gusta leer y cocinar.',
        exampleEn: 'In my free time I like to read and cook.',
        tip: 'Great conversational opener at social gatherings.'
      }
    ],
    grammar: {
      title: 'The Secret of the Verb "Gustar"',
      rule: 'In Spanish, things please you. Singular things or actions take "gusta": Me gusta el libro / Me gusta bailar. Plural things take "gustan": Me gustan los tacos.',
      examples: [
        { es: 'Me gusta la playa.', en: 'I like the beach (singular -> gusta).' },
        { es: 'Me gustan las ciudades antiguas.', en: 'I like ancient cities (plural -> gustan).' }
      ],
      proTip: 'To agree: "A mí también" (Me too) or "A mí tampoco" (Me neither).'
    },
    dialogue: [
      {
        id: 'w2d11_dia_1',
        speaker: 'Paula',
        role: 'native',
        avatar: '🎨',
        textEs: '¿Qué te gusta hacer los fines de semana?',
        textEn: 'What do you like to do on weekends?'
      },
      {
        id: 'w2d11_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Me gusta salir con amigos y practicar español.',
        textEn: 'I like hanging out with friends and practicing Spanish.'
      }
    ],
    quiz: [
      {
        id: 'w2d11_q1',
        question: 'Which is correct: "Me _______ las películas de acción"?',
        type: 'multiple-choice',
        options: ['gusta', 'gustan', 'gusto', 'gustas'],
        correctIndex: 1,
        explanation: 'Because "las películas" is plural, the verb is "gustan".'
      }
    ]
  },
  {
    day: 12,
    week: 2,
    phaseTitle: 'Semana 2: Vida Diaria y Fundamentos',
    titleEs: 'En el Trabajo y Profesiones',
    titleEn: 'Work & Occupations',
    subtitle: 'Discuss careers, what you do for a living, and office tasks.',
    category: 'Conversation',
    cefr: 'A2',
    durationMinutes: 10,
    iconName: 'Briefcase',
    summary: 'Talk about your profession, schedule, emails, and meetings.',
    vocabulary: [
      {
        id: 'w2d12_1',
        es: '¿A qué te dedicas?',
        en: 'What do you do for a living?',
        phonetic: 'ah keh teh deh-DEE-kahs',
        exampleEs: '¿A qué te dedicas? — Soy ingeniero de software.',
        exampleEn: 'What do you do for a living? — I am a software engineer.',
        tip: 'Notice in Spanish we do NOT say "Soy un ingeniero"; just "Soy ingeniero".'
      },
      {
        id: 'w2d12_2',
        es: 'Trabajo en una empresa tecnológica',
        en: 'I work at a tech company',
        phonetic: 'trah-BAH-hoh ehn OO-nah ehm-PREH-sah tehk-noh-LOH-hee-kah',
        exampleEs: 'Trabajo en remoto desde mi casa.',
        exampleEn: 'I work remotely from my home.',
        tip: '"Trabajar en remoto" = to work remotely.'
      },
      {
        id: 'w2d12_3',
        es: 'Tengo una reunión importante',
        en: 'I have an important meeting',
        phonetic: 'TEHN-goh OO-nah reh-oo-NYOHN eem-por-TAHN-teh',
        exampleEs: 'No puedo hablar ahora, tengo una reunión con el cliente.',
        exampleEn: 'I cannot talk right now, I have a meeting with the client.',
        tip: '"Enviar un correo" = send an email.'
      },
      {
        id: 'w2d12_4',
        es: 'Mi jefe / Mi equipo de trabajo',
        en: 'My boss / My work team',
        phonetic: 'mee HEH-feh / mee eh-KEE-poh deh trah-BAH-hoh',
        exampleEs: 'Tengo un buen equipo de trabajo.',
        exampleEn: 'I have a good work team.',
        tip: 'Jefe (m) / Jefa (f).'
      }
    ],
    grammar: {
      title: 'No Articles with Professions',
      rule: 'When stating your profession after "Ser", do NOT use "un" or "una". Just say: Soy médico, Soy profesor, Soy abogado.',
      examples: [
        { es: 'Ella es diseñadora.', en: 'She is a designer.' },
        { es: 'Juan es arquitecto.', en: 'Juan is an architect.' }
      ],
      proTip: 'Only use "un/una" if you add an adjective: "Soy UN profesor dedicado".'
    },
    dialogue: [
      {
        id: 'w2d12_dia_1',
        speaker: 'Laura',
        role: 'native',
        avatar: '👩‍💼',
        textEs: 'Mucho gusto. ¿En qué trabajas?',
        textEn: 'Nice to meet you. What kind of work do you do?'
      },
      {
        id: 'w2d12_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: 'Soy consultor y trabajo en proyectos internacionales.',
        textEn: 'I am a consultant and I work on international projects.'
      }
    ],
    quiz: [
      {
        id: 'w2d12_q1',
        question: 'Which sentence is grammatically correct in Spanish?',
        type: 'multiple-choice',
        options: ['Soy un médico', 'Soy médico', 'Estoy médico', 'Tengo médico'],
        correctIndex: 1,
        explanation: 'Spanish does not use an article with professions: "Soy médico".'
      }
    ]
  },
  {
    day: 13,
    week: 2,
    phaseTitle: 'Semana 2: Vida Diaria y Fundamentos',
    titleEs: 'La Casa y Lugares del Barrio',
    titleEn: 'Home, Rooms & Neighborhood',
    subtitle: 'Describe apartments, furniture, and local neighborhood spots.',
    category: 'Conversation',
    cefr: 'A2',
    durationMinutes: 10,
    iconName: 'Home',
    summary: 'Learn rooms of the house (cocina, salón, dormitorio) and local shops.',
    vocabulary: [
      {
        id: 'w2d13_1',
        es: 'La sala / El salón y La cocina',
        en: 'The living room and the kitchen',
        phonetic: 'lah SAH-lah / ehl sah-LOHN ee lah koh-SEE-nah',
        exampleEs: 'Mi apartamento tiene un salón luminoso y dos habitaciones.',
        exampleEn: 'My apartment has a bright living room and two bedrooms.',
        tip: '"Salón" is common in Spain; "Sala" in Latin America.'
      },
      {
        id: 'w2d13_2',
        es: 'La panadería y La farmacia',
        en: 'The bakery and The pharmacy',
        phonetic: 'lah pah-nah-deh-REE-ah ee lah far-MAH-syah',
        exampleEs: 'Compro pan fresco en la panadería cada mañana.',
        exampleEn: 'I buy fresh bread at the bakery every morning.',
        tip: 'In Spanish, stores end in -ería: panadería, carnicería, librería.'
      },
      {
        id: 'w2d13_3',
        es: 'Vivo en un piso / apartamento en el centro',
        en: 'I live in an apartment in downtown / the city center',
        phonetic: 'VEE-voh ehn oon PEE-soh / ah-par-tah-MEHN-toh',
        exampleEs: 'Vivo en un barrio muy tranquilo y seguro.',
        exampleEn: 'I live in a very quiet and safe neighborhood.',
        tip: '"Piso" in Spain means apartment or floor; in Latin America it\'s "departamento".'
      },
      {
        id: 'w2d13_4',
        es: 'Cerca de mi casa hay un parque',
        en: 'Near my house there is a park',
        phonetic: 'SEHR-kah deh mee KAH-sah eye oon PAR-keh',
        exampleEs: 'Paseo a mi perro en el parque cada tarde.',
        exampleEn: 'I walk my dog in the park every afternoon.',
        tip: '"Cerca de" (near) vs "Lejos de" (far from).'
      }
    ],
    grammar: {
      title: 'Prepositions of Place (Enfrente, Al lado, Entre)',
      rule: 'Use prepositions to describe layout: "Al lado de" (next to), "Enfrente de" (in front of / opposite), "Entre" (between). Remember "de + el = del".',
      examples: [
        { es: 'La farmacia está al lado del banco.', en: 'The pharmacy is next to the bank.' },
        { es: 'El parque está enfrente de mi casa.', en: 'The park is across from my house.' }
      ],
      proTip: 'Notice the contraction: "de + el" becomes "del".'
    },
    dialogue: [
      {
        id: 'w2d13_dia_1',
        speaker: 'Vecino',
        role: 'native',
        avatar: '👵',
        textEs: '¡Hola! ¿Eres el nuevo vecino del tercer piso?',
        textEn: 'Hello! Are you the new neighbor on the third floor?'
      },
      {
        id: 'w2d13_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Sí, encantado! Me mudé la semana pasada.',
        textEn: 'Yes, nice to meet you! I moved in last week.'
      }
    ],
    quiz: [
      {
        id: 'w2d13_q1',
        question: 'Which word means "bakery"?',
        type: 'multiple-choice',
        options: ['Carnicería', 'Panadería', 'Peluquería', 'Zapatería'],
        correctIndex: 1,
        explanation: '"Panadería" comes from pan (bread).'
      }
    ]
  },
  {
    day: 14,
    week: 2,
    phaseTitle: 'Semana 2: Vida Diaria y Fundamentos',
    titleEs: 'Repaso y Desafío Semanal 2',
    titleEn: 'Week 2 Conversational Milestone',
    subtitle: 'Halfway point! Test your daily communication fluency.',
    category: 'Milestone',
    cefr: 'A2',
    durationMinutes: 15,
    iconName: 'Sparkles',
    summary: 'Reach Day 14! You now have the skills to describe family, routine, weather, and home.',
    vocabulary: [
      {
        id: 'w2d14_1',
        es: '¡Ya casi estamos a la mitad!',
        en: 'We are almost halfway there!',
        phonetic: 'yah KAH-see ehs-TAH-mohs ah lah mee-TAHD',
        exampleEs: '¡Dos semanas completadas con éxito!',
        exampleEn: 'Two weeks completed successfully!',
        tip: 'Building consistent daily habits is what makes language stick.'
      },
      {
        id: 'w2d14_2',
        es: 'Puedo mantener una conversación',
        en: 'I can hold a conversation',
        phonetic: 'PWEH-doh mahn-teh-NEHR OO-nah kohn-vehr-sah-SYOHN',
        exampleEs: 'Ahora puedo pedir comida y hablar de mi rutina.',
        exampleEn: 'Now I can order food and talk about my routine.',
        tip: 'Recognize your progress; you already know over 80 high-frequency Spanish words.'
      },
      {
        id: 'w2d14_3',
        es: 'Todos los días aprendo algo nuevo',
        en: 'Every day I learn something new',
        phonetic: 'TOH-dohs lohs DEE-ahs ah-PREHN-doh AHL-goh NWEH-voh',
        exampleEs: 'El español es un idioma hermoso.',
        exampleEn: 'Spanish is a beautiful language.',
        tip: '"Aprender" = to learn.'
      }
    ],
    grammar: {
      title: 'Week 2 Synthesis: Combining Daily Routine and Preferences',
      rule: 'Connect ideas naturally using connectors: "Primero" (first), "Luego" (then), "Después" (afterwards), "Porque" (because), and "Pero" (but).',
      examples: [
        { es: 'Me despierto y luego tomo café.', en: 'I wake up and then I drink coffee.' },
        { es: 'Me gusta cocinar pero no tengo tiempo.', en: 'I like cooking but I have no time.' }
      ],
      proTip: 'Connectors turn isolated phrases into natural, fluid speech.'
    },
    dialogue: [
      {
        id: 'w2d14_dia_1',
        speaker: 'Sofía AI',
        role: 'native',
        avatar: '💃',
        textEs: '¡Felicidades por llegar al Día 14! Tu español está mejorando muchísimo.',
        textEn: 'Congratulations on reaching Day 14! Your Spanish is improving so much.'
      },
      {
        id: 'w2d14_dia_2',
        speaker: 'Tú',
        role: 'user',
        avatar: '🙋',
        textEs: '¡Gracias Sofía! Me siento mucho más confiado hablando.',
        textEn: 'Thank you Sofía! I feel much more confident speaking.'
      }
    ],
    quiz: [
      {
        id: 'w2d14_q1',
        question: 'Which word connects actions chronologically ("then")?',
        type: 'multiple-choice',
        options: ['Luego', 'Porque', 'Pero', 'Aunque'],
        correctIndex: 0,
        explanation: '"Luego" means then / next.'
      },
      {
        id: 'w2d14_q2',
        question: 'How do you say "I love dogs"?',
        type: 'multiple-choice',
        options: ['Me encanta los perros', 'Me encantan los perros', 'Amo a todos perro', 'Me gusto los perros'],
        correctIndex: 1,
        explanation: 'Because "los perros" is plural, it is "Me encantan".'
      }
    ]
  }
];
