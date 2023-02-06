import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerRepositoryInterface from '../../domain/repository/customer-repository.interface';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    const { id, name, Address, rewardPoints } = entity;
    const { street, number, zip: zipcode, city } = Address;

    await CustomerModel.create({
      id,
      name,
      street,
      number,
      zipcode,
      city,
      active: entity.isActive(),
      rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    const { id, name, Address, rewardPoints } = entity;
    const { street, number, zip: zipcode, city } = Address;

    await CustomerModel.update(
      {
        name,
        street,
        number,
        zipcode,
        city,
        active: entity.isActive(),
        rewardPoints,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  async findById(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Customer not found');
    }

    const { name, street, number, zipcode, city } = customerModel;

    const customer = new Customer(id, name);

    const address = new Address(street, number, zipcode, city);

    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      const { id, name, street, number, zipcode, city, rewardPoints, active } =
        customerModels;

      let customer = new Customer(id, name);

      customer.addRewardPoints(rewardPoints);
      const address = new Address(street, number, zipcode, city);
      customer.changeAddress(address);
      if (active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
