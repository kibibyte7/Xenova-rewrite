const Command = require("../../modules/Command.js") 
const sm = require("string-similarity")
class Avatar extends Command {
	constructor(client) {
	super(client, {
	name:"avatar",
	description:"Montre l'avatar", 
        category:"Information", 
	usage:"avatar [@mention]", 
	aliases:["pp"] 
	}) 
	} 
	
	
	run(message, args, level){
		
		let membres = []; 
		
		let indexes = []; 
		
		message.guild.members.forEach(function(member){ 
			membres.push(member.user.username) 
			indexes.push(member.id) 
			}) 
			
			let match = sm.findBestMatch(args.join(" "), membres); 
			
			let username = match.bestMatch.target; 
			
			let ToShow = message.guild.members.get(indexes[membres.indexOf(username)]); 
			
			let user_avatar = message.mentions.members.first() || message.guild.members.find("id", args.join(" ")) || ToShow; 
			
			if(!args || args.length < 1){ 
				
			message.channel.send({embed:{ 
			color: Math.floor(Math.random() * 16777214) + 1, 
			author: { 
			name: message.author.tag,
			icon_url: message.author.avatarURL
			}, 
			title: `avatar de ${message.author.tag}`, 
			url: message.author.avatarURL, 
			image: { 
		 url: message.author.avatarURL 
		 }, 
		 timestamp: new Date(), 
		 footer: { 
		 icon_url: this.client.user.avatarURL, 
		 text: `avatar`
		 }
		 }}) 
		 
		 }else{ 
		 	
		 message.channel.send({embed:{ 
		 color: Math.floor(Math.random() * 16777214) + 1, 
		 author: {
		 name: message.author.tag,
		 icon_url: message.author.avatarURL
		 },
		 title: `Avatar de ${user_avatar.user.tag}`,
		 url: user_avatar.user.avatarURL,
		 image: { 
		 url: user_avatar.user.avatarURL 
		 }, 
		 timestamp: new Date(),
		 footer: {
		 icon_url: this.client.user.avatarURL,text: `avatar`
		 }
		 }})
		 } 
		 } 
		 }




module.exports = Avatar;
