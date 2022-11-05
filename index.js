const link = require('./link')
const express = require("express")
const app = express()
const { time } = require("./config.json")

const parser = require("body-parser")
app.set(parser.json())
app.set('view engine', 'pug')
app.get('/', (req, res) => {
  res.render('index')
  res.status(200)
})

app.get('/:para', (req, res) => {
  let para = link[req.params.para]
  if (!para) {
    res.send("Error: This link doesn't exist, what are you even doing?")
    res.status(301)
  } else {
    res.render('redirect', {
      url: para.link,
      color: para.color,
      title: para.title,
      desc: para.desc,
      img: para.img,
      time
    })
    res.status(200)
  }
})
app.listen(3000, () => {
  console.log(`Ready to redirect`)
})
