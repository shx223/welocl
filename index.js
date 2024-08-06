const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {  
  res.send(new Date());
});

const Discord = require('discord.js')
const client = new Discord.Client({ intents: 32767 });
const db = require("quick.db");

let prefixx =  "!"; ///برفكس
let prefix =  "!" || db.get("prefix")  ///برفكس
let owner = ["422901419365105664"];///الاي دي حقك

client.on("message", async message => {
    const args = message.content.trim() .split(/ +/);
    if (message.content.startsWith(prefix + "setprefix")) {
      if (!owner.includes(message.author.id)) return;
      if (!args[1])  return message.channel.send(
         `> **The Server Prefix is : \`${prefix}\`**`
        );
      db.set("prefix", args[1]);
      message.channel.send(  `> **Done Setting the new Prefix To : \`${db.get("prefix")}\`**`
      );
    }
    if (message.content.startsWith(prefix + "enable")){
        if (!owner.includes(message.author.id)) return; 
        let status = args[1]
        if (!status) return message.channel.send("برجاء ارسال حاله الترحيب [ on - off ]")
        if (status == "on"){
            db.set("status", "on");
            return message.channel.send( "> **✅ تم تفعيل الخاصيه !**");
        }
        if (status == "off"){
            db.delete("status");
           return  message.channel.send( "> **✅ تم الغاء الخاصيه !**");
        }
        else{
            return message.channel.send( "برجاء ارسال حاله الترحيب [ on - off ]")
        }
    }
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("Calculating the ping..").then(m => {
          m.edit(  `\`\`\`javascript\nDiscord API : ${Math.round( client.ws.ping  )} ms\n\`\`\` `
          );
        });
      }
    if (message.content.startsWith(prefix + "setchannel")){
        if (!owner.includes(message.author.id)) return; 
        let ids = args[1];
        if (!ids) return message.channel.send("برجاء ارسال الاي دي بعد الامر !")
        let channel = message.guild.channels.cache.find(r => r.id === ids)
        if (!channel) return message.channel.send("لم امتكن من العثور على هذا الروم !")
        db.set("welcomechannel", ids)    
        message.channel.send("> **✅ تم تحديد روم الترحيب بنجاح**")
    }
    if (message.content.startsWith(prefix + "setmessage")){
        if (!owner.includes(message.author.id)) return; 
        let messager = args.slice(1).join(" ");
        if (!messager) return message.channel.send("برجاء ارسال الرساله بعد الامر !")
        db.set("welcomemessage", messager)    
        message.channel.send("> **✅ تم تحديد رساله الترحيب بنجاح**")
    }
    if (message.content.startsWith(prefix + "config")){
        if (!owner.includes(message.author.id)) return; 
        let findmessage = await db.get("welcomemessage")
        if (!findmessage) findmessage = "لم يتم تحديد رساله الترحيب"
        let findroom = await db.get("welcomechannel")
        if (!findroom) findroom = "لم يتم تحديد روم الترحيب"
        let findtime = timer
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic:true}))
        .setTitle("معلومات عن السيرفر")
        .addField("> روم الترحيب :", `${findroom}`)
        .addField("> رساله الترحيب :", `${findmessage}`)
        .addField("> وقت مسح الرساله :", `${findtime} ثواني`)
        .setFooter(client.user.username , client.user.displayAvatarURL({dynamic:true}))
        .setTimestamp()
        message.channel.send(embed)
    }
    if (message.content.startsWith(prefix + "help")){
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic:true}))
        .setTitle(`${client.user.username}'s Help`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        .setDescription("> Available Commands : \" **7** \" \n> Developer : \" <@776951974138216473> \" ")
        .addField("General" , `\`${prefix}ping\`, \`${prefix}info\`, \`${prefix}help\` `)
        .addField("Owner" , `\`${prefix}enable\`, \`${prefix}setprefix\`, \`${prefix}setmessage\`, \`${prefix}setchannel\`, \`${prefix}setname\`, \`${prefix}setavatar\`, \`${prefix}config\``)
        .addField(
            `Links`,
            `[Ra3d's Studio](https://discord.gg/Gw72qQQWPn)\n[Youtube Tutorial](https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg)`
          )
        .setFooter(client.user.username , client.user.displayAvatarURL({dynamic:true}))
        .setTimestamp()
        message.channel.send(embed)
    }
    if (message.content.startsWith(prefix + "info")){
        let end = new Discord.MessageEmbed()
        .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic:true}))
        .setTitle(`${client.user.username}'s info`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        .setDescription("** > This bot was developed by : \" <@776951974138216473> \" \n> بوت ترحيب للريوارد يرحب بالعضو لمده من الوقت ويحذف الرساله حتى ياتي منشن للعضو دون ان تظل الرساله موجوده **")
        .addField(
            `Links`,
            `[Ra3d's Studio](https://discord.gg/Gw72qQQWPn)\n[Youtube Tutorial](https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg)`
          )
        .setFooter(client.user.username , client.user.displayAvatarURL({dynamic:true}))
        .setTimestamp()
        message.channel.send(end)
    }
    if (message.content.startsWith(prefix + "setname")) {
        if (!owner.includes(message.author.id)) return; 
        let botnameee = args.slice(1).join(" ");
        if (!botnameee) return message.channel.send("برجاء وضع اسم للتغير");
        client.user.setUsername(`${botnameee}`);
        message.channel.send(`Changing The bot's Name ...`).then(me => {
            me.edit(`> **✅ تم تغير الاسم الى : \`${botnameee}\`** `);
          });
    }
    if (message.content.startsWith(prefix + "setavatar")) {
        if (!owner.includes(message.author.id)) return; 
        let botavatar = args.slice(1).join(" ");
        if (!botavatar) return message.channel.send( "برجاء وضع رابط صوره للتغير");
        client.user.setAvatar(`${botavatar}`);
        message.channel.send(`Changing The bot's Avatar ...`).then(me => {
            me.edit(`> **✅ تم تغير الصوره بنجاح** `);
          });
    }
    if (message.content.startsWith(prefix + "invite")) {
        message.channel.send("creating an invite link..").then(m => {
          let embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTitle(`Invite Me`)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
           .setTimestamp()
          .setFooter(
           client.user.username ,
            client.user.displayAvatarURL({ dynamic: true })
          );
          m.edit(embed)
         })
      }
  });
  

  client.on("guildMemberAdd", async member => {
    if (!db.has("status")) return console.log("Please enable me !") 
    let welcomechannel = await db.get("welcomechannel")
    let channel = client.channels.cache.find(c => c.id == welcomechannel)
    if (!welcomechannel) return
    let findwelcomemessage = await db.get("welcomemessage")
    channel.send( `${findwelcomemessage} ✔ ${member}`).then(msg => {
        setTimeout(() => msg.delete(), timer * 1000)
    })
  })

  client.on("ready", () => {
      console.log(`${client.user.username} is now connected`)
      client.user.setPresence({ activity: { name: '' , type: ''}, status: 'online' })

    })


  client.login(process.env.token)