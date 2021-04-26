import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentServices from './CreateAppointmentService';

// Categorizando os nossos testes
// it - significa isso

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    // fakeappoint onde os dados são salvos
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    // CRIANDO O SERVICE
    // meu create appoint espera dois parametros (create e findByEmail),
    // passamos a fake api onde temos essas funcionalidades.
    const createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    // espero que meu appointment tenha um id
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2021, 4, 26, 15);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
