import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import OrderService from './order.service';

describe('Order service unit tests', () => {
  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 1);
    const item2 = new OrderItem('i2', 'Item 2', 200, 'p2', 2);

    const order1 = new Order("i1", "client 1", [item1])
    const order2 = new Order("i2", "client 2", [item2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(500)
  });
}); 
