"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStub = exports.productsStub = void 0;
const productsStub = () => {
    return [
        {
            product_id: 1,
            name: 'Red Pen',
            price: 2.23,
            description: 'lorem ipsum dolor sit amet',
            created_at: new Date('2022-07-06T08:13:25.000Z'),
            updated_at: new Date('2022-07-06T08:13:25.000Z'),
        },
        {
            product_id: 2,
            name: 'Painting Brush',
            price: 10.9,
            description: 'some high quality painting brush',
            created_at: new Date('2022-07-06T08:13:25.000Z'),
            updated_at: new Date('2022-07-06T08:13:25.000Z'),
        },
    ];
};
exports.productsStub = productsStub;
const productStub = () => {
    return {
        product_id: 1,
        name: 'Red Pen',
        price: 2.23,
        description: 'lorem ipsum dolor sit amet',
        created_at: new Date('2022-07-06T08:13:25.000Z'),
        updated_at: new Date('2022-07-06T08:13:25.000Z'),
    };
};
exports.productStub = productStub;
//# sourceMappingURL=products.stub.js.map