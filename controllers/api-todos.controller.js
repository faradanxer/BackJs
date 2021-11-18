const e = require("express");
const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getToDos));
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getToDoById));
  router.post("/", asyncHandler(requireToken), asyncHandler(createToDo));
  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteToDos));
  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(deleteToDoById)
  );
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(patchToDo));
}

async function getToDos(req, res, next) {
  const todos = await ToDo.findAll({ where: { userId: req.userId } });

  if (!todos) {
    throw new ErrorResponse("No todos found", 404);
  }
  res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: { userId: req.userId, id: req.params.id },
  });

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }

  res.status(200).json(todo);
}

async function createToDo(req, res, next) {
  const todo = await ToDo.create({
    ...req.body,
    userId: req.userId,
  });
  res.status(200).json(todo);
}

async function deleteToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: { userId: req.userId, id: req.params.id },
  });

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }
  await todo.destroy();
  res.status(200).json({ message: "Destroyed" });
}

async function deleteToDos(req, res, next) {
  await ToDo.destroy({
    truncate: true,
    where: { userId: req.userId },
  });

  res.status(200).json({ message: "ok" });
}

async function patchToDo(req, res, next) {
  let todo = await ToDo.findOne({
    where: { userId: req.userId, id: req.params.id },
  });

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }

  await todo.update(req.body);

  todo = await ToDo.findByPk(req.params.id);

  res.status(200).json(todo);
}
initRoutes();

module.exports = router;
