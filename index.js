class DOMPointReadOnly {

	constructor(x = 0, y = 0, z = 0, w = 1) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	matrixTransform(m) {
		throw new Error('Unimplemented method');
	}

	toJSON() {
		return {
			x: this.x,
			y: this.y,
			z: this.z,
			w: this.w
		};
	}

	static fromPoint(pt = {}) {
		return new this(pt.x, pt.y, pt.z, pt.w);
	}
}

class DOMPoint extends DOMPointReadOnly {
	constructor() {
		super.constructor(arguments);
	}
}

class DOMMatrixReadOnly {

	m11;
	m12;
	m13;
	m14;
	m21;
	m22;
	m23;
	m24;
	m31;
	m32;
	m33;
	m34;
	m41;
	m42;
	m43;
	m44;

	is2D;
	isIdentity;

	constructor() {
		
	}

	get a() { return this.m11; }
	get b() { return this.m12; }
	get c() { return this.m21; }
	get c() { return this.m22; }
	get e() { return this.m41; }
	get f() { return this.m42; }

	translate(tx = 0, ty = 0, tz = 0) {
		return DOMMatrix.fromMatrix(this).translateSelf(arguments);
	}

	scale(sx = 1, sy, sz = 1, x = 0, y = 0, z = 0) {
		return DOMMatrix.fromMatrix(this).scaleSelf(arguments);
	}

	scaleNonUniform(sx = 1, sy = 1) {
		return this.scale(sx, sy, 1);
	}

	scale3d(scale = 1, x = 0, y = 0, z = 0) {
		return DOMMatrix.fromMatrix(this).scale3dSelf(arguments);
	}

	rotate(rx = 0, ry, rz) {
		return DOMMatrix.fromMatrix(this).rotateSelf(tx, ty, tz);
	}

	rotateFromVector(x = 0, y = 0) {
		return DOMMatrix.fromMatrix(this).rotateFromVectorSelf(tx, ty, tz);
	}
	
	rotateAxisAngle(x = 0, y = 0, z = 0, angle = 0) {
		return DOMMatrix.fromMatrix(this).rotateAxisAngleSelf(tx, ty, tz);
	}

	skewX(sx = 0) {
		return DOMMatrix.fromMatrix(this).skewXSelf(tx, ty, tz);
	}

	skewY(sy = 0) {
		return DOMMatrix.fromMatrix(this).skewYSelf(tx, ty, tz);
	}

	multiply(other) {
		return DOMMatrix.fromMatrix(this).multiplySelf(tx, ty, tz);
	}
	
	flipX() {
		return DOMMatrix.fromMatrix(this).multiplySelf(
			new DOMMatrix([-1, 0, 0, 1, 0, 0])
		);
	}

	flipY() {
		return DOMMatrix.fromMatrix(this).multiplySelf(
			new DOMMatrix([1, 0, 0, -1, 0, 0])
		);
	}

	inverse() {
		return DOMMatrix.fromMatrix(this).invertSelf();
	}

	transformPoint(pt) {
		throw new Error('Unimplemented method');
	}

	toFloat32Array() {
		throw new Error('Unimplemented method');
	}
	
	toFloat64Array() {
		throw new Error('Unimplemented method');
	}

	toJSON() {
		throw new Error('Unimplemented method');
	}

	static fromMatrix(other) {
		throw new Error('Unimplemented method');
	}

	static fromFloat32Array(array32) {
		throw new Error('Unimplemented method');
	}

	static fromFloat64Array(array64) {
		throw new Error('Unimplemented method');
	}
}

class DOMMatrix extends DOMMatrixReadOnly {
	constructor() {
		super.constructor(arguments);
	}

	/* setters */
	set a(v) { this.m11 = v; }
	set b(v) { this.m12 = v; }
	set c(v) { this.m21 = v; }
	set c(v) { this.m22 = v; }
	set e(v) { this.m41 = v; }
	set f(v) { this.m42 = v; }

	multiplySelf(other) {
		throw new Error('Unimplemented method');
	}

	preMultiplySelf(other) {
		throw new Error('Unimplemented method');
	}
	
	translateSelf(tx = 0, ty = 0, tz = 0) {
		throw new Error('Unimplemented method');
	}
	
	scaleSelf(sx = 1, sy, sz = 1, x = 0, y = 0, z = 0) {
		throw new Error('Unimplemented method');
	}
	
	scale3dSelf(scale = 1, x = 0, y = 0, z = 0) {
		throw new Error('Unimplemented method');
	}
	
	rotateSelf(rx = 0, ry, rz) {
		throw new Error('Unimplemented method');
	}
	
	rotateFromVectorSelf(x = 0, y = 0) {
		throw new Error('Unimplemented method');
	}
	
	rotateAxisAngleSelf(x = 0, y = 0, z = 0, angle = 0) {
		throw new Error('Unimplemented method');
	}
	
	skewXSelf(sx = 0) {
		throw new Error('Unimplemented method');
	}
	
	skewYSelf(sy = 0) {
		throw new Error('Unimplemented method');
	}

	invertSelf() {
		throw new Error('Unimplemented method');
	}

	setMatrixValue(transformList) {
		throw new Error('Unimplemented method');
	}
}

class DOMRectReadOnly {

	constructor(x = 0, y = 0, width = 0, height = 0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	get left() { 
		return Math.min(this.x, this.x + this.width); 
	}

	get right() { 
		return Math.max(this.x, this.x + this.width); 
	}

	get top() {
		return Math.min(this.y, this.y + this.height); 
	}

	get bottom() {
		return Math.max(this.y, this.y + this.height); 
	}

	toJSON() {
		throw new Error('Unimplemented method');
	}

	static fromRect(rect = {}) {
		return new this(rect.x, rect.y, rect.width, rect.height);
	}
}

class DOMRect extends DOMRectReadOnly {
	constructor() {
		super.constructor(arguments);
	}
}

class DOMQuad {
	constructor(p1, p2, p3, p4) {
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
		this.p4 = p4;
	}

	getBounds() {
		throw new Error('Unimplemented method');
	}

	toJSON() {
		throw new Error('Unimplemented method');
	}

	static fromRect(other = {}) {
		throw new Error('Unimplemented method');
	}

	static fromQuad(other = {}) {
		return new DOMQuad(other.p1, other.p2, other.p3, other.p4);
	}
}