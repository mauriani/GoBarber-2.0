"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Categorizando os nossos testes
// it - significa isso
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 3, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 3, 13),
      user_id: 'user_id',
      provider_id: 'provider_id'
    }); // espero que meu appointment tenha um id

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 26, 15);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider_id'
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // agedamento em datas passadas

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 3, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2021, 4, 3, 11),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // não pode criar um agendamento com o user_id sendo o mesmo provider_id

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 3, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2021, 4, 3, 13),
      user_id: 'user_id',
      provider_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // o usuário só pode fazer agendamento entee 8 ás 17hrs.

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2021, 4, 11, 7),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2021, 4, 11, 18),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});