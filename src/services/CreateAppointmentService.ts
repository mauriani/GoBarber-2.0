import Appointment from '../models/appointment';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import { startOfHour } from 'date-fns';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentServices {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
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
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentServices;
