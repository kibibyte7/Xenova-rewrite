const mysql = require("mysql")
const Canvas = require("canvas") 
const Discord = require("discord.js")

   var db_config = {
    host:process.env.host, 
    user:process.env.user, 
    password:process.env.password, 
    database:process.env.database, 
    useUnicode:true
    } 

    function handleDisconnect() {
    con = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    //console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (member) {

    this.client.user.setActivity(`${this.client.config.defaultSettings.prefix}help | ${this.client.guilds.size} servs | ${this.client.users.size} utilisateurs`, {type:"STREAMING"});
    con.query(`SELECT * FROM settings WHERE guild_id = ${member.guild.id}`, (err, rows) => {
    
    if(!rows) return;
    
    const canvas = Canvas.createCanvas(900, 250);
	
    const ctx = canvas.getContext('2d');
    
    Canvas.registerFont('Font/NFS.ttf', {family:"NFS"});

    const background = await Canvas.loadImage('Images/joinleave1.jpg');
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';

    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '25px NFS';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Au revoir,', canvas.width / 3, canvas.height / 3.7);

    ctx.font = this.client.applyText(canvas, `${member.user.displayName}`) && '35px NFS';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(member.displayName, canvas.width / 3, canvas.height / 1.8);
    
    ctx.font = `Tu vas nous manquer, nous sommes ${member.guild.members.size} membres !` && '17px NFS';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Tu vas nous manquer, nous sommes ${member.guild.members.size} membres !`, canvas.width / 3, canvas.height / 1.2);

    ctx.beginPath();

    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

    ctx.closePath();

    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	
    ctx.drawImage(avatar, 25, 0, 200, canvas.height);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'leave_image.png');

    let channel = member.guild.channels.find("id", rows[0].leave_id)

    let leave = rows[0].leave_msg
    
    var usertag = leave.replace("{user}", member.user.tag)
        
    var server = usertag.replace("{server}", member.guild.name) 
    
    var l = server.replace("{membercount}", member.guild.members.size) 
    
    if(!channel) return;

    channel.send(this.client.toValues(l, "{user}", member.user.tag), attachment)

    }) 


}
};
