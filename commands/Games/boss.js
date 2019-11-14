const Command = require("../../modules/Command.js")
const bosses = require("../../bosses.json")

class Boss extends Command {
constructor(client){
super(client, {
name:"boss", 
FRdescription:"Combattre le boss spécifié.", 
category:"Game", 
usage:"boss attack <level>", 
aliases:[] 
}) 
} 

run(message, args, level, con) {

con.query(`SELECT * FROM inventory WHERE id =${message.author.id}`, (err, rows) => {
    	
    	if(rows.length == 0) return message.channel.send(":x:")

    	let playerpv = parseInt(rows[0].pv);
    
    	if(playerpv == 0) return message.channel.send(":x: Tu n'as plus de pv.") 
    	
    	if(!args[0] === "attack") return message.channel.send(":x: Spécifie **attack** pour attaquer") 
    	
    	if(isNaN(args[1])) return message.channel.send(":x: Spécifie le level du boss à battre.") 
    	
    	if(parseInt(args[1]) > bosses.bosses.length || parseInt(args[1]) < 1) return message.channel.send(`:x: choisi un niveau entre 1 à 10`)
   
    	let turn = 0;
    	
    	let bosspv = parseInt(bosses.bosses[args[1]-1].hp) 
    	
    	let xp = rows[0].xp;
    	
    	let level = rows[0].niveau;
    	
    	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);
    	
    	let resp = ``;
    	
    	
    	let bossattack = bosses.bosses[args[1]-1].attack;
    	let bossdef = bosses.bosses[args[1]-1].defense;
    	let bossxp = bosses.bosses[args[1]-1].xp;
        var atk_rune = Math.floor(Math.random()*4)*parseInt(args[1]) //atk_fragments
        var def_rune = Math.floor(Math.random()*4)*parseInt(args[1]) //def_fragments
        var pick = Math.floor(Math.random()*4)*parseInt(args[1]) //pick_fragments
        var armor = Math.floor(Math.random()*4)*parseInt(args[1]) //armor_fragments
    	
        while(playerpv > 0 && bosspv > 0){
        bosspv > 0 ? bosspv = bosspv-(rows[0].attack - bossdef < 0 ? 1 : rows[0].attack - bossdef): bosspv;
        playerpv > 0 ? playerpv = playerpv -(bossattack - rows[0].defense < 0 ? 1 : bossattack - rows[0].defense) : playerpv; 
        resp+= bosspv == 0 ? `` :`**${bosses.bosses[args[1]-1].name}** inflige ${bossattack - rows[0].defense < 0 ? 1 : bossattack - rows[0].defense} de dégâts à **${message.author.tag}** il lui reste ${playerpv} pv\n` 
        resp+= playerpv == 0 ? `` :`TOUR: ${parseInt(turn)+1} - ${message.author} inflige ${rows[0].attack - bossdef < 0 ? 1 : rows[0].attack - bossdef} de dégâts à **${bosses.bosses[args[1]-1].name}** il lui reste ${bosspv}/${bosses.bosses[args[1]-1].hp}pv\n`
        turn++;
    	}
        
    	message.channel.send(`${resp}\n`+bosspv <= 0 ? `**${bosses.bosses[args[1]-1].name}** est mort ! \n**${message.author.tag}** remporte la victoire ! Récompenses:\n\n-Xp: ${bossxp}\n-Fragments d'attaque: ${atk_rune}\n-Fragments de défense: ${def_rune}\n-Fragments de pioche: ${pick}\n-Fragments d'armure: ${armor}` : `${message.author.tag}** est mort ! \n**${bosses.bosses[args[1]-1].name}** remporte la victoire !`)
    	
    	con.query(`UPDATE inventory SET pv = ${playerpv < 0 ? 0 : playerpv} WHERE id = ${message.author.id}`)
  
    	if(bosspv <= 0) con.query(`UPDATE inventory SET kills = ${parseInt(rows[0].kills)+1}, xp = ${parseInt(rows[0].xp)+bossxp}, atk_fragments = ${parseInt(rows[0].atk_fragments)+atk_rune}, def_fragments = ${parseInt(rows[0].def_fragments)+def_rune}, pick_fragments = ${parseInt(rows[0].pick_fragments)+pick}, armor_fragments = ${parseInt(rows[0].armor_fragments)+armor} WHERE id = ${message.author.id}`) 

    	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1}, attack = ${parseInt(rows[0].attack)*rows[0].niveau+3}, defense = ${parseInt(rows[0].defense)*rows[0].niveau+3} WHERE id = ${message.author.id}`)
	  
    	})

} 
} 
module.exports = Boss;
