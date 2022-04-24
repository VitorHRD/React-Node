const express = require('express')
const app = express();
const path = require("path")
require('dotenv').config();

const videos = []

app.listen(process.env.PORT, () => {
    console.log("Running")
})
app.get('/api/videos', (req, res) => {
    res.send(videos)
})
app.get('/:id',(req,res)=>{
   let id = req.params.id
   videos.push(id)
   res.send(videos)
})
app.delete('/delete/:id',(req , res)=>{
    let id = req.params.id
    let index = videos.indexOf(id)
    if(index > -1) {
        videos.splice(index,1)
      }
      res.send(videos)
})

    app.use(express.static(path.join(__dirname, 'front/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'front/build/index.html', (error) => {
            res.status(500).send(error)
        }))
    })
