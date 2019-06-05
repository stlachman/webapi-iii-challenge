const router = require("express").Router();

const Posts = require("../posts/postDb.js");

// GET all posts
router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ message: "Error retrieving posts." }));
});

// GET post by id
router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

// DELETE post
router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then(deletedPost => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting post" });
    });
});

// PUT post
router.put("/:id", validatePostId, validatePost, (req, res) => {
  const updatedPost = req.body;
  Posts.update(req.post.id, updatedPost)
    .then(update => res.status(201).json(updatedPost))
    .catch(err => res.status(500).json({ message: "Error updating post" }));
});

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

function validatePost(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
