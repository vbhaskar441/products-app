import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/index';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAll(): Promise<import("./product.entity").Product[]>;
    getOneById(id: number): Promise<import("./product.entity").Product>;
    create(createProductDto: CreateProductDto): Promise<import("./product.entity").Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<import("./product.entity").Product>;
    delete(id: number): Promise<number>;
}
