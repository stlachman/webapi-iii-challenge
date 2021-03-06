const router = require("express").Router();

const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

router.post("/", validateUser, (req, res) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(err => {
      res.status(500).json({ error: "The user couldn't be added to the db." });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const postInfo = req.body;
  postInfo.user_id = req.user.id;
  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json({ post });
    })
    .catch(err => {
      res.status(500).json({ error: "Error creating new post for user." });
    });
});

// Get Users
router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved" });
    });
});

// GET User
router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// GET All Posts of User
router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then(userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(err => res.status(500).json({ message: "error retrieving posts" }));
});

// DELETE User
router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(deletedUser => {
      res.status(204).end();
    })
    .catch(err => res.status(500).json({ message: "error deleting user" }));
});

// PUT Edit User
router.put("/:id", validateUser, validateUserId, (req, res) => {
  const updatedUser = req.body;
  Users.update(req.user.id, updatedUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json({ message: "error updating user" }));
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id;
  Users.getById(userId)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => res.status(500).json({ message: "error retrieving user" }));
}

function validateUser(req, res, next) {
  // Check if object is empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
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
