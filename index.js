const TeleBot = require("telebot");
const constants = require("./constants");
//instantiate Telebot with our token got in the BtFather
const bot = new TeleBot({
  token: constants.TOKEN,
});

//our command
bot.on(["/start"], (msg) => {
  //all the information about user will come with the msg
  let replyMarkup = bot.inlineKeyboard([
    [
        bot.inlineButton('Ver sus servicios', {callback: '/services'}),
        bot.inlineButton('Conocer más acerca de Gravity', {callback: '/about'})
    ], [
        bot.inlineButton('Visitar la web', {url: 'https://gravity.es'})
    ]
]);
  bot.sendMessage(msg.from.id, `¡Hola! ${msg.chat.username}, bienvenido a Gravity.`, {replyMarkup});
});

bot.on(["/services"], (msg) => {
    bot.sendMessage(msg.from.id, `
        Creamos tu sistema o app web usando lo último en tecnología cloud con las mejores prácticas de desarrollo para asegurar la calidad del producto y del código que lo maqueta.

        Gestionamos tu migración a una arquitectura actualizada, así que puedes estar tranquilo, cuenta con nosotros para derrumbar tu monolito.

        Te asesoramos en cuanto a tecnologías, frameworks, tiempos de desarrollo y arquitecturas para asegurar la solución más rápida, económica y eficiente para tu proyecto.
        
        Si quieres contactar con nosotros, no dudes en escribirnos directamente =)
    `)
})

bot.on(["/about"], (msg) => {
    bot.sendMessage(msg.from.id, `
        Somos una empresa llena de gente friki con múltiples y distintos desórdenes de personalidad.

        Nos caracteriza un bajo nivel de fallo y una alta tolerancia al cliente.

        Tenemos la certeza de que la calidad gira en torno a nosotros, por eso nos llamamos Gravity.

        Para leer la descripción seria, visita nuestra web...
    `)
})

bot.on('callbackQuery', msg => {
    // User message alert
    bot.event(msg.data, msg);
});

//start polling
bot.start();