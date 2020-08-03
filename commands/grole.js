const Discord = require('discord.js');
module.exports = {
    name: 'grole',
    description: 'Bruh command',
    category: 'general',
    async execute(client, message, args) {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('You have no permission');
        let rMember = message.guild.member(message.mentions.users.first()) || message.guilds.member.get(args[0]);
        if(!rMember) return message.reply("Couldn't Find The User.");
        let role = args.join(" ").slice(22);
        if(!role) return message.reply("Specify a role");
        let gRole = message.guild.roles.cache.find(rolez => rolez.name === `${role}`);
        if(!gRole) return message.reply("Couldn't Find That Role");
        if(rMember.roles.cache.has(gRole.id));
        await(rMember.roles.add(gRole.id));

        try{
            await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
        }catch(e){
            message.channel.send(`Congrats to <@{rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked`)
        }
    }
}