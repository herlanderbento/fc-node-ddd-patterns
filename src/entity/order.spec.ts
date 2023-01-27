import Order from './order';
import OrderItem from './order_item';

describe('Order unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', []);
    }).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      let order = new Order('123', '', []);
    }).toThrowError('CustomerId is required');
  });

  it('should throw error when Items is empty', () => {
    expect(() => {
      let order = new Order('123', '123', []);
    }).toThrowError('Items are required');
  });

  it('should able calculate total', () => {
    const item = new OrderItem('1', 'Item 1', 100);
    const item2 = new OrderItem('2', 'Item 2', 200);
    const order = new Order('1', 'Order 1', [item]);

    let total = order.total();

    expect(total).toBe(100);

    const order2 = new Order('1', 'Order 1', [item, item2]);
    total = order2.total();
    expect(total).toBe(300);
  });
});
