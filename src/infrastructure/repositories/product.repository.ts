import Product from '../../domain/entity/product';
import ProductRepositoryInterface from '../../domain/repository/product-repository.interface';
import ProductModel from '../db/sequelize/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: Product): Promise<void> {
    const { id, name, price } = product;

    await ProductModel.create({
      id,
      name,
      price,
    });
  }

  async update(product: Product): Promise<void> {
    const { id, name, price } = product;

    await ProductModel.update(
      {
        name,
        price,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  async findById(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });

    const { id: productId, name, price } = productModel;

    return new Product(productId, name, price);
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map(
      ({ id, name, price }) => new Product(id, name, price)
    );
  }
}
