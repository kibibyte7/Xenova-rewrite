module.exports = class {
constructor(client){
this.client = client 
} 

async run(oldMember, newMember) {

let newUserChannel = newMember.voiceChannel 
let oldUserChannel = oldMember.voiceChannel 
if(oldUserChannel === undefined && newUserChannel !== undefined) { 
	// User Joins a voice channel
if(newUserChannel.name === "➕ Crée ton salon"){
let u = newMember.user
var chan = newUserChannel.guild.createChannel("✨"+ u.username, "voice").then(c => {
c.setParent(newUserChannel.parentID)
setTimeout(() =>{c.setUserLimit(10)}, 2500) 
newMember.setVoiceChannel(c.id)
})
} 
} else if(newUserChannel === undefined){ 
	if(oldUserChannel === undefined) return;
	let u = oldMember.user
let voice = oldMember.guild.channels.cache.find(vc => vc.name === "✨"+ u.username)
let nombre = oldUserChannel.members.cache.size;
let user_name = oldUserChannel.name.slice(1)
let member = this.client.users.cache.find(c => c.username === user_name) 
if(!member) return;
if(oldUserChannel.name === "✨"+member.username && oldUserChannel.members.cache.size == 0){
voice.delete();
} 
} 

} 
} 
