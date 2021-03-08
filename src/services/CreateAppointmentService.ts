import Appointment from '../models/Appointment';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import { startOfHour } from 'date-fns';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentServices {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    /** você pode "obter" o repositório usando getCustomRepository e
     * pode acessar qualquer método criado dentro dele e qualquer método
     * no repositório de entidade padrão. */

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // não permitir que o usuário crie um agendamento no mesmo horário
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentServices;
