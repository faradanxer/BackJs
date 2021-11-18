const e = require('express');
const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const User = require('../dataBase/models/User.model');
const { asyncHandler,requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/', asyncHandler(requireToken), asyncHandler(getToDos));
    router.get('/:id', asyncHandler(requireToken), asyncHandler(getToDoById));
    router.post('/', asyncHandler(requireToken),asyncHandler(createToDo))
    router.delete('/',asyncHandler(deleteToDos))
    router.delete('/:id',asyncHandler(deleteToDoById))
    router.patch('/:id',asyncHandler(patchToDo))
}

async function getToDos(req, res, next) {
    const User = await User.create();
    const todos = await ToDo.findAll();

    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(todo);
}

async function createToDo(req, res, next) {
    const todo = await ToDo.create({
        ...req.body, userId:req.userId
    }
    );
    res.status(200).json(todo);
}

async function deleteToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }
    await todo.destroy();
    res.status(200).json(todo);
}

async function deleteToDos(req, res, next) {
    
    await ToDo.destroy({
        truncate: true
    }); 

    res.status(200).json({message: 'ok'});
}

async function patchToDo(req, res,next) {
    let todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    await todo.update(req.body);

    todo = await ToDo.findByPk(req.params.id);
    
    res.status(200).json(todo);
}
initRoutes();

module.exports = router;