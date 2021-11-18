const { Router } = require("express");
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();
function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(showMe));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(editMe));
}
async function showMe(req, res, next) {
  let user = await User.findOne({
    where: { id: req.userId },
  });
  res.status(200).json(user);
}
async function logout(req, res, next) {
  let token = await Token.findOne({
    where: { value: req.header("token") },
  });
  await token.destroy();
  res.status(200).json({ message: "Deleted" });
}
async function editMe(req, res, next) {
  let user = await User.findOne({
    where: { id: req.userId },
  });
  await user.update(req.body);

  user = await User.findOne({
    where: { id: req.userId },
  });

  res.status(200).json(user);
}
initRoutes();
module.exports = router;
