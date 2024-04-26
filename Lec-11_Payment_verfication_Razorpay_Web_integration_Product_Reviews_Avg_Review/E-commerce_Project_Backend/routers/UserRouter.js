const express = require("express");
const UserRouter = express.Router();
const { getAllUserHandler, createuserHandler, getUserById, deleteUserById } = require("../controllers/UserController")
const { checkInput } = require("../controllers/middleWares");
const { protectRouteMiddleWare, isValidUser, isAdminMiddleWare } = require("../controllers/AuthController");
/***********routes**************/
/**********users*****/
UserRouter.use(protectRouteMiddleWare);

UserRouter.get("/", isAdminMiddleWare, getAllUserHandler);

// chaining
UserRouter.post("/", checkInput, isAdminMiddleWare, createuserHandler);
UserRouter.get("/:elementId", isValidUser, getUserById);
UserRouter.delete("/:elementId", isAdminMiddleWare, deleteUserById);

module.exports = UserRouter;