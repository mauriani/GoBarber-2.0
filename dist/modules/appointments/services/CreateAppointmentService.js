"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _getHours = _interopRequireDefault(require("date-fns/getHours"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAppointmentServices {
  constructor(appointmentsRepository, notificationsRepository, cacheProvider) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    date,
    user_id,
    provider_id
  }) {
    /** você pode "obter" o repositório usando getCustomRepository e
     * pode acessar qualquer método criado dentro dele e qualquer método
     * no repositório de entidade padrão. */
    const appointmentDate = (0, _dateFns.startOfHour)(date); // se minha data for antes da data atual

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppError.default("You can't create an appointment on a past date");
    } // não pode criar um agendamento com o user_id sendo o mesmo provider_id


    if (user_id === provider_id) {
      throw new _AppError.default("You can't create an appointment with yourself");
    }

    if ((0, _getHours.default)(appointmentDate) < 8 || (0, _getHours.default)(appointmentDate) > 17) {
      throw new _AppError.default("You can't only create appointment between 8am an 5pm");
    } // não permitir que o usuário crie um agendamento no mesmo horário


    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

    if (findAppointmentInSameDate) {
      throw new _AppError.default('This appointment is already booked', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    }); //formatando a data

    const dateFormatted = (0, _dateFns.format)(appointmentDate, "dd/MM/yyyy 'ás' HH:mm 'h'"); // enviando a notificacao

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}`
    });
    await this.cacheProvider.invalidate(`provider-appointments: ${provider_id}:${(0, _dateFns.format)(appointmentDate, 'yyyy-M-d')}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentServices;
exports.default = _default;