const router = require("express").Router();

const Posts = require("../posts/postDb.js");

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ message: "Error retrieving posts." }));
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {
  const postId = req.params.id;
  Posts.getById(postId)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: "No post with that id" });
      }
    })
    .catch(err => {
      res.status(500).json({ messaeg: "Error retrieving that post" });
    });
}

module.exports = router;
