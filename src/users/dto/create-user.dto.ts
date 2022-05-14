import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'Email'})
    @IsString({message: 'Email must be type string'})
    @IsEmail({}, {message: 'Email is not correct'})
    readonly email: string

    @ApiProperty({example: '123456', description: 'Password'})
    @IsString({message: 'Password must be type string'})
    @Length(6, 20, {message: 'Password length must be more than 6 and less than 20'})
    readonly password: string
}
