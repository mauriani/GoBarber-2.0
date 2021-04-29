import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  sedMail(to: string, body: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private messages: IMessage[] = [];
  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}
