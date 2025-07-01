import test from 'node:test';
import assert from 'node:assert';

import {
	DOMQuad
} from '../index.js';

test('DOMQuad', t => {
	assert.ok(new DOMQuad());
});