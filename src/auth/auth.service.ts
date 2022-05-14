import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/schemas/user.schema";
import {ExceptionHandler} from "@nestjs/core/errors/exception-handler";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async login(userDto: CreateUserDto) {
        try {
            const user = await this.validateUser(userDto)
            return this.generateToken(user)
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async registration(userDto: CreateUserDto) {
        try {
            const candidate = await this.userService.getUserByEmail(userDto.email)
            if (candidate) throw new HttpException('Email is not unique', HttpStatus.BAD_REQUEST)
            const hashPassword = await bcrypt.hash(userDto.password, 5)
            const user = await this.userService.create({...userDto, password: hashPassword})
            return this.generateToken(user)
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    private generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        try {
            const user = await this.userService.getUserByEmail(userDto.email)
            const passwordEquals = await bcrypt.compare(userDto.password, user.password)
            if (user && passwordEquals) {
                return user
            }
            throw new UnauthorizedException({message: 'Email or password is not correct'})
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
