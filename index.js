const TelegramBotApi = require('node-telegram-bot-api')

const token = '5231070388:AAGp8-9KDTpgGTeyE4pkimAkdOVCQQ-gsvM'

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


    
})
