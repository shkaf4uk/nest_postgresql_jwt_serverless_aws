import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto'
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "../schemas/role.schema";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleSchema: typeof Role) {}

    async createRole (dto: CreateRoleDto) {
        try {
            return await this.roleSchema.create(dto)
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async getRoleByValue (value: string) {
        try {
            return await this.roleSchema.findOne({where: {value}})
        } catch (e) {
            console.log(e)
            throw e
        }
    }

}
