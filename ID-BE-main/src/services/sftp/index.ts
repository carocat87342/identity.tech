import fs from 'fs';
import Client from "ssh2-sftp-client";

class SftpService {
  private options = {
    host: process.env.SFTP_HOST,
    port: 22,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD
  };
  private sftpClient: Client = new Client();
  private remote = process.env.SFTP_DIR || '/Tokenize/';

  private async upload(localPath: string, filename: string): Promise<any> {
    console.log('sftp uploading...')
    return new Promise((resolve, reject) => {
      let data = fs.createReadStream(localPath + filename);
      this.sftpClient.connect(this.options)
        .then(() => {
          console.log("ooooo => connected to sftp server successfully <= ooooo");
          console.log('Path = ', this.remote + filename);
          return this.sftpClient.put(data, this.remote + filename);
        })
        .then(async () => {
            console.log("ooooo => closed sftp connection successfully <= ooooo");
            await this.sftpClient.end();
            return resolve({uploaded: true})
        })
        .catch(err => {
            console.log('xxxxx => SFTP error <= xxxxx');
            console.error(err.message);
            return reject(err.message);
        });
    });
  }
  public async uploadFile(localPath: string, filename: string): Promise<string> {
    const res = await this.upload(localPath, filename);
    return res;
  }
}

export default SftpService;
