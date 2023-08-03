import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Alex',
      lastName: 'Chipre',
      phone: '36288492',
    },
  ];
  // Obtener todos los clientes
  findAll() {
    return this.customers;
  }
  // Obtener un cliente por su id
  getOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return customer;
  }
  // Crear un nuevo cliente
  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  // Actualizar un cliente por su id
  update(id: number, payload: UpdateCustomerDto) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index >= 0) {
      this.customers[index] = {
        ...this.customers[index],
        ...payload,
      };
      return this.customers[index];
    }
    return null;
  }
  // Eliminar un cliente por su id
  remove(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    this.customers.splice(index, 1);
    return { message: `Cliente ${id} Eliminado` };
  }
}
