const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())

const eventsStore = []

app.post("/events", (req, res) => {
    const event = req.body

    eventsStore.push(event)

    axios.post("http://posts-clusterip-srv:4000/events", event) // Posts
    axios.post("http://comments-srv:4001/events", event) // Comments
    axios.post("http://query-srv:4002/events", event) // Query
    axios.post("http://moderation-srv:4003/events", event) // Moderation

    res.send({ status: "OK" })
})

app.get("/events", (req, res) => {
    res.send(eventsStore)
})

app.listen(4005, () => {
    console.log("Event Bus listening on Port 4005")
})