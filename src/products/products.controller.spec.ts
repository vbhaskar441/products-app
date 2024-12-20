import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsStub, productStub } from './stubs/products.stub';
import { CreateProductDto, UpdateProductDto } from './dto';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  const mockProductsService = {
    getAll: jest.fn().mockResolvedValue(productsStub()),
    getOneById: jest.fn().mockImplementation((id: number) =>
      Promise.resolve(productsStub().find((product) => product.product_id === id)),
    ),
    create: jest.fn().mockImplementation((dto: CreateProductDto) => Promise.resolve(productStub())),
    update: jest.fn().mockImplementation((id: number, dto: UpdateProductDto) => Promise.resolve({
      ...productStub(),
      ...dto,
    })),
    delete: jest.fn().mockResolvedValue(productStub().product_id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of products', async () => {
      const result = await productsController.getAll();
      expect(result).toEqual(productsStub());
      expect(mockProductsService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOneById', () => {
    it('should return a single product', async () => {
      const id = 1;
      const result = await productsController.getOneById(id);
      expect(result).toEqual(productStub());
      expect(mockProductsService.getOneById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the product is not found', async () => {
      mockProductsService.getOneById.mockRejectedValueOnce(new Error('Product not found'));
      await expect(productsController.getOneById(999)).rejects.toThrow('Product not found');
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createDto: CreateProductDto = {
        name: 'New Product',
        price: 12.34,
        description: 'A new product description',
      };
      const result = await productsController.create(createDto);
      expect(result).toEqual(productStub());
      expect(mockProductsService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const updateDto: UpdateProductDto = { name: 'Updated Product' };
      const id = 1;
      const result = await productsController.update(id, updateDto);
      expect(result).toEqual({ ...productStub(), ...updateDto });
      expect(mockProductsService.update).toHaveBeenCalledWith(id, updateDto);
    });

    it('should throw an error if the product is not found', async () => {
      mockProductsService.update.mockRejectedValueOnce(new Error('Product not found'));
      await expect(productsController.update(999, { name: 'Invalid' })).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing product', async () => {
      const id = 1;
      const result = await productsController.delete(id);
      expect(result).toEqual(productStub().product_id);
      expect(mockProductsService.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the product is not found', async () => {
      mockProductsService.delete.mockRejectedValueOnce(new Error('Product not found'));
      await expect(productsController.delete(999)).rejects.toThrow('Product not found');
    });
  });
});
