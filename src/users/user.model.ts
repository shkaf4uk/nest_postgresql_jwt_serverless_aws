import {Column, DataType, Model, Table} from "sequelize-typescript";
import {IUserCreate} from '../interfaces/user-create.interface'
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'users'})
export class User extends Model<User, IUserCreate> {
    @ApiProperty({example: 2, description: 'Unique ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'example@gmail.com', description: 'Unique user email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: '123456', description: 'Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: false, description: 'Banned or not'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @ApiProperty({example: 'Toxic', description: 'Ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string
}
