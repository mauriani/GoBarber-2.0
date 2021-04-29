// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordService from './SendForgotPasswordEmailService';

describe('SendForgotPassword', () => {
  it('should be able to rocover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    // aqui vamos verificar se a nossa função send dentro do fake foi chamada
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPassword = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    // criando o usuário
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
