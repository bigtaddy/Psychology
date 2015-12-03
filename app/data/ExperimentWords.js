(function (global,ng) {

    var defaultExperimentWords  = {
        1: [
            ['Пила', 'Рыба', 'Кофе', 'Мебель', 'Закат', 'Кровь', 'Море', 'Конь', 'Шило', 'Зола', 'Сахар', 'Топор', 'Краска', 'Дело', 'Филин', 'Цифра'],
            ["Мыло", "Ветер", "Баркас", "Фикус", "Масло", "Улица", "Мышка", "Река", "Ствол", "Мясо", "Картон", "Рынок", "Сани", "Буря", "Свекла", "Судья"],
            ["Живот", "Марка", "Рулет", "Нора", "Лицо", "Голос", "Рама", "Атом", "Бедро", "Вопль", "Жаба", "Зона", "Икра", "Карта", "Луза", "Мера"],
            ["Ярмо", "Юнга", "Шило", "Хобот", "Стол", "Лицо", "Ветер", "Банда", "Корпус", "Линза", "Мята", "Урок", "Щука", "Арбуз", "Сокол", "Гиря"]
        ],
        2: [
            ["Юнга", "Яма", "Мерка", "Нога", "Говор", "Гриб", "Лист", "Орден", "Пытка", "Пятно", "Шакал", "Вата", "Губка", "Сахар", "Фикус", "Сито"],
            ["Пена", "Орден", "Ирис", "Карта", "Шило", "Щека", "Сера", "Утро", "Битва", "Висок", "Хобот", "Река", "Кофе", "Ручка", "Масло", "Буран"],
            ["Шанс", "Круг", "Пятно", "Ветка", "Вкус", "Море", "Зона", "Орден", "Жертва", "Накал", "Банка", "Улица", "Пиво", "Горе", "Конус", "Рынок"],
            ["Юрта", "Мята", "Норка", "Пятка", "Сонет", "Флаг", "Урок", "Щека", "Локон", "Липа", "Фильтр", "Атом", "Шило", "Луна", "Шепот", "Мина"]
        ],
        3: [
            ["Замок", "Тело", "Юнга", "Мята", "Лето", "Орган", "Бензин", "Волк", "Грибок", "Зерно", "Кожа", "Мода", "Лист", "Вокзал", "Парус", "Щетка"],
            ["Зебра", "Линза", "Жест", "Запах", "Пила", "Рыба", "Сатин", "Мечта", "Страх", "Буран", "Шорох", "Счет", "Заяц", "Мясо", "Жертва", "Лыжи"],
            ["Лодка", "Крыло", "Аист", "Душа", "Топор", "Рельс", "Картуз", "Шляпа", "Штопор", "Брюки", "Гайка", "Гильза", "Группа", "Волос", "Мера", "Орган"],
            ["Лира", "Мечта", "Закат", "Жена", "Горе", "Право", "Пенал", "Крыша", "Жабо", "Ангел", "Алмаз", "Ветка", "Мороз", "Холод", "Лето", "Заря"]
        ],
        4: [
            ["Голос", "Скирда", "Весна", "Терка", "Заказ", "Пчела", "Молот", "Парта", "Майка", "Месяц", "Язык", "Локон", "Юла", "Муха", "Кошка", "Печать"],
            ["Шнур", "Небо", "Круг", "Пенал", "Арка", "Вина", "Ворот", "Беда", "Гараж", "Доска", "Десна", "Драка", "Жила", "Закон", "Буря", "Боров"],
            ["Печать", "Антей", "Диван", "Ковер", "Лепет", "Локоть", "Палец", "Батон", "Капот", "Мираж", "Мечта", "Гроза", "Волна", "Штора", "Шторм", "Грот"],
            ["Пачка", "Рама", "Осень", "Водка", "Стена", "Стекло", "Трепет", "Конус", "Жиклер", "Зерно", "Небо", "Мечта", "Серп", "Море", "Мороз", "Грабли"]
        ],
        5: [
            ["Парта", "Рыбак", "Крыша", "Мангал", "Микроб", "Нарыв", "Шторка", "Щенок", "Ангар", "Артист", "Книга", "Сцена", "Парад", "Фитиль", "Халат", "Юмор"],
            ["Мячик", "Шарик", "Стакан", "Вода", "Воля", "Гимн", "Дебри", "Дуга", "Опыт", "Зрачок", "Пуля", "Тина", "Картон", "Шпага", "Шпала", "Часы"],
            ["Пена", "Вода", "Кино", "Горб", "Закон", "Рынок", "Орел", "Кошка", "Шкаф", "Кружок", "Образ", "Пекарь", "Пикап", "Месяц", "Лето", "Урок"],
            ["Аркан", "Вираж", "Белок", "Грабли", "Мерка", "Металл", "Зелье", "Жетон", "Икона", "Рейс", "Пилка", "Дротик", "Диск", "Рукав", "Кратер", "Шаман"]
        ]
    };

    global.DefaultExperimentWords = defaultExperimentWords;
})(window, angular);