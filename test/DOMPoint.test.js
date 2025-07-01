import test from 'node:test';
import assert from 'node:assert';

import {
	DOMPoint
} from '../index.js';

test('DOMPoint', t => {
	assert.ok(new DOMPoint());
});