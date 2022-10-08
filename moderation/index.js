const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const url = "http://localhost:4005";
app.post("/events", async (req, res) => {
  try {
    const { type, data } = req.body;
    console.log(type);
    if (type === "CommentCreated") {
        console.log('dataa===>',data.content)
      const status = data.content.includes("orange") ? "rejected" : "approved";
      console.log(status);
      await axios
        .post(`${url}/events`, {
          type: "CommentModerated",
          data: {
            id: data.id,
            postId: data.postId,
            status,
            content: data.content,
          },
        })
        .catch((err) => res.send(err));
    }
    res.send({});
  } catch (err) {
    console.log(err);
  }
});

app.listen(4003, () => {
  console.log("listenning on 4003");
});
