const Router = require("express");
const router = new Router();
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 12 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
