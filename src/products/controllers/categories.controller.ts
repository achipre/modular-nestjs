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
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories - Categorias')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  // Controlador para encontrar todas las categorias
  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }
  // Controlador para encontrar una categoria por su id
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }
  // Controlador para crear una nueva categoria
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }
  // Controlador para actualizar una categoria por su id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }
  // Controler para eliminar una categoria por su id
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
