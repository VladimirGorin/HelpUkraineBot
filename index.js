const TelegramBotApi = require('node-telegram-bot-api')

const token = '5243636381:AAHVxjGOgXjWBIj60ciKJFpORYdYYZO9F3g'

const bot = new TelegramBotApi(token, {polling: true})

// Импорт в базу данных

const users = require('./users.json')

setInterval(() => {
    require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'))
}, 8000)

bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    if(!user){
        users.push({
            id: msg.from.id,
            nick: msg.from.username,
            status: 'Пользовотель',
            geoposition: null,
            tell: null,
            payments: null

        })
        user = users.filter(x => x.id === msg.from.id)[0]
    }
})

// Клавиатуры 

const H1MarkUp = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🍏 Пункти харчування', callback_data:`punkt1`}],
            [{text: '🚗 Пункти євакуації', callback_data:`punkt3`}],
            [{text: '🛢 Заправки пального та наявність', callback_data:`punkt4`}],
            [{text: '🧑‍🏭 Складнощі чи втратив роботу?', callback_data:`punkt6`}],
            [{text: '📲 Повідомити про заправку з бензином, пункти допомоги', callback_data:`punkt7`}],
            [{text: '👨‍💻 Допомогти проекту', callback_data:`punkt8`}, {text: '📹 Замовити рекламу', callback_data:`punkt0`}],
            [{text: "🤳 Зворотний зв'язок", callback_data:`punkt9`}],
            [{text: "🎛 Адмін панель, тільки для админов", callback_data:`punkt10`}],
        ]
    })
}

const MapTegs = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🇺🇦 Київ', callback_data:`KIEV`}],
            [{text: '🇺🇦 Чернівці', callback_data:`CERNIBSI`}],
            [{text: '🇺🇦 Вінниця', callback_data:`VINNISA`}], 
            [{text: '🇺🇦 Николаев', callback_data:`NIKOLAEV`}],
            [{text: '🇺🇦 Харьков', callback_data:`HARKOV`}],
            [{text: '🇺🇦 Полтава', callback_data:`POLATOV`}],
            [{text: '🇺🇦 Черкаси', callback_data:`CHERKACI`}],
            [{text: '🇺🇦 Ужгород', callback_data:`UCHGOROD`}],
        ]
    })
}
const MapTegs2 = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Корисна інформація', callback_data:"polezn"}]
        ]
    })
}




const works = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🇵🇱 1 Робота в Польщі', callback_data:`Work_Polsha1`}],
            [{text: '📔 1 Робота, об`яви', callback_data:`Work_Object1`}],
            [{text: '🏘 Попасти в команду', callback_data:`Work_comannd`}],
        ]
    })
}


bot.setMyCommands([
    {command: 'start', description:'Информация'}
])


// Админ панель
bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    const data = msg.data
    var user = users.filter(x => x.id === msg.from.id)[0]

    if(data === 'punkt10'){
       if(user.id == '5015947677'){
           bot.sendMessage(chatId, `Привіт Бобер, ось тобі токен і початковий останній бэкап.`)
           bot.sendMessage(chatId, `Токен : ${token}`)
           bot.sendMessage(chatId, 'Файлi : https://github.com/VladimirGorin/HelpUkraineBot')
       }else{
            bot.sendMessage(chatId, 'No')
    }
    }
})



// Просто команды и консоль логи

bot.on('message', msg =>{

    const chatId = msg.chat.id
    const text = msg.text
    const nname = msg.chat.first_name
    const nnone = "##################################################"

    console.log(nname, text, chatId)

    if(text === '/start'){
        bot.sendMessage(chatId, `${nnone}`, H1MarkUp)
    }
    if(text === '/start@HelpUkrainee_bot'){
        bot.sendMessage(chatId, `${nnone}`, H1MarkUp)
    }
   
   
})

// Заказать рекламу

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    const data = msg.data


    if(data === 'punkt0'){
        bot.sendPhoto(chatId, './photo_2022-03-26_14-00-26.jpg')
        bot.sendMessage(chatId, "👍 Що б замовити рекламу перейдіть по контакту і відправте своє пропозиції по рекламі. - @Vladimir003 - @slavex_vsp")
    }
})

// Потерял работу и Пунткы эвакуации

bot.on('callback_query', msg => {
    
    const chatId = msg.message.chat.id
    const data = msg.data


     /* Телеграм зсилки */
    if(data === 'punkt3'){bot.sendMessage(chatId, `
               🇦🇺 Австрія (https://t.me/+tAwXOJkWgMwzZTNi) 
🇧🇪 Бельгія (https://t.me/+L2TZvDXcPmdmMThi) 
🇧🇬 Болгарія (https://t.me/+euRYB30fwQk0NDIy) 
🇬🇷 Греція (https://t.me/+b8xeaB3G8W4yYjky) 
🇩🇰 Данія (https://t.me/+LH_HP0mQCp05ZTEy) 
🇪🇪 Естонія (https://t.me/+CsTdKchqwFI2ZWNi) 
🇮🇪 Ірландія  (https://t.me/+wqM9egL5WSpmNjQy)
🇪🇸 Іспанія (https://t.me/+lRg-HEPoPp8wNTAy) 
🇮🇹 Італія (https://t.me/+7fx9P2FtX-VjOWFi) 
🇨🇾 Кіпр (https://t.me/+lnKk4VgjHmo4NzQ6) 
🇱🇻 Латвія (https://t.me/+GiljzrJtsKQ5ZmUy) 
🇱🇹 Литва (https://t.me/+6zFlgU4dnHYxZmQy) 
🇱🇺 Люксембург (https://t.me/+hQA2sqYfWp83ODUy) 
🇲🇹 Мальта (https://t.me/+WecSnGvzzdJlYzYy) 
🇳🇱 Нідерланди (https://t.me/+a09j4NrjyLw1ODEy) 
🇩🇪 Німеччина (https://t.me/+npogXxxIu71iNWMy) 
🇵🇱 Польща (https://t.me/+WYFxZVLvxZ1jZjNi) 
🇵🇹 Португалія (https://t.me/+qpye1TTiaHk2ZWI6) 
🇷🇴 Румунія (https://t.me/+lDnOHizC70NmYmQy) 
🇸🇰 Словаччина (https://t.me/+cgDnbt1JYggyMzgy) 
🇸🇮 Словенія  (https://t.me/+hGlNO9J2mQs5Y2Fi)
🇭🇺 Угорщина (https://t.me/+urd9_9LOzjxkYzMy) 
🇫🇮 Фінляндія (https://t.me/+SwJWbIZzxJVhYjEy) 
🇫🇷 Франція (https://t.me/+-Jcz2EwD55c2ZWVi) 
🇭🇷 Хорватія (https://t.me/+c8KXhy7hvipiYjcy) 
🇨🇿 Чехія (https://t.me/+LdVryBWtNPkxNzQ6) 
🇸🇪 Швеція (https/t.me/+rIMNGwh9ZSJjZjUy)
            `, MapTegs2)
            bot.sendMessage(chatId, `☎️ Повідомити про пункт житла/євакуації: назва та адреса. Контакт для передачі ${nameVal} ${telVal}`)
        }

    if(data === 'polezn')
        {bot.sendMessage(chatId, `
Ресурс ICANHELP допоможе українським біженцям у пошуку притулку та житла у Європі та по всьому світу.
https://icanhelp.host,

Польща
Куди звертатися у Польщі, якщо не маєте житла - 24 Канал
Джерело: <https://www.google.com/search?q=%D0%B2%D1%96%D0%B9%D0%BD%D0%B0+%D0%BF%D1%83%D0%BD%D0%BA%D1%82%D0%B8+%D0%B6%D0%B8%D1%82%D0%BB%D0%B0+OR+%D1%94%D0%B2%D0%B0%D0%BA%D1%83%D0%B0%D1%86%D1%96%D1%97&lr=&safe=images&hl=ru&as_qdr=all&ei=zGg7Yv_UO4P_kwXd6oXgBw&start=10&sa=N&ved=2ahUKEwj_6oaf8Nz2AhWD_6QKHV11AXwQ8tMDegQIARA7&biw=1280&bih=595&dpr=1.5> 

Допомога українцям у Польщі: житло, проїзд, волонтерство
Джерело: <https://www.google.com/search?q=%D0%B2%D1%96%D0%B9%D0%BD%D0%B0+%D0%BF%D1%83%D0%BD%D0%BA%D1%82%D0%B8+%D0%B6%D0%B8%D1%82%D0%BB%D0%B0+OR+%D1%94%D0%B2%D0%B0%D0%BA%D1%83%D0%B0%D1%86%D1%96%D1%97&lr=&safe=images&hl=ru&as_qdr=all&ei=7mg7YoXeFbLmsAeM16S4AQ&start=20&sa=N&ved=2ahUKEwiFjfyu8Nz2AhUyM-wKHYwrCRc4ChDw0wN6BAgBEE0&biw=1280&bih=595&dpr=1.5> 

Які країни приймають біженців з України
Джерело: <https://www.google.com/search?q=%D0%B2%D1%96%D0%B9%D0%BD%D0%B0+%D0%BF%D1%83%D0%BD%D0%BA%D1%82%D0%B8+%D0%B6%D0%B8%D1%82%D0%BB%D0%B0+OR+%D1%94%D0%B2%D0%B0%D0%BA%D1%83%D0%B0%D1%86%D1%96%D1%97&lr=&safe=images&hl=ru&as_qdr=all&ei=nGk7YtqmEdj-sAf8wpzQDA&start=40&sa=N&ved=2ahUKEwja5POB8dz2AhVYP-wKHXwhB8o4HhDw0wN6BAgBEE0&biw=1280&bih=595&dpr=1.5

Украина откроет новые консульские пункты в Польше
Подробнее: https://in-poland.com/ukraina-otkroet-novye-konsulskie-punkty-v-polshe/

Хто потребує допомоги після перетину кордону з Польщею, Християнський транзитний центр у Хелмі повідомляє, що приймає усіх біженців з України, які потребують відпочинку, харчування, проживання та підготовки до подальших подорожей. У будівлі церкви можна провести 1-2 дні. Хелм розташований за 25 км від переправи Ягодин-Дорогуськ.
Адреса: вул. Ogrodowa 56, 22-100 Chełm - Християнська баптистська церква в Хелмі, пастор Генрик Скшипковський.
+48880286195 або +375297939777 Вiталiй Сус

Франція

Беженцы во Франции в 2022 году: как живут и принимают мигрантов
https://visasam.ru/emigration/europe-emigration/bezhency-vo-francii.html

Надішліть речі рідним, які евакуювалися за кордон, зі знижкою 70%!  
Для цього Укрпошта запустила нову послугу — «Посилка з домівки» (gift) 
Знижка діє на доставку в Польщу, Румунію, Словаччину, Молдову та Угорщину. 
Запитуйте про послугу у відділеннях або ж оформлюйте міжнародну посилку зі знижкою в онлайн-сервісах Укрпошти.

В Україні відкриваються 12 гуманітарних коридорів
Джерело: <https://www.google.com/search?q=%D0%B2%D1%96%D0%B9%D0%BD%D0%B0+%D0%BF%D1%83%D0%BD%D0%BA%D1%82%D0%B8+%D0%B6%D0%B8%D1%82%D0%BB%D0%B0+OR+%D1%94%D0%B2%D0%B0%D0%BA%D1%83%D0%B0%D1%86%D1%96%D1%97&lr=&safe=images&hl=ru&as_qdr=all&ei=tWk7YovMFpHxsAfnpYCgDw&start=50&sa=N&ved=2ahUKEwjL-u6N8dz2AhWROOwKHecSAPQ4KBDw0wN6BAgBEE0&biw=1280&bih=595&dpr=1.5> 
    `)}         

    if(data === 'punkt6'){bot.sendMessage(chatId, 'Вибери вакансію для себе', works)
    bot.sendMessage(chatId, `☎️ ПовІдомити про вакансію: контакти Знаєшь де приймають на роботу? де є вакансії? повідомь ${nameVal} ${telVal}`)}

    if(data === 'punkt6'){bot.sendMessage(chatId, 'ПовІдомити про вакансію: контакти (@slavex_vsp / +380 98 469 27 63)')}

    if(data === 'Work_Object1'){ bot.sendMessage(chatId, 'Робота, об`яви - https://t.me/work_vakansii')}

    if(data === 'Work_Polsha1'){
        bot.sendMessage(chatId, `
Робота в Польщі 1
📍м. Познань
Чоловіки 18-60 років

⭕️ 1 вакансія: Потрібні спеціалісти на внутрішні роботи. 
💵 Заробітна плата від об‘ємів зробленої роботи.

⭕️ 2 вакансія: Арматурщики, опалубщики, монолітщики, різноробочі. 
💵 Заробітна плата:
▪️різноробочі - 19зл/год
▪️спеціалісти - від 21зл/год
🏠 Житло надається!

☎️ Тел.: +48 507 686 952 - Андрій

Робота в Польщі 2

Работники на уборку в больницу 
Место работы: Краков (Osiedle na Skarpie) ВЫХОД 01/04/22
Трудовой договор: Умова злецения (Umowa zlecenia)
ОБЯЗАННОСТИ:
Работа в госпитале , уборка с профессиональными химикатами и дезинфицирующими средствами в соответствии с действующим в учреждениях планом гигиены. В том числе уборка в ковидных отделах!
Необходимо делать прививку
 от Гепатит А у кого ее нет, ( стоимость 70 злотых)
ВРЕДНЫЕ ФАКТОРЫ: НЕТ
УСЛОВИЯ:
Ставка: 14,7 зл/час netto
График плавающий : 8-12 часов в день, 6-7 дней в неделю, дневная смена с 07:00  до 15:00 либо 19:00, ночные смены с 00:00 до 07:00  
Примерное количество часов: 250 - 280
Примерная зароботная плата за месяц: 3500 - 4500
*Для лиц младше 26 лет +1 злотый к заработной плате за час
За своё жильё + 1 злотый за каждый отработанный час
Жильё: предоставляется работодателем (300 зл. в мес. снимается за коммунальные услуги)
Рабочая одежда предоставляется
Медкомиссия перед работой
БОНУСЫ - ВОЗВРАЩАЕМ ОПЛАТУ ЗА :
Жильё ( отработаны 250 часов 50%; отработаны 280 часов-100%.Со своим жильем 1 злотый за один отработанный час)
ТРЕБОВАНИЯ:
Желательно коммуникативный польский
Возраст 20-50 лет
Виза или биометрия от 1 мес.
ДОПОЛНИТЕЛЬНО:
Зарплата раз в месяц в границах с 15 по 20 числах
Есть возможность брать авансы
Есть возможность подачи на карту побыта и получения воевудского приглашения.
Обращаться по номеру
+48788777374 вайбер
+380976537768 вайбер
RBK

Робота в Польщі 3

        *РАБОТНИК НА ПРОИЗВОДСТВО БЕТОННЫХ КОНСТРУКЦИЙ
Место работы - город Лодзь
Оформление в городе Лодзь
Мужчины до 50 лет*
Ставка 16,50 zł/час netto.
Рабочих часов в месяц 200. Нет ночных смен.
Ежемесячная стоимость проживания 450 злотых
Задачи:
• Сборка форм под заливку бетона
• Помощь при заливке бетона в формы 
• Обработка готовых конструкций шлифовальной машинкой
• Поддержание порядка в цеху
Условия работы и жилья:
• Ставка 16,50 zł/час netto, для студентов - 21,50 zł/час netto
• График работы - Пн-пт. от 8 до 12 часов. Бывают рабочие субботы
Смены по загруженности производства в интервале с 7:00 до 20:00
Средняя наработка в месяц - 200 часов.
Квартира, 3-4 человека в комнате.
Просьба брать своё постельное бельё
• Жильё находится в 30 минутах езды на трамвае
• Работа в основном на улице
• Рабочая одежда выдается бесплатно.
Требования:
• Хороша физическая форма
• Умение работать в команде
• Можно без опыта и знания языка    
Обращаться по номеру +48788777374 вайбер +380976537768 вайбер Gr.P.
        `)}

        if(data === 'Work_comannd'){
            bot.sendMessage(chatId, 'В разработке....')
        }


    
})


// Отдел доставки еды

bot.on('callback_query', msg => {
    
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === 'punkt1'){
        bot.sendMessage(chatId, 'Знайдіть пункти живлення в своєму місті.', MapTegs)
    }
    if(data == 'KIEV'){
        bot.sendMessage(chatId, `
        🇺🇦 Київ
        --------------------------------
        Пряма доставка їди (Безкоштовно).
    
            097-309-11-11 - Їжа.  
        --------------------------------
        Підприємці Києва:

            066 814 18 23 - центр
            067 991 06 31 - лівий берег
            063 347 24 16 - правий берег
        --------------------------------

        0938032030 - правий беріг

        0508092452 - Марк, доставка/самовивіз правий беріг

        --------------------------------
Спасо-Преображенський собор
3a, Marshala Koneva Str. Киев, Украина 03191
продукти харчування, одяг, засоби гігієни, дитячі підгузники, обігрів біженців, тощо
`)}

    if(data === 'CERNIBSI'){
        bot.sendMessage(chatId, `
        🇺🇦 ЧЕРНІВЦІ
        --------------------------------
        Соборна площа
        Перехрестя проспекту Незалежності 
             та вул. Небесної Сотні (навпроти ТЦ «Формаркет»)
        
        Синельниково
        Волонтерський центр продовжив свою роботу. Зібрані 
              продукти, теплі речі, засоби гігієни передали на міські
                    пункти харчування військових та біженців
        --------------------------------

    `)}

    if(data === 'VINNISA'){
        bot.sendMessage(chatId, `
        🇺🇦 ВИННИЦА
        --------------------------------
        Намети поблизу залізничного вокзалу - цілодобове чергування та  
            обігрів, поблизу наметів організовані пункти харчування.
        --------------------------------

    `)}

    if(data === 'NIKOLAEV'){
        bot.sendMessage(chatId, `
        🇺🇦 Николаев
        --------------------------------
        Заводский район:
        ул. Кузнецкая, 1, тел. 47-71-22;
        Ингульский район:
        ул. 12 Продольная, 50-А, тел. 21-20-48;
        Корабельный район:
        ул. Металлургов, 8, тел. 64-59-98;
        Центральный район:
        ул. Шевченко, 19-А, тел. 47-59-93.
        --------------------------------

        `)
    }
    if(data === 'HARKOV'){
        bot.sendMessage(chatId, `
        🇺🇦 Харьков
        --------------------------------   
        https://glavnoe.ua/news/n357081855-punkty-vydachi-gumanitarnoj-pomoschi-rabotajut-v-35-pochtovyh-otdelenijah-harkova
        
        Адреса пунктов выдачи гуманитарной помощи в сети 
        
        «Новая почта»: 
         пр. Людвига Свободы, 35; 
         ул. Ахсарова, 21;
         пер. Пискуновский, 4; 
         пр. Гагарина, 54-а, 176, 199; 
         ул. Амосова, 11; 
         проезд Стадионный, 13; 
         пр. Героев Сталинграда, 169/24; ул. Луи Пастера, 318;
         ул. Ньютона, 98;
         пр. Льва Ландау, 46;
         пр. Архитектора Алешина, 5;
         пр. Индустриальный, 24/31;
         ул. Шевченко, 24-а;
         ул. Пушкинская, 96.
        
        Адреса пунктов выдачи гуманитарной помощи в сети 
        
        «Укрпочта»:
         ул. Деревянко, 50; 
         ул. Беркоса, 26; 
         ул. Академиков Ахиезеров, 16/50; 
         ул. Петра Болбочана, 3, 46;
         ул. Холодногорская, 7;
         ул. Китаенко, 4;
         пр. Льва Ландау, 20;
         ул. Академика Проскуры, 9-б;
         ул. Шевченко, 224;
         ул. Гвардейцев-Широнинцев, 41;
         ул. Валентиновская, 31;
         пр. Юбилейный, 49-а, 57/106;
         ул. Краснодарская, 181;
         ул. Амосова, 5;
         пр. Александровский, 113;
         ул. Рыбалка, 40;
         пр. Московский, 259.
        --------------------------------

        `)
    }
    if(data === 'POLATOV'){
        bot.sendMessage(chatId, `
        🇺🇦 Полтава
        --------------------------------
        Пункти видачі речей, ліків, адреси надання медичної допомоги та харчування 
        
        https://poltavawave.com.ua/p/de-v-poltavi-mozhut-otrimati-dopomogu-vimusheni-bizhentsi-617273?fbclid=IwAR0guw_hAuN2laW_VSc_rRWf05go8ahMtF5fVb9gp4FOcPPv-eEFL17g2nE
        --------------------------------

        `)
    }
    if(data === 'CHERKACI'){
        bot.sendMessage(chatId, `
        🇺🇦 Черкаси
        --------------------------------

         Пункти прийому переселенців створені церквою «Перемога» м. Черкаси
        --------------------------------

        `)
    }
    if(data === 'UCHGOROD'){
        bot.sendMessage(chatId, `
        🇺🇦 Ужгород
        --------------------------------

        Безкоштовний пункт прийому переселенців 
        --------------------------------

        `)
    }
})

// Контакты для связи

nameVal = '@slavex_vsp'
telVal = '+380 98 469 27 63'


// Отдел Заправка

bot.on("callback_query", msg => {



    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === 'punkt4'){
        bot.sendMessage(chatId, `
🛢
ОККО карта заправок (наявність/види палива):
------------------------------------------
https://www.okko.ua/ru/fuel-map
        `)
        bot.sendMessage(chatId, `☎️ Бачишь наявність палива на заправці? повідомь: адреса, вид палива, опис (опціонально). Контакт для передач ${nameVal} ${telVal}`)
    }
})

// Помочь проекту

bot.on("callback_query", msg => {

    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === 'punkt8'){
        bot.sendMessage(chatId, `
--------------------------------
💷💳💷💳💷💳💷💳💷💳💷💳💷

Допомогти проекту можна перерахувавши кошти на картку:
4149 5110 4034 5241

    
        `)
    }
})


// Обратная связь

bot.on("callback_query", msg => {

    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === 'punkt9'){
        bot.sendMessage(chatId, `
        ☎️ Що б отримати зворотний зв'язок переходь пиши в даний чат - ${nameVal} ${telVal} 
        `)
        bot.sendPhoto(chatId, 'https://malsosh.minobr63.ru/wp-content/uploads/2020/05/3GRITi0n3bI.jpg')
    }
})