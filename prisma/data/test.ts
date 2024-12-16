export async function mockTests() {
  return [{
    id: 1,
    title: 'История Древнего Рима',
    source: 'Исторические источники и учебники по древнеримской истории',
    seed: '123456789',
    questions: [
      {
        text: 'Кто был основателем Рима по легенде?',
        typeAnswer: 'single',
        answers: [
          {
            value: 'Ромул',
            isCorrect: true,
          },
          {
            value: 'Рем',
            isCorrect: false,
          },
          {
            value: 'Зевс',
            isCorrect: false,
          },
          {
            value: 'Аполлон',
            isCorrect: false,
          },
        ],
      },
      {
        text: 'Какой период в истории Рима называют "Республиканским"?',
        typeAnswer: 'single',
        answers: [
          {
            value: '753 г. до н.э. - 509 г. до н.э.',
            isCorrect: false,
          },
          {
            value: '509 г. до н.э. - 27 г. до н.э.',
            isCorrect: true,
          },
          {
            value: '27 г. до н.э. - 476 г. н.э.',
            isCorrect: false,
          },
          {
            value: '476 г. н.э. - 1453 г. н.э.',
            isCorrect: false,
          },
        ],
      },
      {
        text: 'Какие из следующих архитектурных сооружений были построены в Древнем Риме?',
        typeAnswer: 'single',
        answers: [
          {
            value: 'Статуя свободы',
            isCorrect: false,
          },
          {
            value: 'Парфенон',
            isCorrect: false,
          },
          {
            value: 'Римский форум',
            isCorrect: true,
          },
          {
            value: 'Висячие сады Семирамиды',
            isCorrect: false,
          },
        ],
      },
      {
        text: 'Какой из этих законов был принят в Древнем Риме для защиты прав рабов?',
        typeAnswer: 'single',
        answers: [
          {
            value: 'Закон двенадцати таблиц',
            isCorrect: false,
          },
          {
            value: 'Закон Валерия и Публилия',
            isCorrect: true,
          },
          {
            value: 'Закон Юлия',
            isCorrect: false,
          },
          {
            value: 'Закон Траяна',
            isCorrect: false,
          },
        ],
      },
      {
        text: 'Какой из этих императоров был известен как "император-философ"?',
        typeAnswer: 'single',
        answers: [
          {
            value: 'Марк Аврелий',
            isCorrect: true,
          },
          {
            value: 'Юлий Цезарь',
            isCorrect: false,
          },
          {
            value: 'Август',
            isCorrect: false,
          },
          {
            value: 'Коммод',
            isCorrect: false,
          },
        ],
      },
    ],
    counts: 5,
  },
  ]
}
