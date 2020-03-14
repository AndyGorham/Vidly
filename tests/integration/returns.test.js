const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const request = require('supertest');
const mongooose = require('mongoose');

// Globals
let server;
let customerId;
let rental;
let token;

describe('/api/returns', () => {
    const exec = () => {
        return request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send({ customerId, movieId });

    }

    beforeEach(async () => { 
        // Start server
        server = require('../../index');
        // Create object IDs
        customerId = mongooose.Types.ObjectId()
        movieId = mongooose.Types.ObjectId();
        // Create new rental object
         rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2

            }
        });
        // Save rental to DB
        await rental.save();
        // Create new token
        token = new User().generateAuthToken();
    });

    afterEach(async () => {
        // Close server connection
        await server.close();
        // Remove all rentals
        await Rental.remove({});
    })

    it('should return 401 if client is not logged in', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    })

    
    it('should return 400 if customer Id is not provided', async () => {
        customerId = '';
        const res = await exec();

        expect(res.status).toBe(400);
    })

    it('should return 400 if movie Id is not provided', async () => {
        movieId = '';
        const res = await exec();

        expect(res.status).toBe(400);
    })

    it('should return 404 if no movie found for the customer/movie combo', () => {
        await Rental.remove({});
        const res = await exec();

        expect(res.status).toBe(404);
    })

    it('should return 400 if rental already processed', () => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400);
    })

    
    it('should return 200 if rental already processed', () => {
        const res = await exec();

        expect(res.status).toBe(200);
    })

        
    it('should set the returnDate if input is valid', () => {
        const res = await exec();

        expect(res.status).toBe(200);
    })
})