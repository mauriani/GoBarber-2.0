// Vai definir qual o formato dos dados para criar um Appointment

export default interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}
