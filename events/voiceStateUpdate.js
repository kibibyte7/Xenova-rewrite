module.exports = class {
constructor(option){
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
	console.log(`${oldUserChannel.name} - ${oldUserChannel.members.size}`)
	let u = oldMember.user
let voice = oldMember.guild.channels.find(vc => vc.name === "✨"+ u.username)
let nombre = oldUserChannel.members.size;
let user_name = oldUserChannel.name.slice(1)
let member = oldMember.guild.members.find(c => c.user.username === user_name) 
if(oldUserChannel.name === "✨"+member.user.username && oldUserChannel.members.size == 0) {
voice.delete();
} 
} 

} 
} 
