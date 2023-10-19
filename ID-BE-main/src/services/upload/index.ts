import fs from 'fs';
import SftpService from '../sftp';

class UploadService {
    public sftpService = new SftpService();

  private async upload(filename: string, data: Buffer): Promise<any> {
    const name = `public/upload/${filename}`;
    return new Promise((resolve, reject) => {
        fs.writeFile(name, data, { flag: 'w'}, async (err) => {
            if (err) return reject(err);
            console.log('====> File is uploaded successfully!!!!');
            try {
                const res = await this.sftpService.uploadFile('public/upload/', filename);
                console.log(res)
                return resolve({uploaded: true});
            } catch (err) {
                console.log(err);
            }
        });
    });
  }
  public async uploadFile(filename: string, data: Buffer): Promise<string> {
    const res = await this.upload(filename, data);
    console.log('===================')
    return res;
  }
}

export default UploadService;
