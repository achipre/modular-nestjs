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
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers - Clientes')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  // Contolador para optener todos los clientes
  @Get()
  getAll() {
    return this.customersService.findAll();
  }
  // Controlador para optener un cliente por su id
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.getOne(id);
  }
  // Controlador para crear un nuevo cliente
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }
  // Controlador para actualizar un cliente por su id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }
  // Controlador para eliminar un cliente por su id
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
