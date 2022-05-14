import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {IUsersRoles} from "../interfaces/users-roles.interface";
import {User} from "./user.schema";
import {Role} from "../../roles/schemas/role.schema";

@Table({tableName: 'users-roles', createdAt: false, updatedAt: false})
export class UsersRoles extends Model<UsersRoles, IUsersRoles> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number
}
