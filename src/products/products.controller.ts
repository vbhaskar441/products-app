import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/index';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.productsService.getOneById(+id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
   // return this.productsService.update(+id, updateProductDto);
   return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }
}
