import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./schemas/post.schema";
import {CreatePostDto} from "./dto/create-post.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post)
                private postSchema: typeof Post,
                private filesService: FilesService) {}

    async create(dto: CreatePostDto, image: Express.Multer.File) {
        try {
            const fileName = await this.filesService.createFile(image)
            return await this.postSchema.create({...dto, image: fileName})
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
