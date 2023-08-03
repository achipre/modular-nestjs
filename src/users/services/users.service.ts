import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'ejemplo@mail.com',
      password: 'hsHdifVCjki',
      role: 'admin',
    },
  ];
  // Servicio para obtener todos los usuarios
  getAll() {
    const apiKey = this.configService.get('API_KEY');
    console.log(apiKey);

    return this.users;
  }
  // Servicio para obtener un usuario por su id
  getOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con el id ${id} no fue encontrado`);
    }
    return user;
  }
  // --------------------------------------------
  getOrdersByUser(id: number): Order {
    const user = this.getOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
  // --------------------------------------------
  // Servicio para crear un nuevo usuario
  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  // Actualizar un usuario por su id
  update(id: number, payload: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      this.users[index] = {
        ...this.users[index],
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }
  // ELiminar un usuario por su id
  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`Usuarion con el id ${id} no fue encontrado`);
    }
    this.users.splice(index, 1);
    return {
      message: `Usuario con el id ${id} ha sido Elimindao`,
    };
  }
}
