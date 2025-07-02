# domgeom

> __Note:__ this is a work in progress.

A polyfill for the [DOM Geometry interfaces](https://drafts.fxtf.org/geometry/) for JavaScript runtimes that don’t include them.

## Installation

domgeom is available as an [npm package](http://npmjs.com/package/domgeom):

```bash
npm install --save domgeom
```

### Usage

```
import { 
	DOMMatrix, 
	DOMMatrixReadOnly, 
	DOMPoint, 
	DOMPointReadOnly, 
	DOMRect,
	DOMRectReadOnly, 
	DOMQuad 
} from 'domgeom';

globalThis.DOMMatrix = DOMMatrix;
globalThis.DOMMatrixReadOnly = DOMMatrixReadOnly;
globalThis.DOMPoint = DOMPoint;
globalThis.DOMPointReadOnly = DOMPointReadOnly;
globalThis.DOMRecd = DOMRect;
globalThis.DOMRectReadOnly = DOMRectReadOnly;
globalThis.DOMQuad = DOMQuad;
```

## Differences from the spec

* `DOMMatrixReadOnly.prototype.toString()` throws an `Error` instead of an `"InvalidStateError" DOMException`.
* Parsing of transform list strings is not implemented (yet?), either in the matrix constructor functions, or in `DOMMatrix.prototype.setMatrixValue()`.

Also note that due to numerical errors there may be slight differences in the matrix values compared to browser environments. In tests, [rounding the values](https://github.com/danburzo/domgeom/blob/main/test/util.js) before comparisons is recommended.

## Further reading

* [CSS Transforms Level 2: Mathematical Description of Transform Functions](https://drafts.csswg.org/css-transforms-2/#mathematical-description)