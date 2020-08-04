const Discord = require('discord.js');
const { Collection } = require("discord.js")
const fs = require('fs');
require('dotenv').config()
const client = new Discord.Client();
client.categories = new Discord.Collection();
client.prefixes=require('./prefixes.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.once('ready', async () => {
	await client.user.setActivity(`/help`, { type: 'STREAMING' , url: 'https://www.twitch.tv/monstercat'});
	console.log('Ready!');
});
const token=process.env.CLIENT_TOKEN
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	const category = client.categories.get(command.category)
	if (category) {
		category.set(command.name, command)
	} else {
		if(command.category) {
			client.categories.set(command.category, new Collection().set(command.name,command))
		}else {
			client.categories.set(0, new Collection().set(command.name, command))
		}
	}
}
const defprefix=process.env.PREFIX
let prefix=defprefix
client.on('message', message => {
	if(message.guild) {
		if (!client.prefixes[message.guild.id]) {
			client.prefixes[message.guild.id] = {
				prefixes: defprefix
			};
			fs.writeFile("./prefixes.json", JSON.stringify(client.prefixes, null, 4), err => {
				if (err) throw err;
			})
		}
		prefix = client.prefixes[message.guild.id].prefixes;
	}
	if (!message.content.startsWith(prefix) || message.author.bot) {
		if(message.mentions.users.first()===client.user ) {
			message.channel.send(`My prefix here is \`${prefix}\``)
		}
		return;
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	client.categories.map((category, name) => {
		const command = category.get(commandName) || category.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) {
			return;
		}
		const usage = command.usage;
		if(usage==='server') {
			if(message.channel.type ==='dm')
				return message.reply('Sorry, you can only use that command in a server')
		}
		try {
			command.execute(client, message, args);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	})

});

client.login(token);