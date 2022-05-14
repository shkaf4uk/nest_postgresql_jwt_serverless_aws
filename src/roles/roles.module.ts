import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./schemas/role.schema";
import {User} from "../users/schemas/user.schema";
import {UsersRoles} from "../users/schemas/users-roles.schema";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UsersRoles])
  ]
})
export class RolesModule {}
