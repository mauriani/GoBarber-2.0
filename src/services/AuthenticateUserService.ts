import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    // validação - verifica se o usuário é válido

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    // caso o usuário não tenha sido encontrado
    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // caso tenha sido encontrado, caí aqui
    // user.password - senha criptografada
    // password - senha não criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    // Usuário authenticado

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
