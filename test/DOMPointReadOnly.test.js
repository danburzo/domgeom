import test from 'node:test';
import assert from 'node:assert';

import {
	DOMPointReadOnly
} from '../index.js';

test('DOMPointReadOnly', t => {
	assert.ok(new DOMPointReadOnly());
});

