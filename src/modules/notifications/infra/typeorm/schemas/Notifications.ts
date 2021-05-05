import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string; // mensagem

  @Column('uuid')
  recipient_id: string; // quem vou enviar

  @Column({ default: false })
  read: boolean; // lida ou não

  @CreateDateColumn()
  created_ate: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
