// import da injeção de depêndencia
import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  // toda vez que minha apicacao precisar usar
  'StorageProvider',
  // use
  DiskStorageProvider,
);
