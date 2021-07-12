"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const usersController = new _UsersController.default();
const userAvatarController = new _UserAvatarController.default();
const upload = (0, _multer.default)(_upload.default.multer);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  })
}), usersController.create); // vamos criar um rota para alterar um único usuário, por isso estamos utilizando o patch

usersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar')
/** nome do campo que vai conter essa imagem */
, userAvatarController.update);
var _default = usersRouter;
exports.default = _default;