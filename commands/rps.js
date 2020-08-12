const Discord = require('discord.js');

let a = -2;
let b = -1;
let confirm1 = null;
let confirm2 = null;
let victor = -1;
module.exports = {
	name: 'rps',
	description: 'A Classic Rock Paper Scissors Game',
    usage: 'server',
    category: 'minigames',

    execute: async function (client, message, args) {
        let hentai = message.mentions.users.first()||null;
	    let winner = message.author
        if (args[0] === 'challenge') {
            const Channel = client.channels.cache.get(`${message.channel.id}`);
            // if(message.author === hentai)
            //     return message.channel.send('Sorry, you cannot challenge yourself')
            if (!message.mentions.users.first())
                return message.reply('you need to mention a user for that!');
            const embed = new Discord.MessageEmbed()
            embed.setTitle(`${hentai.tag} do you accept?`)
            embed.setThumbnail(`${client.user.avatarURL({"format": 'png', "dynamic": true, "size": 64})}`)
            embed.setDescription('Rock Paper Scissors Battle')
            embed.setColor('fd8061')
            embed.setFooter(`Challenged by ${message.author.tag}`, `${message.author.avatarURL({
                format: 'png',
                dynamic: true,
                size: 256
            })}`);
            const sentMessage = await message.channel.send(embed);
            await sentMessage.react('738405760064684053')
            await sentMessage.react('738405785897271366')
            sentMessage.awaitReactions((reaction, user) => user.id === hentai.id && (reaction.emoji.id === '738405760064684053' || reaction.emoji.id === '738405785897271366'),
                {max: 1, time: 30000}).then(collected => {
                if (collected.first().emoji.id === '738405760064684053') {
                    embed.setTitle('Challenge Approved - I have sent a dm')
                    sentMessage.edit(embed);
                    setTimeout(function () {
                        let embeds = new Discord.MessageEmbed()
                        embeds.setTitle('Waiting...')
                        embeds.addField(`${message.author.username}: ${client.emojis.cache.get(`738672865280393259`)}`, 'Waiting...')
                        embeds.addField(`${hentai.username}: ${client.emojis.cache.get(`738672865280393259`)}`, 'Waiting...')
                        embeds.setColor('fd8061')
                        embeds.setFooter(`Made by Meliodaf#1900`, `${client.users.cache.get('468388958599118848').avatarURL({
                            format: 'png',
                            dynamic: true,
                            size: 256
                        })}`);

                        sentMessage.edit(embeds);

                    }, 2000);
                    let dmembed = new Discord.MessageEmbed()
                    dmembed.setTitle('Pick')
                    dmembed.setColor('fd8061')
                    dmembed.addField(`${client.emojis.cache.get('738669671569424405')} - Rock`, 'The Rock can break scissors')
                    dmembed.addField(`${client.emojis.cache.get('738669653953478716')} - Paper`, 'Paper wins against the rock')
                    dmembed.addField(`${client.emojis.cache.get('739394610803245098')} - Scissors`, 'Scissors can cut through paper')
                    dmembed.addField(`${client.emojis.cache.get('738726173957423205')} - Random`, 'Picks a random move')
                    dmembed.setFooter(`Made by Meliodaf#1900`, `${client.users.cache.get('468388958599118848').avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 256
                    })}`);
                    message.author.send(dmembed).then(dm1 => {

                        react(dm1)
                        hentai.send(dmembed).then(dm2 => {
                            react(dm2)

                            dm1.awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.id === '738669671569424405' || reaction.emoji.id === '738669653953478716' || reaction.emoji.id === '739394610803245098' || reaction.emoji.id === '738726173957423205'),
                                {max: 1, time: 45000}).then(collected1 => {
                                confirm1 = 1;
                                a = potato(dm1, collected1)
                                message.author.send(`${message.author} Go back to the channel:\n${Channel}`)
                                dmembed.fields = []
                                dmembed.setTitle('Waiting...')
                                dmembed.addField(`${message.author.username}: ${client.emojis.cache.get(`738405760064684053`)}`, 'Confirmed')
                                dmembed.addField(`${hentai.username}: ${client.emojis.cache.get(`738672865280393259`)}`, 'Waiting...')
                                if (confirm2===1) {
                                    turtle()
                                } else {

                                    sentMessage.edit(dmembed)

                                }
                            }).catch(() => {
                                dmembed.setTitle(`${message.author.username} did not react`)
                                dmembed.fields = []
                                dm1.edit(dmembed)
                                sentMessage.edit(dmembed)
                                dm2.edit(dmembed)
                            });
                            dm2.awaitReactions((reaction, user) => user.id === hentai.id && (reaction.emoji.id === '738669671569424405' || reaction.emoji.id === '738669653953478716' || reaction.emoji.id === '739394610803245098' || reaction.emoji.id === '738726173957423205'),
                                {max: 1, time: 45000}).then(collected2 => {
                                confirm2 = 1
                                b = potato(dm2, collected2)
                                hentai.send(`${hentai} Go back to the channel:\n${Channel}`)
                                dmembed.setTitle('Waiting...')
                                dmembed.fields = []
                                dmembed.addField(`${message.author.username}: ${client.emojis.cache.get(`738672865280393259`)}`, 'Waiting...')
                                dmembed.addField(`${hentai.username}: ${client.emojis.cache.get(`738405760064684053`)}`, 'Confirmed')

                                if (confirm1===1) {
                                    turtle()
                                } else {
                                    sentMessage.edit(dmembed)

                                }
                            }).catch(() => {
                                dmembed.setTitle(`${hentai.username} did not react`)
                                dmembed.fields = []
                                dm1.edit(dmembed)
                                sentMessage.edit(dmembed)
                                dm2.edit(dmembed)
                            });

                            function turtle() {

                                let list = ['739394610803245098', '738669671569424405', '738669653953478716']

                                dmembed.fields = []
                                if (a === b && confirm1===1 && confirm2===1) {
                                    dmembed.setTitle('DRAW')
                                    victor = 0
                                        dmembed.addField(`${message.author.username}: ${client.emojis.cache.get(`${list[a]}`)}`, 'DRAW')
                                        dmembed.addField(`${hentai.username}: ${client.emojis.cache.get(`${list[a]}`)}`, 'DRAW')
                                } else if(confirm1===1 && confirm2===1){
                                    let value = oppai()
                                    let a1
                                    let b1
                                    if (value === 1) {
                                        a1 = 0;
                                        b1 = 1;
                                    } else {
                                        a1 = 1;
                                        b1 = 0;
                                    }

                                    let win = ['WIN', 'LOSS']
                                    dmembed.setTitle(`${winner.tag} WON`)

                                    dmembed.addField(`${message.author.username}: ${client.emojis.cache.get(`${list[a]}`)}`, `${win[a1]}`)
                                    dmembed.addField(`${hentai.username}: ${client.emojis.cache.get(`${list[b]}`)}`, `${win[b1]}`)
                                }
                                sentMessage.edit(dmembed)
                                let nembed = cool()
                                dm2.edit(nembed)
                                dm1.edit(nembed)


                            }
                        })
                    })

                } else {
                    embed.setTitle('Challenge Denied')
                    sentMessage.edit(embed);
                }

            }).catch(() => {
                embed.setTitle('No reaction after 30 seconds, Challenge Canceled')
                sentMessage.edit(embed)
            });
            function cool() {
                let list2 = ['DRAW', `${winner.tag} WON`]
                let ar= new Discord.MessageEmbed
                ar.setTitle(`${list2[victor]}`)
                console.log(victor)
                ar.setDescription('Check the channel for info')
                ar.setThumbnail(`${client.user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 64
                })}`)
                ar.setFooter(`Made by Meliodaf#1900`, `${client.users.cache.get('468388958599118848').avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 256
                })}`);
                return ar;
            }
            function oppai() {
                victor=1;
                console.log('bug?')
                console.log(victor)
                console.log(confirm1)
                console.log(confirm2)
                console.log(a)
                console.log(b)
                if(a===0) {
                    if(b===1) {
                        winner = hentai;
                        return 2;}
                    else return 1;
            }
                if(a===1) {
                    if(b===0) return 1
                    else{winner = hentai;
                        return 2}
                    }
                if(a===2) {
                    if(b===0) {winner= hentai
                        return 2}
                    else return 1
                }
            }
             function react(dm = new Discord.MessageEmbed) {
                dm.react('738669671569424405')
                dm.react('738669653953478716')
                dm.react('739394610803245098')
                dm.react('738726173957423205')
            }
            function potato(dm= new Discord.MessageEmbed,collected3) {
                let nembed = new Discord.MessageEmbed()
                let c=-1
                nembed.setTitle('Waiting...')
                nembed.setDescription('Check the channel for info')

                nembed.setThumbnail(`${client.user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 64
                })}`)
                nembed.setFooter(`Made by Meliodaf#1900`, `${client.users.cache.get('468388958599118848').avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 256
                })}`);
                dm.edit(nembed)


                if (collected3.first().emoji.id==='739394610803245098') {
                    c = 0
                } else if (collected3.first().emoji.id === '738669671569424405') {
                    c = 1
                } else if (collected3.first().emoji.id === '738669653953478716') {
                    c = 2
                } else if (collected3.first().emoji.id === '738726173957423205') {
                    c = Math.floor(Math.random() * 3);
                }
            return c;
            }
        }
    }
}
