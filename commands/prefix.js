const Discord = require('discord.js');
const fs = require('fs')
module.exports = {
    name: 'prefix',
    description: 'Sets the bots prefix on your server',
    category: 'setup',
    execute(client, message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Only Administrators can use this command!');

        client.prefixes[message.guild.id] = {
            prefixes: args[0]
        };
        fs.writeFile("./prefixes.json", JSON.stringify(client.prefixes,null,4),err=>{
            if(err) throw err;
        })
        message.channel.send(`Prefix changed to \`${args[0]}\``)
    }
    }