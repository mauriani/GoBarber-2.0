import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    // variavel
    const hashedPassword = await hash(password, 8);

    // criando o user
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // cria no banco
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
