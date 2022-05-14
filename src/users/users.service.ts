import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private rolesService: RolesService
    ) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userModel.create(dto)
            const role = await this.rolesService.getRoleByValue('ADMIN')
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

    async addRole(dto: AddRoleDto) {
        try {
            const user = await this.userModel.findByPk(dto.userId)
            const role = await this.rolesService.getRoleByValue(dto.value)
            if (user && role) {
                await user.$add('roles', role.id)
                return dto
            }
            return new HttpException('Role or user not found', HttpStatus.NOT_FOUND)
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async banUser(dto: BanUserDto) {
        try {
            const user = await this.userModel.findByPk(dto.userId)
            if (!user) {
                return new HttpException('User not found', HttpStatus.NOT_FOUND)
            }
            user.banned = true
            user.banReason = dto.banReason
            await user.save()
            return user
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
