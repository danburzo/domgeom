import test from 'node:test';
import assert from 'node:assert';

import {
	DOMRect,
	DOMRectReadOnly
} from '../index.js';

test('DOMRect', t => {
	assert.ok(new DOMRect());
});

test('DOMRectReadOnly', t => {
	assert.ok(new DOMRectReadOnly());
});