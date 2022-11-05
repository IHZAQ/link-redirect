const link = require('./link')
const express = require("express")
const app = express()
const { Client, WebhookClient } = require("discord.js")
const client = new Client({
  intents: 32767
})
client.on('ready', () => {
  client.user.setActivity('Keeping https://lnk.stormy.ml alive', "PLAYING")
  console.log("waking up the bot")
})
client.on("messageCreate", message => {
  if (message.content.includes(`<@!${client.user.id}>`)) {
    message.reply({ content: `I'm still alive, don't worry`, allowedMentions: { repliedUser: false } })
  }
})
client.login(process.env.TOKEN)
const parser = require("body-parser")
app.set(parser.json())
app.set('view engine', 'pug')
app.get('/', (req, res) => {
  res.render('index')
  res.status(200)
})
app.post('/topgghook', (req, res) => {
  console.log(req.body)
})
app.get('/:para', (req, res) => {
  let para = link[req.params.para]
  if (!para) {
    res.send("Error: This link doesn't exist you dumb piece of ***")
    res.status(301)
  } else {
    res.render('redirect', {
      url: para.link,
      color: para.color,
      title: para.title,
      desc: para.desc,
      img: para.img
    })
    res.status(200)
  }
})
app.listen(3000, () => {
  console.log(`Ready to fucking redirect`)
})
