import test from 'node:test';
import assert from 'node:assert';

import {
	DOMRect
} from '../index.js';

test('DOMRect', t => {
	assert.ok(new DOMRect());
});