"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("./implementations/HandlebarsMailTemplateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mapeamento do meu mmodels
const providers = {
  handlebars: _HandlebarsMailTemplateProvider.default
};

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebars);