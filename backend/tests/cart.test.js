const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');

describe('Cart Routes', () => {
    let token;
    let userId;

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create a test user
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword,
        });

        userId = user._id;

        // Log in the user to get a token
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });

        token = res.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Cart.deleteMany({});
    });

    /** POST /cart **/

    test('POST /cart - Add item to cart (success)', async () => {
        const res = await request(app)
            .post('/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({ product: '123', name: 'Test Product', price: 10.99, quantity: 1 });

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(1);
        expect(res.body.cart.totalAmount).toBe(10.99);
    });

    test('POST /cart - Failure (missing fields)', async () => {
        const res = await request(app)
            .post('/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Product', price: 10.99 });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Product, name, price, and quantity are required.');
    });

    /** GET /cart **/

    test('GET /cart - Retrieve cart (success)', async () => {
        const res = await request(app)
            .get('/cart')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBeGreaterThan(0);
    });

    /** PUT /cart/:itemId **/

    test('PUT /cart/:itemId - Update item quantity (success)', async () => {
        // Retrieve the cart to get an itemId
        const cartRes = await request(app)
            .get('/cart')
            .set('Authorization', `Bearer ${token}`);

        const itemId = cartRes.body.cart.items[0]._id;

        const res = await request(app)
            .put(`/cart/${itemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ quantity: 2 });

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items[0].quantity).toBe(2);
        expect(res.body.cart.totalAmount).toBe(21.98); // 2 x 10.99
    });

    test('PUT /cart/:itemId - Failure (invalid quantity)', async () => {
        // Retrieve the cart to get an itemId
        const cartRes = await request(app)
            .get('/cart')
            .set('Authorization', `Bearer ${token}`);

        const itemId = cartRes.body.cart.items[0]._id;

        const res = await request(app)
            .put(`/cart/${itemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ quantity: 0 });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Quantity must be at least 1.');
    });

    /** DELETE /cart/:itemId **/

    test('DELETE /cart/:itemId - Remove item from cart (success)', async () => {
        // Retrieve the cart to get an itemId
        const cartRes = await request(app)
            .get('/cart')
            .set('Authorization', `Bearer ${token}`);

        const itemId = cartRes.body.cart.items[0]._id;

        const res = await request(app)
            .delete(`/cart/${itemId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(0);
    });

    /** DELETE /cart **/

    test('DELETE /cart - Clear entire cart (success)', async () => {
        // Add an item to the cart first
        await request(app)
            .post('/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({ product: '124', name: 'Another Product', price: 15.99, quantity: 1 });

        const res = await request(app)
            .delete('/cart')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(0);
    });
});
