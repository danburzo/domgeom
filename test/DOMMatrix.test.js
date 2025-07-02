import test from 'node:test';
import assert from 'node:assert';
import { round } from './util.js';

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
	assert.deepStrictEqual(
		new DOMMatrix(M1).multiply(new DOMMatrix(M2)).toJSON(),
		res
	);
	assert.deepStrictEqual(
		new DOMMatrixReadOnly(M1).multiply(new DOMMatrixReadOnly(M2)).toJSON(),
		res
	);
});

test('premultiply()', t => {
	assert.deepStrictEqual(
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
	assert.deepStrictEqual(
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

	assert.deepStrictEqual(
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

test('inverse()', t => {
	assert.deepStrictEqual(
		new DOMMatrix().inverse().toJSON(),
		{
		  "a": 1,
		  "b": 0,
		  "c": 0,
		  "d": 1,
		  "e": 0,
		  "f": 0,
		  "m11": 1,
		  "m12": 0,
		  "m13": 0,
		  "m14": 0,
		  "m21": 0,
		  "m22": 1,
		  "m23": 0,
		  "m24": 0,
		  "m31": 0,
		  "m32": 0,
		  "m33": 1,
		  "m34": 0,
		  "m41": 0,
		  "m42": 0,
		  "m43": 0,
		  "m44": 1,
		  "is2D": true,
		  "isIdentity": true
		}
	);

	assert.deepStrictEqual(
		new DOMMatrix(M1).inverse().toJSON(),
		{
		  "a": NaN,
		  "b": NaN,
		  "c": NaN,
		  "d": NaN,
		  "e": NaN,
		  "f": NaN,
		  "m11": NaN,
		  "m12": NaN,
		  "m13": NaN,
		  "m14": NaN,
		  "m21": NaN,
		  "m22": NaN,
		  "m23": NaN,
		  "m24": NaN,
		  "m31": NaN,
		  "m32": NaN,
		  "m33": NaN,
		  "m34": NaN,
		  "m41": NaN,
		  "m42": NaN,
		  "m43": NaN,
		  "m44": NaN,
		  "is2D": false,
		  "isIdentity": false
		}
	)

	assert.deepEqual(
		new DOMMatrix(M2).inverse().toJSON(),
		{
		  "a": -1.5,
		  "b": 2.5,
		  "c": 2,
		  "d": -3,
		  "e": 1,
		  "f": -2,
		  "m11": -1.5,
		  "m12": 2.5,
		  "m13": 0,
		  "m14": 0,
		  "m21": 2,
		  "m22": -3,
		  "m23": 0,
		  "m24": 0,
		  "m31": 0,
		  "m32": 0,
		  "m33": 1,
		  "m34": 0,
		  "m41": 1,
		  "m42": -2,
		  "m43": 0,
		  "m44": 1,
		  "is2D": true,
		  "isIdentity": false
		}
	);
});

test('rotate()', t => {
	assert.deepEqual(
		round(
			new DOMMatrix().rotateSelf(60, 30, 45).toJSON()
		),
		round({
			"a": 0.6123724356957946,
			"b": 0.6123724356957945,
			"c": -0.04736717274537655,
			"d": 0.6597396084411711,
			"e": 0,
			"f": 0,
			"m11": 0.6123724356957946,
			"m12": 0.6123724356957945,
			"m13": -0.49999999999999994,
			"m14": 0,
			"m21": -0.04736717274537655,
			"m22": 0.6597396084411711,
			"m23": 0.75,
			"m24": 0,
			"m31": 0.7891491309924313,
			"m32": -0.4355957403991577,
			"m33": 0.43301270189221946,
			"m34": 0,
			"m41": 0,
			"m42": 0,
			"m43": 0,
			"m44": 1,
			"is2D": false,
			"isIdentity": false
		})
	);
});