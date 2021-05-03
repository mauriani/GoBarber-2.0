import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    // primeiro vamos iniciar procurando o nosso userToken
    const userToken = await this.userTokensRepository.findByToken(token);

    // tratamento de token, existe ou nao
    if (!userToken) {
      throw new AppError('User token does not exist');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    // tratamento de token, existe ou nao

    if (!user) {
      throw new AppError('User token does not exist');
    }

    // pega o horário que o token foi criado
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    // compara o horario de criacao com a atual e expira o token caso seja maior que 2hours

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    // Funcionou assim
    // if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
    //   throw new AppError('Token expired');
    // }

    // gera o hash

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
