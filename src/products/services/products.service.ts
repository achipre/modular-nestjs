import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto Ropa',
      description: 'Ropa de persona mayor',
      price: 50,
      stock: 10,
      image: 'https://picsum.photos/200/300',
    },
  ];
  // Encontrar todos los productos
  findAll() {
    return this.products;
  }
  // Encontrar un producto por su id
  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Producto ${id} no encontrada`);
    }
    return product;
  }

  // Crear un nuevo producto
  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  // Actualizar un producto por su id
  update(id: number, payload: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id == id);
    if (index >= 0) {
      this.products[index] = {
        ...this.products[index],
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  // Delete un producto por su id
  remove(id: number) {
    const index = this.products.findIndex((product) => product.id == id);
    if (index === -1) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    this.products.splice(index, 1);
    return { message: `Producto ${id} Eliminado` };
  }
}
