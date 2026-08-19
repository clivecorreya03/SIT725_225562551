const expect = require('chai').expect;
const request = require('request');

const { add } = require('../calculator');

describe('Sum Calculator API', function () {

    const baseUrl = 'http://localhost:3000';

    // TEST 1
    // Valid behaviour - home REST API
    it('should return status 200 when API is running', function (done) {

        request(baseUrl, function (error, response, body) {

            expect(response.statusCode).to.equal(200);
            expect(body).to.include('Welcome to the Sum Calculator API');

            done();
        });
    });


    // TEST 2
    // Valid behaviour - add endpoint
    it('should return the correct sum for valid numbers', function (done) {

        request.get(
            `${baseUrl}/add?a=10&b=5`,
            function (error, response, body) {

                expect(response.statusCode).to.equal(200);
                expect(body).to.include('15');

                done();
            }
        );
    });


    // TEST 3
    // Invalid behaviour - missing parameter
    it('should return status 400 when a parameter is missing', function (done) {

        request.get(
            `${baseUrl}/add?a=10`,
            function (error, response, body) {

                expect(response.statusCode).to.equal(400);
                expect(body).to.equal('Invalid input');

                done();
            }
        );
    });


    // TEST 4
    // Invalid behaviour - non-numeric values
    it('should return status 400 for non-numeric input', function (done) {

        request.get(
            `${baseUrl}/add?a=hello&b=world`,
            function (error, response, body) {

                expect(response.statusCode).to.equal(400);
                expect(body).to.equal('Invalid input');

                done();
            }
        );
    });

});


describe('Calculation Function', function () {

    // TEST 5
    // Normal calculation
    it('add() should correctly add two positive numbers', function () {

        const result = add(2, 3);

        expect(result).to.equal(5);
    });


    // TEST 6
    // Edge case - negative numbers
    it('add() should correctly handle negative numbers', function () {

        const result = add(-5, -3);

        expect(result).to.equal(-8);
    });


    // TEST 7
    // Edge case - decimal values
    it('add() should correctly add decimal numbers', function () {

        const result = add(2.5, 3.5);

        expect(result).to.equal(6);
    });


    // TEST 8
    // Edge case - zero
    it('add() should correctly handle zero', function () {

        const result = add(0, 5);

        expect(result).to.equal(5);
    });

});