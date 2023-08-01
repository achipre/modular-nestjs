import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  // getCategory y products mediante dos Params
  @Get(':categoryId/products/:productId')
  getCaterory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return { message: `category ${categoryId} and products ${productId}` };
  }
}
