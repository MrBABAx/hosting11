const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});
const Discord = require('discord.js');
const db = require("quick.db");
const ms  = require('ms')
const fs = require('fs');
const client = new Discord.Client();
const quickuptime = require('quickuptime')
let data = {
httpclient: "node-fetch"
}
client.on("ready", async() => {
  await Client.uniquestartall(true)
        console.log(`I 'm online!`)
});

const Client = new quickuptime.Client(data)
const prefix = "-";

    client.on('message', async message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
      
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(command ==="uphelp") return message.channel.send(new Discord.MessageEmbed()
    .setColor('#056608')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle('uptime commands:')
    .setDescription(`${prefix}uptime (url) : to add a link to uptime database. \n ${prefix}my-urls : to get all the links added by you. \n${prefix}remove (url) : to remove a link was added by you.`)
    .addField('admins commands:', `${prefix}all-urls: to get all urls in the database\n ${prefix}clear-all : delete all urls in the database.`)
    )
    if(command ==="uptime") {
      let added = args[0]
      if(!added.startsWith("https://")) return message.channel.send(`please provide a valid link!`)
      Client.uniqueaddurl(added, message.author.id)
      await Client.uptime(added, "30s", true)
      message.channel.send(new Discord.MessageEmbed()
    .setColor('#056608')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription('link added to our database!.'))
    }
    if(command === "my-urls") {
      message.channel.send('check your dm.')
       message.author.send(new Discord.MessageEmbed()
    .setColor('#056608')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle('this is all your links:')
    .setDescription(Client.uniqueallurls(message.author.id)|| "no urls by you!")
    )
    }
    if(command === "remove") {
      let removed = args[0]
      Client.uniqueremoveurl(removed, message.author.id) 
      message.channel.send(new Discord.MessageEmbed()
    .setColor('#850101')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription('link removed from the database!'))
    }
    if(command === "all-urls") {
      if(!message.member.hasPermission('MANAGE_GUILD')) return 
      message.channel.send(new Discord.MessageEmbed()
    .setColor('#850101')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(Client.alluniqueurls()|| "no links!"))
    }
    if(command === 'clear-all') {
      if(!message.member.hasPermission('MANAGE_GUILD')) return;
      message.channel.send('cleanned all the links!')
      Client.uniqueclear(message.author.id)
    }
    })


client.login(process.env.token);