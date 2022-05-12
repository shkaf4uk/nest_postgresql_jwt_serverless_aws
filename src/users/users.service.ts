import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private rolesService: RolesService
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userModel.create(dto)
            const role = await this.rolesService.getRoleByValue('USER')
            await user.$set('roles', [role.id])
            user.roles = [role]
            return user
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async getUserByEmail(email: string) {
        try {
            return this.userModel.findOne({where: {email}, include: {all: true}})
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async getAll() {
        try {
            return await this.userModel.findAll({include: {all: true}})
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
