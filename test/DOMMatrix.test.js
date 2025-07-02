import test from 'node:test';
import assert from 'node:assert';

const M1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const M2 = [6,5,4,3,2,1];

import {
	DOMMatrix,
	DOMMatrixReadOnly
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
	const res = {
	  "a": 31,
	  "b": 42,
	  "c": 19,
	  "d": 26,
	  "e": 20,
	  "f": 24,
	  "m11": 31,
	  "m12": 42,
	  "m13": 53,
	  "m14": 64,
	  "m21": 19,
	  "m22": 26,
	  "m23": 33,
	  "m24": 40,
	  "m31": 9,
	  "m32": 10,
	  "m33": 11,
	  "m34": 12,
	  "m41": 20,
	  "m42": 24,
	  "m43": 28,
	  "m44": 32,
	  "is2D": false,
	  "isIdentity": false
	};
	assert.deepEqual(
		new DOMMatrix(M1).multiply(new DOMMatrix(M2)).toJSON(),
		res
	);
	assert.deepEqual(
		new DOMMatrixReadOnly(M1).multiply(new DOMMatrixReadOnly(M2)).toJSON(),
		res
	);
});

test('premultiply()', t => {
	assert.deepEqual(
		new DOMMatrix(M1).preMultiplySelf(new DOMMatrix(M2)).toJSON(),
		{
		  "a": 22,
		  "b": 15,
		  "c": 70,
		  "d": 51,
		  "e": 166,
		  "f": 123,
		  "m11": 22,
		  "m12": 15,
		  "m13": 3,
		  "m14": 4,
		  "m21": 70,
		  "m22": 51,
		  "m23": 7,
		  "m24": 8,
		  "m31": 118,
		  "m32": 87,
		  "m33": 11,
		  "m34": 12,
		  "m41": 166,
		  "m42": 123,
		  "m43": 15,
		  "m44": 16,
		  "is2D": false,
		  "isIdentity": false
		}
	);
});

test('toJSON()', t => {
	assert.deepEqual(
		new DOMMatrix(M1).toJSON(),
		{
		  "a": 1,
		  "b": 2,
		  "c": 5,
		  "d": 6,
		  "e": 13,
		  "f": 14,
		  "m11": 1,
		  "m12": 2,
		  "m13": 3,
		  "m14": 4,
		  "m21": 5,
		  "m22": 6,
		  "m23": 7,
		  "m24": 8,
		  "m31": 9,
		  "m32": 10,
		  "m33": 11,
		  "m34": 12,
		  "m41": 13,
		  "m42": 14,
		  "m43": 15,
		  "m44": 16,
		  "is2D": false,
		  "isIdentity": false
		}
	);

	assert.deepEqual(
		new DOMMatrix(M2).toJSON(),
		{
		  "a": 6,
		  "b": 5,
		  "c": 4,
		  "d": 3,
		  "e": 2,
		  "f": 1,
		  "m11": 6,
		  "m12": 5,
		  "m13": 0,
		  "m14": 0,
		  "m21": 4,
		  "m22": 3,
		  "m23": 0,
		  "m24": 0,
		  "m31": 0,
		  "m32": 0,
		  "m33": 1,
		  "m34": 0,
		  "m41": 2,
		  "m42": 1,
		  "m43": 0,
		  "m44": 1,
		  "is2D": true,
		  "isIdentity": false
		}
	);
});

test('toString()', t => {
	
	assert.equal(
		new DOMMatrix(M1).toString(),
		'matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)'
	);

	assert.equal(
		new DOMMatrix(M2).toString(),
		'matrix(6, 5, 4, 3, 2, 1)'
	);
});