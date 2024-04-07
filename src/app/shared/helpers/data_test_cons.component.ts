import { BodyTest } from "@interfaces/test.interface";

export const questions:BodyTest[] = [
    {
      "id": 11,
      "title": "q1",
      "content": "¿Cómo te sientes hoy?",
      "type": "select_icon",
      "pillarId": 1,
      "pillar": {
        "id": 1,
        "name": "Mentalidad y Enfoque"
      },
      "answers": [
        {
          "id": 59,
          "content": "bien",
          "ponderation": 4
        },
        {
          "id": 2,
          "content": "Indiferente",
          "ponderation": 1
        },
        {
          "id": 5,
          "content": "entusiasmado",
          "ponderation": 5
        },
        {
          "id": 4,
          "content": "triste",
          "ponderation": 3
        },
        {
          "id": 3,
          "content": "Estresado",
          "ponderation": 2
        },
        {
          "id": 1,
          "content": "No estoy interesado",
          "ponderation": 0
        }
      ]
    },
    {
      "id": 12,
      "title": "q2",
      "content": "¿Te cuesta concentrarte durante un período de tiempo prolongado?",
      "type": "range",
      "pillarId": 1,
      "pillar": {
        "id": 1,
        "name": "Mentalidad y Enfoque"
      },
      "answers": [
        {
          "id": 6,
          "content": "poco",
          "ponderation": 1
        },
        {
          "id": 7,
          "content": "rara vez",
          "ponderation": 2
        },
        {
          "id": 8,
          "content": "algunas veces",
          "ponderation": 3
        },
        {
          "id": 9,
          "content": "Bastante",
          "ponderation": 4
        },
        {
          "id": 10,
          "content": "Demasiado",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 13,
      "title": "q3",
      "content": "Qué tan determinado/a eres para alcanzar tus metas?",
      "type": "range",
      "pillarId": 1,
      "pillar": {
        "id": 1,
        "name": "Mentalidad y Enfoque"
      },
      "answers": [
        {
          "id": 11,
          "content": "Para nada",
          "ponderation": 1
        },
        {
          "id": 12,
          "content": "Muy poco",
          "ponderation": 2
        },
        {
          "id": 13,
          "content": "Diría que algo",
          "ponderation": 3
        },
        {
          "id": 14,
          "content": "Bastante",
          "ponderation": 4
        },
        {
          "id": 15,
          "content": "Demasiado",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 14,
      "title": "q4",
      "content": "¿Qué tan paciente te consideras en general?",
      "type": "range",
      "pillarId": 2,
      "pillar": {
        "id": 2,
        "name": "Actitud y Comportamiento"
      },
      "answers": [
        {
          "id": 16,
          "content": "Para nada",
          "ponderation": 1
        },
        {
          "id": 17,
          "content": "Muy poco",
          "ponderation": 2
        },
        {
          "id": 18,
          "content": "Diría que algo",
          "ponderation": 3
        },
        {
          "id": 19,
          "content": "Bastante",
          "ponderation": 4
        },
        {
          "id": 20,
          "content": "Demasiado",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 15,
      "title": "q5",
      "content": "¿Cuánto valoras la amabilidad y el trato respetuoso hacia los demás?",
      "type": "select_single",
      "pillarId": 2,
      "pillar": {
        "id": 2,
        "name": "Actitud y Comportamiento"
      },
      "answers": [
        {
          "id": 21,
          "content": "Me preocupo más por mí",
          "ponderation": 1
        },
        {
          "id": 22,
          "content": "Hay cosas más valiosas",
          "ponderation": 3
        },
        {
          "id": 23,
          "content": "No hay nada más importante",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 16,
      "title": "q6",
      "content": "¿Qué tan equilibrado/a y justo/a crees que eres en tus decisiones?",
      "type": "select_single",
      "pillarId": 2,
      "pillar": {
        "id": 2,
        "name": "Actitud y Comportamiento"
      },
      "answers": [
        {
          "id": 24,
          "content": "Creo que siempre tengo la razón",
          "ponderation": 1
        },
        {
          "id": 25,
          "content": "Me cuesta ser justo",
          "ponderation": 3
        },
        {
          "id": 26,
          "content": "El balance es mi principio",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 17,
      "title": "q7",
      "content": "¿Cómo reaccionas a las situaciones estresantes?",
      "type": "range",
      "pillarId": 2,
      "pillar": {
        "id": 2,
        "name": "Actitud y Comportamiento"
      },
      "answers": [
        {
          "id": 27,
          "content": "Me enfado",
          "ponderation": 1
        },
        {
          "id": 28,
          "content": "Me molesto",
          "ponderation": 2
        },
        {
          "id": 29,
          "content": "Me mantengo neutral",
          "ponderation": 3
        },
        {
          "id": 30,
          "content": "Mantengo la calma",
          "ponderation": 4
        },
        {
          "id": 31,
          "content": "Me siento tranquilo y relajado",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 18,
      "title": "q8",
      "content": "¿Cómo describirías la calidad de tu sueño?",
      "type": "select_single",
      "pillarId": 3,
      "pillar": {
        "id": 3,
        "name": "Bienestar"
      },
      "answers": [
        {
          "id": 32,
          "content": "No duermo",
          "ponderation": 1
        },
        {
          "id": 33,
          "content": "Duermo terrible",
          "ponderation": 2
        },
        {
          "id": 34,
          "content": "Duermo normal",
          "ponderation": 3
        },
        {
          "id": 35,
          "content": "Duermo bien",
          "ponderation": 4
        },
        {
          "id": 36,
          "content": "Duermo muy bien",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 19,
      "title": "q9",
      "content": "¿Cuánta actividad física realizas regularmente?",
      "type": "select_single",
      "pillarId": 3,
      "pillar": {
        "id": 3,
        "name": "Bienestar"
      },
      "answers": [
        {
          "id": 37,
          "content": "No hago nada de ejercicio",
          "ponderation": 1
        },
        {
          "id": 38,
          "content": "Hago poco ejercicio",
          "ponderation": 3
        },
        {
          "id": 39,
          "content": "Hago bastante ejercicio",
          "ponderation": 4
        },
        {
          "id": 40,
          "content": "Hago mucho ejercicio",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 20,
      "title": "q10",
      "content": "¿Qué tan saludables son tus hábitos alimenticios?",
      "type": "select_single",
      "pillarId": 3,
      "pillar": {
        "id": 3,
        "name": "Bienestar"
      },
      "answers": [
        {
          "id": 41,
          "content": "Como muy poco saludable",
          "ponderation": 1
        },
        {
          "id": 42,
          "content": "Como normal",
          "ponderation": 3
        },
        {
          "id": 43,
          "content": "Como saludable",
          "ponderation": 4
        },
        {
          "id": 44,
          "content": "Como muy saludable",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 21,
      "title": "q11",
      "content": "¿Cómo te sientes con respecto a tu nivel de energía diario?",
      "type": "select_single",
      "pillarId": 3,
      "pillar": {
        "id": 3,
        "name": "Bienestar"
      },
      "answers": [
        {
          "id": 45,
          "content": "Me siento muy agotado",
          "ponderation": 1
        },
        {
          "id": 46,
          "content": "Me siento agotado",
          "ponderation": 3
        },
        {
          "id": 47,
          "content": "Me siento normal",
          "ponderation": 4
        },
        {
          "id": 48,
          "content": "Me siento con energía",
          "ponderation": 5
        }
      ]
    },
    {
      "id": 22,
      "title": "q12",
      "content": "Selecciona los temas que te interesan",
      "type": "multiple",
      "pillarId": 3,
      "pillar": {
        "id": 3,
        "name": "Bienestar"
      },
      "answers": []
    }
  ]
