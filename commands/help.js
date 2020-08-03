const Discord = require('discord.js');
module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'general',
    description: 'Help Command',
    execute(client, message, args) {
        if(args[0]) {
            const command = client.categories.get(args[0]);
            if (!command) return;
            let helpembed = new Discord.MessageEmbed()
                .setColor('fd8061')
                .setFooter('Made by Meliodaf#1900',`${client.users.cache.get('468388958599118848').avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 256
                })}`)
                .setThumbnail(`${client.user.avatarURL({"format": 'png', "dynamic": true, "size": 64})}`)
            client.categories.map((category, name) => {
                if(name === args[0]) {
                    name = name[0].toUpperCase() + name.slice(1)
                    helpembed.setTitle(`${name} Help`);
                    category.map(command => {
                    helpembed.addField(`\`${client.prefixes[message.guild.id].prefixes}${command.name}\``, `${command.description}`)
                })
                }
            }
            )
            message.channel.send(helpembed);
        }else {
            let helpembed = new Discord.MessageEmbed()
                .setColor('fd8061')
                .setFooter('Made by Meliodaf#1900',`${client.users.cache.get('468388958599118848').avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 256
                })}`)
                .setThumbnail(`${client.user.avatarURL({"format": 'png', "dynamic": true, "size": 64})}`)
                .setTitle('Bot Information');
            client.categories.map((category, name) => {
                if(name!==0)
                    name = name[0].toUpperCase() + name.slice(1)
                        helpembed.addField(`${name}`, `Shows all of the ${name} commands`)

                }
            )
            message.channel.send(helpembed);
            // for(const val of helps) {
            //     helpembed.addField(`/help ${val}`, `Shows all of the ${val} commands`)
            // }
            //
        }

    }
}