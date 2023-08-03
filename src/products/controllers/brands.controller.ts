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
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Brands - Marcas')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}
  // Obtener todas las marcas
  @ApiOperation({ summary: 'Lista todas las marcas' })
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }
  // Obtener una marca por su id
  @Get(':id')
  @ApiOperation({ summary: 'Lista una marcas por su ID' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }
  // Crear con el Decorador @Post()
  @Post()
  @ApiOperation({ summary: 'Crea y agrega una nueva marca' })
  create(@Body() body: CreateBrandDto) {
    return this.brandsService.create(body);
  }
  // Actualizar una marca con el decorador @Put()
  @ApiOperation({ summary: 'Actualiza o edita una marca ya existente' })
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateBrandDto) {
    return this.brandsService.update(id, body);
  }
  // Eliminar una marca con el decorador @Delete()
  @ApiOperation({ summary: 'Elimina una marca especificando su ID' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(id);
  }
}
