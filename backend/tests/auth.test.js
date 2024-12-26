const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('Auth Routes', () => {
    let token;

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({ name: 'Test User', email: 'test@example.com', password: hashedPassword });
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    /** POST /auth/login **/

    test('POST /auth/login - Success (valid credentials)', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.message).toBe('Login successful.');
        token = res.body.token; // Save token for future tests
    });

    test('POST /auth/login - Failure (invalid email)', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'invalid@example.com', password: 'password123' });

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Invalid email or password.');
    });

    test('POST /auth/login - Failure (invalid password)', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Invalid email or password.');
    });

    test('POST /auth/login - Failure (missing fields)', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: '' });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Email and password are required.');
    });

    /** POST /auth/register **/

    test('POST /auth/register - Success', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ name: 'New User', email: 'newuser@example.com', password: 'newpassword123' });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Registration successful. Please log in.');
    });

    test('POST /auth/register - Failure (email already registered)', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ name: 'Duplicate User', email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Email is already registered.');
    });

    test('POST /auth/register - Failure (missing fields)', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ name: '', email: '', password: '' });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Name, email, and password are required.');
    });

    /** POST /auth/logout **/

    test('POST /auth/logout - Success', async () => {
        const res = await request(app)
            .post('/auth/logout')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Logout successful.');
    });

    test('POST /auth/logout - Failure (no token)', async () => {
        const res = await request(app)
            .post('/auth/logout');

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Access denied, no token provided.');
    });

    /** GET /auth/profile **/

    test('GET /auth/profile - Success (valid token)', async () => {
        const res = await request(app)
            .get('/auth/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe('test@example.com');
    });

    test('GET /auth/profile - Failure (no token)', async () => {
        const res = await request(app)
            .get('/auth/profile');

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Access denied, no token provided.');
    });

    test('GET /auth/profile - Failure (invalid token)', async () => {
        const res = await request(app)
            .get('/auth/profile')
            .set('Authorization', 'Bearer invalidtoken');

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid token.');
    });
});
