const Discord = require('discord.js');
var bot = new Discord.Client();
var prefix = (".");
const YTDL = require("ytdl-core");
const { get } = require("snekfetch"); 
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json');
const db = low(adapter);
const talkedRecently = new Set();
const cooldown = new Set();
bot.login(process.env.TOKEN)

var prefix = "*";

bot.on('ready', () =>  {
    console.log("Je suis connecté !")
     bot.user.setActivity("*play *skip *stop |")
  ;
  
  bot.on('message', message => {
    if(message.content === prefix + "play"){
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}
var servers = {};
        var argsplay = message.content.substring(prefix.length).split(" ");
            if (!argsplay[1]) {
                message.channel.send("Merci de mettre un lien à lire.");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("Tu dois être dans un salon vocal.");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(argsplay[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
                message.channel.send("Lancement de la musique")
            });
        }});
//Commande skip (musique)
bot.on('message', message => {
            if(message.content === prefix + "skip"){
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            message.channel.send("Musique skipée")
            }});
//Commande stop (musique)
bot.on('message', message => {
if(message.content === prefix + "stop"){
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.send("Musique arrêtée")
}})})
