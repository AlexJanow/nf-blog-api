const express = require("express");
const db = require("./lib/db");

/*
  We create an express app calling
  the express function.
*/
const app = express();

/*
  We setup middleware to:
  - parse the body of the request to json for us
  https://expressjs.com/en/guide/using-middleware.html
*/
app.use(express.json());

/*
  Endpoint to handle GET requests to the root URI "/"
*/
app.get("/articles", (req, res) => {
  db.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500);
      res.send("Something went wrong");
    });
});

app.post("/articles", (req, res) => {
  db.insert(req.body)
    .then((newPost) => {
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});
//id
app.get("/articles/:id", (req, res) => {
  db.findById(req.params.id).then((data) => {
    if (data) {
      res.send(data);
    } else {
      console.log("Post not found");
    }
  });
});

//patch

app.patch("/articles/:id", (req, res) => {
  db.updateById(req.params.id, req.body).then((updatedPost) => {
    if (updatedPost) {
      res.status(200).send(updatedPost);
    } else {
      res.status(404);
      console.log("Not found");
    }
  });
});

app.delete("/articles/:id", (req, res) => {
  db.deleteById(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => console.log("error"));
});

/*
  We have to start the server. We make it listen on the port 4000

*/
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
