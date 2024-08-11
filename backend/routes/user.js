const express = require("express");

const router = express.Router();
// const User = require("../db");
const {User,Account} =require("../db")
const z = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("./middleware");

// input validation

const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(6).max(20),
  password: z.string().min(6).max(100),
});

// sign up
router.post("/signup", async (req, res) => {
  const userData = req.body;
  const { success } = userSchema.safeParse(userData);
  if (!success) {
    return res.status(411).send({ msg: "Email Already taken/ Wrong Input" });
  }

  // Search for existing User
  const findUser = await User.findOne({ username: userData.username });
  if (findUser) {
    return res.status(411).send({
      msg: "username taken",
    });
  }

  const newUser = await User.create({
    email: userData.email,
    username: userData.username,
    password: userData.password,
  });

  var hashedPw = await newUser.createHash(userData.password);
  newUser.password = hashedPw;
  await newUser.save();

  const userId = newUser._id;

  // Assign some random balance to the user on sign up
  await Account.create({
    userId,
    balance : 1 + Math.random()*10000
  })

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  return res.status(200).send({
    msg: " User Created",
    token: token,
  });
});

const signinBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

// sign in router
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      msg: "incorrect password!!",
    });
  }

  const email = await User.findOne({ email: req.body.email });
  if (email == null) {
    return res.status(404).send({
      msg: "email not found",
    });
  } else {
    if (await email.validatePassword(req.body.password)) {
      const token = jwt.sign(
        {
          userId: email._id,
        },
        JWT_SECRET
      );
      return res.status(200).send({
        msg: "Logged in successfully",
        token: token,
      });
    } else {
      res.status(400).send({
        msg: "Incorrect password",
      });
    }
  }
});

// update
const updateBody = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
});
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Wrong input",
    });
  }
  let userData = await User.findOne({
    _id: req.userId,
  });

  const updateData = {};
  if (req.body.email) {
    updateData.email = req.body.email;
  }
  if (req.body.username) {
    updateData.username = req.body.username;
  }
  if (req.body.password) {
    updateData.password = req.body.password;
  }

  try {
    const newUser = await User.updateOne(
      { _id: req.userId },
      { $set: updateData },
      { runValidators: true }
    );
    return res.status(200).json({
      msg: "updated successfully!!",
    });
  } catch (err) {
    return res.status(403).json({
      msg: "can't update",
      error: err,
    });
  }
});

// fetching users
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = User.find({
    username: {'$regex': filter}
  });
  console.log(users);

  let user = [];
  for await (const u of users) {
    user.push({
      _id: u._id,
      username: u.username,
    });
  }
  if (users) {
    res.status(200).json({
      user,
    });
  } else {
    res.status(404).json({
      msg: "No User exists",
    });
  }
});

module.exports = router;
