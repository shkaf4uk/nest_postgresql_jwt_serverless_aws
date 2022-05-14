import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import {v4} from 'uuid'

@Injectable()
export class FilesService {

    async createFile (file): Promise<string> {
        try {
            const fileName = v4() + '.' + file.originalname.split('.')[1]
            const pathFile = path.resolve(__dirname, 'static')
            if (!fs.existsSync(pathFile)){
                await fs.mkdirSync(pathFile, {recursive: true});
            }
            await fs.promises.writeFile(path.join(pathFile, fileName), file.buffer);
            return fileName
        } catch (e) {
            console.log(e)
            throw new HttpException('Error with write file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
