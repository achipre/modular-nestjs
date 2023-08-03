import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Shoes',
    },
  ];
  // Encontrar todas las categorias
  findAll() {
    return this.categories;
  }
  //  Encontrar una categoria por su id
  findOne(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Categoria ${id} no encontrada`);
    }
    return category;
  }
  // Crear una nueva categoria
  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  // Actualizar una categoria por su id
  update(id: number, payload: UpdateCategoryDto) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index >= 0) {
      this.categories[index] = {
        ...this.categories[index],
        ...payload,
      };
      return this.categories[index];
    }
    return null;
  }
  // Delete un producto por su id
  remove(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundException(`Categoria ${id} no encontrada`);
    }
    this.categories.splice(index, 1);
    return { message: `Categoria ${id} Eliminada` };
  }
}
