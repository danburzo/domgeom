import test from 'node:test';
import assert from 'node:assert';

import {
	DOMMatrix
} from '../index.js';

test('DOMMatrix', t => {
	const identity = new DOMMatrix();
	assert.ok(identity);
	assert.equal(identity.is2D, true);
	assert.equal(identity.isIdentity, true);
});