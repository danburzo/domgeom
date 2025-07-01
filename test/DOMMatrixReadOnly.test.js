import test from 'node:test';
import assert from 'node:assert';

import {
	DOMMatrixReadOnly
} from '../index.js';

test('DOMMatrixReadOnly', t => {
	const identity = new DOMMatrixReadOnly();
	assert.ok(identity);
	assert.equal(identity.is2D, true);
	assert.equal(identity.isIdentity, true);
});