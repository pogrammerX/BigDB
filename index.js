const express = require('express')
const app = express();
const BigDB = require("./BigDB.js")
const database = new BigDB();
const databaseFileName = "database.bdb"

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post("/bigdb/set", (req, res) => {
    database.set(req.body.key, req.body.value);
    res.send({
        result: "sucess"
    })
})

app.post("/bigdb/remove", (req, res) => {
    database.remove(req.body.key);
    res.send({
        result: "sucess"
    })
})

app.post("/bigdb/get", (req, res) => {
    res.send({
        data: database.get(req.body.key)
    })
})

app.post("/bigdb/save", (req, res) => {
    database.saveDB(databaseFileName);
    res.send({
        result: "sucess"
    })
})

app.get("/bigdb", (req, res) => {
    res.send("<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> <title>BigDB V1</title> </head> <body style='background-color: rgb(46, 46, 46); color: white;'> <h1>This Website uses BigDB (Big Database)</h1> <h3>Check out our <a href='https://github.com/pogrammerX/BigDB'>GitHub</a>!</h3> </body> </html>");
})

app.listen(3000, ()=> {
    console.log("BigDB started at port: 3000")
    database.loadDB(databaseFileName);
    console.log("BigDB V1 has now loaded!")
})