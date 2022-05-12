import {ApiProperty} from "@nestjs/swagger";

export class createUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'Email'})
    readonly email: string
    @ApiProperty({example: '123456', description: 'Password'})
    readonly password: string
}
