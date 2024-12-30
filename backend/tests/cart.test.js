const request = require('supertest');
const app = require('../server');
const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');
const User = require('../models/User');

describe('Cart Routes for Unauthenticated User', () => {
    let sessionCookie; // Will hold the session cookie

    afterAll(async () => {
        await Cart.deleteMany({}); // Clean up any test data
    });

    test('GET /cart - Initialize an empty cart', async () => {

        const res = await request(app).get('/cart');
        sessionCookie = res.headers['set-cookie'];

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(0);
        expect(res.body.cart.totalAmount).toBe(0);

    });

    test('POST /cart - Add an item to the cart', async () => {

        const item = { product: '123', name: 'Test Product', price: 10.99, quantity: 1 };

        const res = await request(app)
            .post('/cart')
            .set('Cookie', sessionCookie) // Pass session cookie
            .send(item);

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(1);
        expect(res.body.cart.totalAmount).toBe(10.99);

    });

    test('PUT /cart/:itemId - Modify an existing item in the cart', async () => {

        const cartRes = await request(app).get('/cart').set('Cookie', sessionCookie);
        const itemId = cartRes.body.cart.items[0]._id;


        const res = await request(app)
            .put(`/cart/${itemId}`)
            .set('Cookie', sessionCookie)
            .send({ quantity: 2 });


        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items[0].quantity).toBe(2);
        expect(res.body.cart.totalAmount).toBe(21.98);

    });

    test('DELETE /cart/:itemId - Remove an existing item from the cart', async () => {

        const cartRes = await request(app).get('/cart').set('Cookie', sessionCookie);
        const itemId = cartRes.body.cart.items[0]._id;


        const res = await request(app)
            .delete(`/cart/${itemId}`)
            .set('Cookie', sessionCookie);


        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(0);
        expect(res.body.cart.totalAmount).toBe(0);

    });

    test('DELETE /cart - Clear the entire cart', async () => {

        await request(app)
            .post('/cart')
            .set('Cookie', sessionCookie)
            .send({ product: '456', name: 'Another Product', price: 15.99, quantity: 1 });

        const res = await request(app).delete('/cart').set('Cookie', sessionCookie);


        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(0);
        expect(res.body.cart.totalAmount).toBe(0);

    });
});

describe('Cart Routes for Authenticated User with a New Cart', () => {
    let token;
    let userId;

    beforeAll(async () => {

        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create a test user
        const user = await User.create({
            name: 'Authenticated User',
            email: 'authuser@example.com',
            password: hashedPassword,
        });

        userId = user._id;

        // Log in the user to get a token
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'authuser@example.com', password: 'password123' });

        token = res.body.token;

    });

    afterAll(async () => {
        await User.deleteMany({});
        await Cart.deleteMany({});
    });

    test('GET /cart - Initialize an empty cart', async () => {

        const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);


        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.user).toBe(userId.toString());
        expect(res.body.cart.items.length).toBe(0);
        expect(res.body.cart.totalAmount).toBe(0);
    });

    test("POST /cart - Add an item to the cart", async () => {
        const item = {
            product: productId.toString(),
            name: "Test Product",
            price: 19.99,
            quantity: 1,
        };
    
        const res = await request(app)
            .post("/cart")
            .set("Authorization", `Bearer ${token}`)
            .send(item);
    
        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.user).toBe(userId.toString());
        expect(res.body.cart.items.length).toBe(1);
        expect(res.body.cart.totalAmount).toBe(19.99);
    });
    
    test('PUT /cart/:itemId - Modify an existing item in the cart', async () => {

        const cartRes = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
        const itemId = cartRes.body.cart.items[0]._id;


        const res = await request(app)
            .put(`/cart/${itemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ quantity: 3 });


        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items[0].quantity).toBe(3);
        expect(res.body.cart.totalAmount).toBe(59.97);

    });

    test('DELETE /cart/:itemId - Remove an existing item from the cart', async () => {

        const cartRes = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
        const itemId = cartRes.body.cart.items[0]._id;


        const res = await request(app)
            .delete(`/cart/${itemId}`)
            .set('Authorization', `Bearer ${token}`);


        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(0);
        expect(res.body.cart.totalAmount).toBe(0);

    });

    test('DELETE /cart - Clear the entire cart', async () => {
        await request(app)
            .post('/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({ product: '456', name: 'Another Auth Product', price: 29.99, quantity: 1 });

        const res = await request(app).delete('/cart').set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.cart).toBeDefined();
        expect(res.body.cart.items.length).toBe(0);
        expect(res.body.cart.totalAmount).toBe(0);

    });
});