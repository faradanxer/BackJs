const e = require("express");
const { Op } = require("sequelize");
const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler } = require("../middlewares/middlewares");
const { nanoid } = require("nanoid");

const router = Router();
function initRoutes() {
  router.post("/login", asyncHandler(login));
  router.get("/", asyncHandler(ShowAll));
  router.post("/reg", asyncHandler(registration));
}

async function registration(req, res, next) {
  let user = await User.findOne({
    where: { [Op.or]: { Username: req.body.Username, Email: req.body.Email } },
  });
  if (user) {
    throw new ErrorResponse("This username or email is used", 404);
  }
  user = await User.create(req.body);
  res.status(200).json(user);
}

async function login(req, res, next) {
  const user = await User.findOne({
    where: { Username: req.body.Username, Password: req.body.Password },
  });

  if (!user) {
    throw new ErrorResponse("Invalid username or password", 404);
  }
  const token = await Token.create({ userId: user.id, value: nanoid(128) });
  res.status(200).json(token);
}
async function ShowAll(req, res, next) {
  const users = await User.findAll();

  res.status(200).json({ users });
}
initRoutes();

module.exports = router;
