const react = require('react');
const pokefusion = require("pokefusion-api")
const Command = require("../../modules/Command.js")
const puppeteer = require("puppeteer") 
const path = require("path") 

class Pokefusion extends Command {
constructor(client){
super(client, {
name:"pokefusion", 
FRdescription:"Donne une image de Pokémon fusionné à un autre.", 
category:"Fun", 
usage:"pokefusion", 
aliases:[] 
}) 
} 

async run(message, args, level, con) {

import * as React from 'react';

await pokefusion.getRandomFusion(`${process.cwd()}${path.sep}.apt${path.sep}usr${path.sep}bin${path.sep}google-chrome`, {args: ['--no-sandbox', '--disable-setuid-sandbox']}).then(res => {

let document;
var src = "data:image/jpeg;base64,";
src += res.fusionBase64;
var newImage = document.createElement('img');
newImage.src = src;
newImage.width = newImage.height = "80";

message.channel.send({embed:{
color:Math.floor(Math.random()* 16777214) + 1,
title:`Fusion (${res.fusionName})`,
files:[{attachment:`${newImage.toDataURL()} `, name:"fusion.png"}] 
}})
});

} 
}

module.exports = Pokefusion;
