import test from 'node:test';
import assert from 'node:assert';

import {
	DOMRectReadOnly
} from '../index.js';

test('DOMRectReadOnly', t => {
	assert.ok(new DOMRectReadOnly());
});