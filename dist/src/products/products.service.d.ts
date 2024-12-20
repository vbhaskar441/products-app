import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/index';
import { Product } from './product.entity';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    getAll(): Promise<Product[]>;
    getOneById(id: number): Promise<Product>;
    create(product: CreateProductDto): Promise<Product>;
    update(id: number, product: UpdateProductDto): Promise<Product>;
    delete(id: number): Promise<number>;
}
