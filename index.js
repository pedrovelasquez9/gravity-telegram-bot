const TeleBot = require("telebot");
const constants = require("./constants");
//instantiate Telebot with our token got in the BtFather
const bot = new TeleBot({
  token: constants.TOKEN,
});

DEFAULT_MESSAGE = `📢 Disculpa, no he entendido tu pregunta, puedes escribir "servicios" para conocer nuestros servicios o puedes ver las opciones disponibles escribiendo /ayuda`;

const DEFAULT_COMMANDS = [
    "/start",
    "/hola",
    "/services",
    "/about",
    "/info",
    "/help",
    "/ayuda"
]

const GREETINGS_KEYWORKDS = [
    "hola",
    "cómo estás?",
    "como estas",
    "dime algo",
    "di algo",
    "buenas tardes",
    "buenos dias",
    "buenas noches",
    "buenos días",
    "buenas",
    "hello",
    "start"
]

const SERVICES_KEYWORKDS = [
    "servicios",
    "services",
    "servicio"
]

//our command
bot.on(["/start", "/hola"], (msg) => {
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

bot.on(["/about", "/info"], (msg) => {
    bot.sendMessage(msg.from.id, `
        Somos una empresa llena de gente friki con múltiples y distintos desórdenes de personalidad.

        Nos caracteriza un bajo nivel de fallo y una alta tolerancia al cliente.

        Tenemos la certeza de que la calidad gira en torno a nosotros, por eso nos llamamos Gravity.

        Para leer la descripción seria, visita nuestra web...
    `)
})

bot.on(["/help", "/ayuda"], (msg) => {
    bot.sendMessage(msg.from.id, `
        Comandos disponibles:
        /hola
        /servicios
        /ayuda,
        /info
    `)
})

bot.on('callbackQuery', msg => {
    // User message alert
    bot.event(msg.data, msg);
});

// Mod every text message
bot.mod('text', data => {
    let textArray = data.message.text.split(" ");
    let askForServices = textArray.map(function(word) { 
        return SERVICES_KEYWORKDS.indexOf(word.toLowerCase()) !== -1 ; 
    })
    let greetings = textArray.map((word) => {
        return GREETINGS_KEYWORKDS.indexOf(word.toLowerCase()) !== -1 ; 
    })

    if(data){
        if(DEFAULT_COMMANDS.indexOf(data.message.text) !== -1){
            bot.event(data.message.text, data.message);
        }else if(askForServices){
            bot.event("/services", data.message);
        }else if(greetings){
            bot.event("/hola", data.message);
        }else{
            console.log("entra")
            console.log(data.message.from)
            bot.sendMessage(data.message.from.id, DEFAULT_MESSAGE)
        }
    }
});

//start polling
bot.start();