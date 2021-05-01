import User from '../infra/typeorm/entities/User';

import ICreateUsertDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUsertDTO): Promise<User>;
  save(user: User): Promise<User>;
}
