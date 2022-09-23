const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let validPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let completePuzzle = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

suite('Unit Tests', function() {
    this.timeout('100000');
    test('Logic handles a valid puzzle string of 81 characters', function(done) {
        assert.equal(solver.solve(validPuzzle), completePuzzle);
        setTimeout(done, 5000);
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
        let invalidPuzzle = '..9..j.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..37..';
        assert.equal(solver.solve(invalidPuzzle), false);
        setTimeout(done, 5000);
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
        let invalidPuzzle = '..9..2.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..2..6.34324';
        assert.equal(solver.solve(invalidPuzzle), false);
        setTimeout(done, 5000);
    });

    test('Logic handles a valid row placement', function(done) {
        assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '1', '7'), true);
        setTimeout(done, 5000);
    });

    test('Logic handles an invalid row placement', function(done) {
        assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '1', '9'), false);
        setTimeout(done, 5000);
    });

    test('Logic handles a valid column placement', function(done) {
        assert.equal(solver.checkColPlacement(validPuzzle, 'A', '1', '7'), true);
        setTimeout(done, 5000);
    });

    test('Logic handles an invalid column placement', function(done) {
        assert.equal(solver.checkColPlacement(validPuzzle, 'A', '1', '8'), false);
        setTimeout(done, 5000);
    });

    test('Logic handles a valid region (3x3 grid) placement', function(done) {
        assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', '1', '7'), true);
        setTimeout(done, 5000);
    });

    test('Logic handles an invalid region (3x3 grid) placement', function(done) {
        assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', '1', '8'), false);
        setTimeout(done, 5000);
    });

    test('Valid puzzle strings pass the solver', function(done) {
        assert.equal(solver.solve(validPuzzle), completePuzzle);
        setTimeout(done, 5000);
    });

    test('Invalid puzzle strings fail the solver', function(done) {
        let invalidPuzzle = '..9..2.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..2..6.34324';
        assert.equal(solver.solve(invalidPuzzle), false);
        setTimeout(done, 5000);
    });

    test('Solver returns the expected solution for an incomplete puzzle', function(done) {
        assert.equal(solver.solve(validPuzzle), completePuzzle);
        setTimeout(done, 5000);
    })
})