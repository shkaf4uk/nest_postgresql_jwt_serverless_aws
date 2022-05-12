import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {IRoleCreate} from "../interfaces/role-create.interface";
import {RolesService} from "./roles.service";

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @Post()
    create (@Body() dto: IRoleCreate) {
        return this.rolesService.createRole(dto)
    }

    @Get('/:value')
    getRoleByValue (@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}
