import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Adidas',
      image:
        'https://www.adidas.com/content/dam/adidas/en_us/brand/adidas-logo.png',
    },
  ];
  // Encontrar todas las marcas
  findAll() {
    return this.brands;
  }
  // Retornar una marca por su id
  findOne(id: number) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} no encontrada`);
    }
    return brand;
  }
  // Crear una nueva marca
  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
  // Actualizar una marca por su id
  update(id: number, payload: UpdateBrandDto) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index >= 0) {
      this.brands[index] = {
        ...this.brands[index],
        ...payload,
      };
      return this.brands[index];
    }
    return null;
  }
  // Delete un producto por su id
  remove(id: number) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    console.log(this.brands.findIndex((brand) => brand.id === id));

    if (index === -1) {
      throw new NotFoundException(`Brand ${id} no encontrada`);
    }
    this.brands.splice(index, 1);
    return {
      message: `Brand ${id} Eliminado`,
    };
  }
}
