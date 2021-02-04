const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")


const app = express()
app.use(bodyParser.json())

app.post("/events", async (req, res) => {
    const { type, data } = req.body
    const { id, content, postId } = data

    if (type === "CommentCreated") {
        const banned = "orange"
        const status = data.content.includes(banned) ? "rejected" : "approved";

        await axios.post("http://events-srv:4005/events", {
            type: "CommentModerated",
            data: {
                id,
                content,
                postId,
                status
            }
        })
    }

    res.send({})
})


app.listen(4003, () => {
    console.log("Moderation Service running on PORT 4003")
})