import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
  create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification>;
}
