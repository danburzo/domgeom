import test from 'node:test';
import assert from 'node:assert';

import {
	DOMPoint,
	DOMPointReadOnly
} from '../index.js';

test('DOMPoint', t => {
	assert.ok(new DOMPoint());
});

test('DOMPointReadOnly', t => {
	assert.ok(new DOMPointReadOnly());
});