const Command = require("../../modules/Command.js") 

class Eval extends Command {
constructor(client) {
super(client, {
name:"eval", 
description:"Teste un code donné par le Owner.", 
category:"Système", 
usage:"eval <code>", 
permLevel:"XenoOwner" 
}) 
} 

run(message, args, level, con) {
                try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send("``résultat``\n"+ `\`\`\`xl\n${clean(evaled)}\n\`\`\``) 
    } catch (err) {
      message.channel.send("``erreur``\n" +  `\`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
  }
} 

}

module.exports = Eval;
