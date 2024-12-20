import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsStub, productStub } from './stubs/products.stub';
import { CreateProductDto, UpdateProductDto } from './dto/index';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  const mockProductsService = {
    getAll: jest.fn().mockResolvedValue(productsStub()),
    getOneById: jest.fn().mockImplementation((id: number) => {
      const product = productsStub().find((p) => p.product_id === id);
      if (!product) throw new Error(`Product with id ${id} not found`);
      return product;
    }),
    create: jest.fn().mockImplementation((dto: CreateProductDto) => ({
      ...dto,
      product_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    })),
    update: jest.fn().mockImplementation((id: number, dto: UpdateProductDto) => ({
      ...productStub(),
      ...dto,
      updated_at: new Date(),
    })),
    delete: jest.fn().mockImplementation((id: number) => id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
    expect(productsService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of products', async () => {
      const products = await productsController.getAll();
      expect(products).toEqual(productsStub());
      expect(mockProductsService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOneById', () => {
    it('should return a single product by id', async () => {
      const product = await productsController.getOneById(1);
      expect(product).toEqual(productStub());
      expect(mockProductsService.getOneById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(mockProductsService, 'getOneById').mockRejectedValueOnce(new Error('Product with id 99 not found'));
      await expect(productsController.getOneById(99)).rejects.toThrow('Product with id 99 not found');
    });
  });

  describe('create', () => {
    it('should create and return a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Blue Marker',
        price: 5.5,
        description: 'some high quality test',
      };

      const newProduct = await productsController.create(createProductDto);
      expect(newProduct).toEqual({
        ...createProductDto,
        product_id: 3,
        description: 'some high quality test',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      const updateProductDto: UpdateProductDto = {
        price: 3.0,
        description: 'new update',
      };

      const updatedProduct = await productsController.update(1, updateProductDto);
      expect(updatedProduct).toEqual({
        ...productStub(),
        ...updateProductDto,
        updated_at: expect.any(Date),
      });
      expect(mockProductsService.update).toHaveBeenCalledWith(1, updateProductDto);
    });
  });

  describe('delete', () => {
    it('should delete the product and return the id', async () => {
      const deletedId = await productsController.delete(1);
      expect(deletedId).toEqual(1);
      expect(mockProductsService.delete).toHaveBeenCalledWith(1);
    });
  });
});