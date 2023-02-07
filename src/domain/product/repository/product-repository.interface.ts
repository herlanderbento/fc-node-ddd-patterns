import Product from '../entity/product';
import RepositoryInterface from '../../_shared/repository/implementations/repository-interface';


export default interface ProductRepositoryInterface extends RepositoryInterface<Product>{}