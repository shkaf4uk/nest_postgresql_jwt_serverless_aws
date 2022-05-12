import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { IRoleCreate } from "src/interfaces/role-create.interface";
import {User} from "./user.schema";
import {UsersRoles} from './users-roles.schema'

@Table({tableName: 'roles'})
export class Role extends Model<Role, IRoleCreate> {
    @ApiProperty({example: 2, description: 'Unique ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'ADMIN', description: 'Unique user role'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @ApiProperty({example: 'administration', description: 'Role description'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany(() => User, () => UsersRoles)
    users: User[]
}
