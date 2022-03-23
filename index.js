const TelegramBotApi = require('node-telegram-bot-api')

const token = '...'

const bot = new TelegramBotApi(token, {polling: true})
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


const H1MarkUp = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🍏 Пункти харчування', callback_data:`punkt1`}],
            [{text: '🚑 Пункти товарів першої допомоги та табак', callback_data:`punkt2`}],
            [{text: '🚗 Пункти євакуації', callback_data:`punkt3`}],
            [{text: '🛢 Заправки пального та наявність', callback_data:`punkt4`}],
            [{text: '📔 Справочна інформація', callback_data:`punkt5`}],
            [{text: '🧑‍🏭 Втратив роботу - заробляй гроші', callback_data:`punkt6`}],
            [{text: '📲 Повідомити про заправку з бензином, пункти допомоги', callback_data:`punkt7`}],
            [{text: '👨‍💻 Допомогти проекту', callback_data:`punkt8`}],
        ]
    })
}

const MapTegs = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🇺🇦 Київ', callback_data:`KIEV`}],
            [{text: '🇺🇦 ЧЕРНІВЦІ', callback_data:`CERNIBSI`}],
            [{text: '🇺🇦 ВИННИЦА', callback_data:`VINNISA`}], 
            [{text: '🇺🇦 Николаев', callback_data:`NIKOLAEV`}],
            [{text: '🇺🇦 Харьков', callback_data:`HARKOV`}],
            [{text: '🇺🇦 Полтава', callback_data:`POLATOV`}],
            [{text: '🇺🇦 Черкаси', callback_data:`CHERKACI`}],
            [{text: '🇺🇦 Ужгород', callback_data:`UCHGOROD`}],
        ]
    })
}

const YesOrNo = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Так', callback_data:`Yes`}, {text: 'Нет', callback_data:`no`}]
        ]
    })
}


bot.setMyCommands([
    {command: 'start', description:'Информация'}
])




bot.on('message', msg =>{

    
    const chatId = msg.chat.id
    const text = msg.text
    const nname = msg.chat.first_name

    console.log(nname, text, chatId)

    
    if(text === '/start'){
        bot.sendMessage(chatId, '❗️ Привіт, цей бот допоможе тобі у військовий час. Вибирай інструкцію.', H1MarkUp)

    }
    

})


bot.on('callback_query', msg => {
    
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === 'punkt6'){
        bot.sendMessage(chatId, 'якщо є проблема з доходом, зп, тощо, які є ідеї, стартапи? є обладнання, сервери, інтернет, можнпа реалізувати', YesOrNo)
    }
    
})


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

    `)
    

    }

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

        `)
    }

    if(data === 'VINNISA'){
        bot.sendMessage(chatId, `
        🇺🇦 ВИННИЦА
        --------------------------------
        Намети поблизу залізничного вокзалу - цілодобове чергування та  
            обігрів, поблизу наметів організовані пункти харчування.
        --------------------------------

        `)
    }
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

