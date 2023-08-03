import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpCode,
  // HttpStatus,
  Param,
  // ParseIntPipe, se lo replaza por uno nuestro
  Post,
  Put,
  Query,
  // Res,
} from '@nestjs/common';
// import { Response } from 'express';
import { ProductsService } from 'src/products/services/products.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products - Productos')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('filter')
  getFilter() {
    return { message: 'Yo soy un filtro' };
  }
  // Parameters /:id; @Param
  @Get(':productId')
  // @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // Usando el modo de Response de express para enviar un mensaje
    // $ response.status(200).send({ message: `producto optenido` });
    // Este es el metodo recomendado para enviar un mensaje si usas Nest
    return this.productsService.findOne(productId);
  }
  // Uso del decorador Query para usarlo como busqueda
  @Get()
  getQuery(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }
  // Usando el decorador Post y Body para recibir datos
  @Post()
  create(@Body() body: CreateProductDto) {
    // return {
    //   message: 'Accion para Crear Producto',
    //   body,
    // };
    return this.productsService.create(body);
  }
  // usando el decorador Put para actualizar datos
  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    // return {
    //   id,
    //   body,
    // };
    return this.productsService.update(id, body);
  }
  // usando el decorador Delete para eliminar datos
  @Delete(':id')
  delete(@Param('id') id: number) {
    // return {
    //   message: `products ${id} eliminado`,
    //   id,
    // };
    return this.productsService.remove(id);
  }
}
