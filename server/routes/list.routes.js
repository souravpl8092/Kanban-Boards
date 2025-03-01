const express = require("express");
const listRouter = express.Router();
const {
  createList,
  getList,
  updateList,
  deleteList,
} = require("../controllers/list.controller");
const authMiddleware = require("../middleware/authenticate.middleware");

listRouter.use(authMiddleware);
listRouter.route("/").get(getList).post(createList);
listRouter.route("/:id").patch(updateList).delete(deleteList);

module.exports = listRouter;
