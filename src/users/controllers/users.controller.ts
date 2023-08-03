import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users - Usuarios')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // constrolador para optener todos los usuarios
  @Get()
  getAll() {
    return this.usersService.getAll();
  }
  // Constructor para optener un usuario por su id
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }
  // ----------------------------------------
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrdersByUser(id);
  }
  // ----------------------------------------
  // Controlador para crear un nuevo usuario
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
  // Controlador para actualizar un usuario por su id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }
  // Controlador para eliminar un usuario por su id
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
