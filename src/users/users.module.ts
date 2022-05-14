import {forwardRef, Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./schemas/user.schema";
import {Role} from "../roles/schemas/role.schema";
import {UsersRoles} from "./schemas/users-roles.schema";
import {RolesService} from "../roles/roles.service";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/schemas/post.schema";
import {PostsModule} from "../posts/posts.module";

@Module({
    providers: [UsersService, RolesService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User, Role, UsersRoles, Post]),
        forwardRef(() => AuthModule)
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
