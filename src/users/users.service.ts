import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {createUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {
    }

    async create(dto: createUserDto) {
        return await this.userModel.create(dto)
    }

    async getAll() {
        return await this.userModel.findAll()
    }
}
