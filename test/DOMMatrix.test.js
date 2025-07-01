import test from 'node:test';
import assert from 'node:assert';

import {
	DOMMatrix
} from '../index.js';

test('DOMMatrix()', t => {
	assert.ok(new DOMMatrix());
	assert.throws(() => {
		new DOMMatrix([1,2,3]);
	});
	assert.throws(() => {
		new DOMMatrix('');
	});
});

test('multiply()', t => {
	assert.ok(new DOMMatrix().multiply(new DOMMatrix()));
});