import fs from 'fs';
import path from 'path';
import uploadConfrig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // estamos movendo o arquivo enviado para a pasta de uploads
    await fs.promises.rename(
      path.resolve(uploadConfrig.tmpFolder, file),
      path.resolve(uploadConfrig.uploadsFolder, file),
    );

    return file;
  }
  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfrig.uploadsFolder, file);

    // verifica se o arquivo existe
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // se encontrou o arquivo faz isso

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
