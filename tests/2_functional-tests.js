const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let validPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let completePuzzle = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

suite('Functional Tests', function() {
    this.timeout(100000);
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: validPuzzle
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.solution, completePuzzle);
                setTimeout(done, 3000);
            })
    })

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field missing');
                setTimeout(done, 3000);
            });
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: '..9..5.j.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                setTimeout(done, 3000);
            })
    })

    test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..8931434'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                setTimeout(done, 3000);
            })
    })

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: '..9..5.1.85.4...22432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4...22432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '7'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, true);
                setTimeout(done, 3000);
            })

    })

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4...22432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '3'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict, 'region');
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4...22432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '8'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 2);
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4...22432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '5'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 3);
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4...22432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                value: '3'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field(s) missing');
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: '..9.j5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '3'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..4321441234',
                coordinate: 'A1',
                value: '7'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzle,
                coordinate: 'Z1',
                value: '7'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid coordinate');
                setTimeout(done, 3000);
            })
    })

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzle,
                coordinate: 'A1',
                value: 'J'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value');
                setTimeout(done, 3000);
            })
    })
});

