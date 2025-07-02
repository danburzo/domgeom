# domgeom

> __Note:__ this is a work in progress.

A polyfill for the [DOM Geometry Interfaces Level 1](https://drafts.fxtf.org/geometry/) for JavaScript runtimes that don’t include them.

## Installation

domgeom is available as an [npm package](http://npmjs.com/package/domgeom):

```bash
npm install --save domgeom
```

### Usage

```js
import { 
	DOMMatrix, 
	DOMMatrixReadOnly, 
	DOMPoint, 
	DOMPointReadOnly, 
	DOMRect,
	DOMRectReadOnly, 
	DOMQuad 
} from 'domgeom';

Object.assign(globalThis, {
	DOMMatrix,
	DOMMatrixReadOnly,
	DOMPoint,
	DOMPointReadOnly,
	DOMRect,
	DOMRectReadOnly,
	DOMQuad
});
```

## Differences from the spec

* `DOMMatrixReadOnly.prototype.toString()` throws an `Error` instead of an `"InvalidStateError" DOMException`.
* The read-only interfaces are not actually read only (it just seemed tedious to implement). 
* Strings get parsed according to the `<transform-list>` CSS syntax in the `DOMMatrix()` and `DOMMatrixReadOnly()`, as well as in `DOMMatrix.prototype.setMatrixValue()`, instead of throwing. However, the parser is looser than its browser counterpart, and ignores most `<length>` units (e.g. `10px` is interpreted as `10`). Percentages are always resolved to `value/100`.

Also note that due to numerical errors there may be slight differences in the matrix values compared to browser environments. In tests, [rounding the values](https://github.com/danburzo/domgeom/blob/main/test/util.js) before comparisons is recommended.

## Further reading

* [CSS Transforms Level 2: Mathematical Description of Transform Functions](https://drafts.csswg.org/css-transforms-2/#mathematical-description)
* CSS tokenization code is taken from [Selery](https://github.com/danburzo/selery/).