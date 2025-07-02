export class DOMPointReadOnly {

	constructor(x = 0, y = 0, z = 0, w = 1) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	matrixTransform(matrix) {
		return DOMMatrix.fromMatrix(matrix).transformPoint(this);
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

export class DOMPoint extends DOMPointReadOnly {
	constructor() {
		super(...arguments);
	}
}

export class DOMMatrixReadOnly {

	constructor(seq) {
		if (seq === undefined || (typeof seq === 'string' && !seq)) {
			seq = [1, 0, 0, 1, 0, 0];
		}

		if (typeof seq === 'string') {
			return parseTransformList(seq);
		}

		if (!Array.isArray(seq) || (seq.length !== 6 && seq.length !== 16)) {
			throw new TypeError();
		}
		this.is2D = seq.length === 6;
		const init = this.is2D ? 
			[
				seq[0], seq[1], 0, 0, 
				seq[2], seq[3], 0, 0, 
				    0,      0,  1, 0, 
				seq[4], seq[5], 0, 1
			] :
			seq;
		this.m11 = init[0];
		this.m12 = init[1];
		this.m13 = init[2];
		this.m14 = init[3];
		this.m21 = init[4];
		this.m22 = init[5];
		this.m23 = init[6];
		this.m24 = init[7];
		this.m31 = init[8];
		this.m32 = init[9];
		this.m33 = init[10];
		this.m34 = init[11];
		this.m41 = init[12];
		this.m42 = init[13];
		this.m43 = init[14];
		this.m44 = init[15];
	}

	get a() { return this.m11; }
	get b() { return this.m12; }
	get c() { return this.m21; }
	get d() { return this.m22; }
	get e() { return this.m41; }
	get f() { return this.m42; }

	get isIdentity() {
		return this.m12 === 0 && 
			this.m13 === 0 && 
			this.m14 === 0 && 
			this.m21 === 0 && 
			this.m23 === 0 &&
			this.m24 === 0 &&
			this.m31 === 0 &&
			this.m32 === 0 && 
			this.m34 === 0 &&
			this.m41 === 0 &&
			this.m42 === 0 &&
			this.m43 === 0 &&
			this.m11 === 1 &&
			this.m22 === 1 &&
			this.m33 === 1 &&
			this.m44 === 1;
	}

	translate(tx = 0, ty = 0, tz = 0) {
		return DOMMatrix.fromMatrix(this).translateSelf(...arguments);
	}

	scale(sx = 1, sy, sz = 1, x = 0, y = 0, z = 0) {
		return DOMMatrix.fromMatrix(this).scaleSelf(...arguments);
	}

	scaleNonUniform(sx = 1, sy = 1) {
		return this.scale(sx, sy, 1);
	}

	scale3d(scale = 1, x = 0, y = 0, z = 0) {
		return DOMMatrix.fromMatrix(this).scale3dSelf(...arguments);
	}

	rotate(rx = 0, ry, rz) {
		return DOMMatrix.fromMatrix(this).rotateSelf(...arguments);
	}

	rotateFromVector(x = 0, y = 0) {
		return DOMMatrix.fromMatrix(this).rotateFromVectorSelf(...arguments);
	}
	
	rotateAxisAngle(x = 0, y = 0, z = 0, angle = 0) {
		return DOMMatrix.fromMatrix(this).rotateAxisAngleSelf(...arguments);
	}

	skewX(sx = 0) {
		return DOMMatrix.fromMatrix(this).skewXSelf(...arguments);
	}

	skewY(sy = 0) {
		return DOMMatrix.fromMatrix(this).skewYSelf(...arguments);
	}

	multiply(other) {
		return DOMMatrix.fromMatrix(this).multiplySelf(...arguments);
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
		return new DOMPoint(
			this.m11 * pt.x + this.m21 * pt.y + this.m31 * pt.z + this.m41 * pt.w,
			this.m12 * pt.x + this.m22 * pt.y + this.m32 * pt.z + this.m42 * pt.w,
			this.m13 * pt.x + this.m23 * pt.y + this.m33 * pt.z + this.m43 * pt.w,
			this.m14 * pt.x + this.m24 * pt.y + this.m34 * pt.z + this.m44 * pt.w
		);
	}

	toFloat32Array() {
		return new Float32Array([ 
			this.m11, this.m12, this.m13, this.m14, 
			this.m21, this.m22, this.m23, this.m24, 
			this.m31, this.m32, this.m33, this.m34, 
			this.m41, this.m42, this.m43, this.m44
		]);
	}
	
	toFloat64Array() {
		return new Float64Array([ 
			this.m11, this.m12, this.m13, this.m14, 
			this.m21, this.m22, this.m23, this.m24, 
			this.m31, this.m32, this.m33, this.m34, 
			this.m41, this.m42, this.m43, this.m44
		]);
	}

	toJSON() {
		return {
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d,
			e: this.e,
			f: this.f,
			m11: this.m11,
			m12: this.m12,
			m13: this.m13,
			m14: this.m14,
			m21: this.m21,
			m22: this.m22,
			m23: this.m23,
			m24: this.m24,
			m31: this.m31,
			m32: this.m32,
			m33: this.m33,
			m34: this.m34,
			m41: this.m41,
			m42: this.m42,
			m43: this.m43,
			m44: this.m44,
			is2D: this.is2D,
			isIdentity: this.isIdentity
		}
	}

	toString() {
		if (
			!Number.isFinite(this.m11) ||
			!Number.isFinite(this.m12) ||
			!Number.isFinite(this.m13) ||
			!Number.isFinite(this.m14) ||
			!Number.isFinite(this.m21) ||
			!Number.isFinite(this.m22) ||
			!Number.isFinite(this.m23) ||
			!Number.isFinite(this.m24) ||
			!Number.isFinite(this.m31) ||
			!Number.isFinite(this.m32) ||
			!Number.isFinite(this.m33) ||
			!Number.isFinite(this.m34) ||
			!Number.isFinite(this.m41) ||
			!Number.isFinite(this.m42) ||
			!Number.isFinite(this.m43) ||
			!Number.isFinite(this.m44)
		) {
			/* 
				Note: this is specced as a real InvalidStateError DOMException
				but that’s DOMException isn’t available in non-DOM environments.
			*/
			throw new Error('DOMException: InvalidStateError');
		}
		if (this.is2D) {
			return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
		}
		const items = [
			this.m11, this.m12, this.m13, this.m14, 
			this.m21, this.m22, this.m23, this.m24, 
			this.m31, this.m32, this.m33, this.m34, 
			this.m41, this.m42, this.m43, this.m44
		];
		return `matrix3d(${items.join(', ')})`;
	}

	static fromMatrix(m) {
		const same = (x, y) => (
			x == undefined || 
			y == undefined || 
			x === y || 
			(Number.isNaN(x) && Number.isNaN(y))
		);

		if (
			!same(m.a, m.m11) ||
			!same(m.b, m.m12) ||
			!same(m.c, m.m21) ||
			!same(m.d, m.m22) ||
			!same(m.e, m.m41) ||
			!same(m.f, m.m42)
		) {
			throw new TypeError();
		}

		const m11 = m.m11 ?? m.a ?? 1;
		const m12 = m.m12 ?? m.b ?? 0;
		const m21 = m.m21 ?? m.c ?? 0;
		const m22 = m.m22 ?? m.d ?? 0;
		const m41 = m.m41 ?? m.e ?? 0;
		const m42 = m.m42 ?? m.f ?? 0;

		const unlike2D = (m.m13 !== undefined && m.m13 !== 0) ||
			(m.m14 !== undefined && m.m14 !== 0) ||
			(m.m23 !== undefined && m.m23 !== 0) ||
			(m.m24 !== undefined && m.m24 !== 0) ||
			(m.m31 !== undefined && m.m31 !== 0) ||
			(m.m32 !== undefined && m.m32 !== 0) ||
			(m.m34 !== undefined && m.m34 !== 0) ||
			(m.m43 !== undefined && m.m43 !== 0) ||
			(m.m33 !== undefined && m.m33 !== 1) ||
			(m.m44 !== undefined && m.m44 !== 1);
		if (m.is2D && unlike2D) {
			throw new TypeError();
		}
		if ((m.is2D === undefined && unlike2D) || m.is2D === false) {
			return new DOMMatrix([
				m11, m12, m.m13, m.m14,
				m21, m22, m.m23, m.m24,
				m.m31, m.m32, m.m33, m.m34,
				m41, m42, m.m43, m.m44
			]);
		}
		return new DOMMatrix([
			m11, m12, m21, m22, m41, m42 
		]);
	}

	static fromFloat32Array(other) {
		new this(other);
	}

	static fromFloat64Array(other) {
		new this(other);
	}
}

export class DOMMatrix extends DOMMatrixReadOnly {
	constructor() {
		super(...arguments);
	}

	/* getters & setters */
	get a() { return this.m11; }
	get b() { return this.m12; }
	get c() { return this.m21; }
	get d() { return this.m22; }
	get e() { return this.m41; }
	get f() { return this.m42; }

	set a(v) { this.m11 = v; }
	set b(v) { this.m12 = v; }
	set c(v) { this.m21 = v; }
	set d(v) { this.m22 = v; }
	set e(v) { this.m41 = v; }
	set f(v) { this.m42 = v; }

	multiplySelf(other) {
		const m = DOMMatrix.fromMatrix(other);
		const t = this;
		if (!m.is2D) {
			this.is2D = false;
		} 
		const m11 = m.m11 * t.m11 + m.m12 * t.m21+ m.m13 * t.m31 + m.m14 * t.m41; 
		const m12 = m.m11 * t.m12 + m.m12 * t.m22+ m.m13 * t.m32 + m.m14 * t.m42;
		const m13 = m.m11 * t.m13 + m.m12 * t.m23+ m.m13 * t.m33 + m.m14 * t.m43;
		const m14 = m.m11 * t.m14 + m.m12 * t.m24+ m.m13 * t.m34 + m.m14 * t.m44;  
		const m21 = m.m21 * t.m11 + m.m22 * t.m21+ m.m23 * t.m31 + m.m24 * t.m41;  
		const m22 = m.m21 * t.m12 + m.m22 * t.m22+ m.m23 * t.m32 + m.m24 * t.m42;  
		const m23 = m.m21 * t.m13 + m.m22 * t.m23+ m.m23 * t.m33 + m.m24 * t.m43;  
		const m24 = m.m21 * t.m14 + m.m22 * t.m24+ m.m23 * t.m34 + m.m24 * t.m44;
		const m31 = m.m31 * t.m11 + m.m32 * t.m21+ m.m33 * t.m31 + m.m34 * t.m41;   
		const m32 = m.m31 * t.m12 + m.m32 * t.m22+ m.m33 * t.m32 + m.m34 * t.m42;   
		const m33 = m.m31 * t.m13 + m.m32 * t.m23+ m.m33 * t.m33 + m.m34 * t.m43;   
		const m34 = m.m31 * t.m14 + m.m32 * t.m24+ m.m33 * t.m34 + m.m34 * t.m44;  
		const m41 = m.m41 * t.m11 + m.m42 * t.m21+ m.m43 * t.m31 + m.m44 * t.m41; 
		const m42 = m.m41 * t.m12 + m.m42 * t.m22+ m.m43 * t.m32 + m.m44 * t.m42; 
		const m43 = m.m41 * t.m13 + m.m42 * t.m23+ m.m43 * t.m33 + m.m44 * t.m43; 
		const m44 = m.m41 * t.m14 + m.m42 * t.m24+ m.m43 * t.m34 + m.m44 * t.m44; 

		this.m11 = m11;
		this.m12 = m12;
		this.m13 = m13;
		this.m14 = m14;
		this.m21 = m21;
		this.m22 = m22;
		this.m23 = m23;
		this.m24 = m24;
		this.m31 = m31;
		this.m32 = m32;
		this.m33 = m33;
		this.m34 = m34;
		this.m41 = m41;
		this.m42 = m42;
		this.m43 = m43;
		this.m44 = m44;

		return this;
	}

	preMultiplySelf(other) {
		const m = DOMMatrix.fromMatrix(other).multiplySelf(this);
		if (!m.is2D) {
			this.is2D = false;
		}

		this.m11 = m.m11;
		this.m12 = m.m12;
		this.m13 = m.m13;
		this.m14 = m.m14;
		this.m21 = m.m21;
		this.m22 = m.m22;
		this.m23 = m.m23;
		this.m24 = m.m24;
		this.m31 = m.m31;
		this.m32 = m.m32;
		this.m33 = m.m33;
		this.m34 = m.m34;
		this.m41 = m.m41;
		this.m42 = m.m42;
		this.m43 = m.m43;
		this.m44 = m.m44;

		return this;
	}
	
	translateSelf(tx = 0, ty = 0, tz = 0) {
		return this.multiplySelf(
			new DOMMatrix(
				tz ? [
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					tx, ty, tz, 1
				] : [1, 0, 0, 1, tx, ty]
			)
		);
	}

	scaleSelf(sx = 1, sy, sz = 1, x = 0, y = 0, z = 0) {
		if (sy === undefined) {
			sy = sx;
		}
		if (sz !== 1) {
			this.is2D = false;
		}
		return this
			.translateSelf(x, y, z)
			.multiplySelf(
				new DOMMatrix(sz !== 1 ? [
					sx, 0, 0, 0,
					0, sy, 0, 0,
					0, 0, sz, 0,
					0, 0, 0, 1
				]: [sx, 0, 0, sy, 0, 0])
			)
			.translateSelf(-x, -y, -z);
	}
	
	scale3dSelf(s = 1, x = 0, y = 0, z = 0) {
		return this.scaleSelf(s, s, s, x, y, z);
	}
	
	rotateSelf(rx = 0, ry, rz) {
		if (ry === undefined && rz === undefined) {
			rz = rx;
			rx = ry = 0;
		}
		if (ry === undefined) {
			ry = 0;
		}
		if (rz === undefined) {
			rz = 0;
		}
		if (rx !== 0 || ry !== 0) {
			this.is2D = false;
		}
		let res = this;
		if (rz) {
			res = res.rotateAxisAngleSelf(0, 0, 1, rz);
		}
		if (ry) {
			res = res.rotateAxisAngleSelf(0, 1, 0, ry);
		}
		if (rx) {
			res = res.rotateAxisAngleSelf(1, 0, 0, rx);
		}
		return res;
	}
	
	rotateFromVectorSelf(x = 0, y = 0) {
		const angle = Math.atan2(y, x) / Math.PI * 180;
		return this.rotateAxisAngleSelf(0, 0, 1, angle);
	}
	
	rotateAxisAngleSelf(x = 0, y = 0, z = 0, angle = 0) {
		const scale = Math.sqrt(x * x + y * y + z * z);
		if (scale === 0) {
			return this;
		}
		x /= scale;
		y /= scale;
		z /= scale;
		const s = Math.sin(angle * Math.PI / 360);
		const sc = s * Math.cos(angle * Math.PI / 360);
		const sq = s * s;
		if (x !== 0 || y !== 0) {
			this.is2D = false;
		}
		return this.multiplySelf(
			new DOMMatrix(
				x !== 0 || y !== 0 ? [
					1 - 2 * (y * y + z * z) * sq,
					2 * (x * y * sq + z * sc),
					2 * (x * z * sq - y * sc),
					0,
					2 * (x * y * sq - z * sc),
					1 - 2 * (x * x + z * z) * sq,
					2 * (y * z * sq + x * sc),
					0,
					2 * (x * z * sq + y * sc),
					2 * (y * z * sq - x * sc),
					1 - 2 * (x * x + y * y) * sq,
					0,
					0,
					0,
					0,
					1
				] : [
					1 - 2 * sq, 
					2 * sc, 
					-2 * sc, 
					1 - 2 * sq, 
					0, 
					0
				]
			)
		);
	}

	skewXSelf(sx = 0) {
		return this.multiplySelf(
			new DOMMatrix([
				1, 0, 0, 0,
				Math.tan(sx * Math.PI / 180), 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1
			])
		);
	}

	skewYSelf(sy = 0) {
		return this.multiplySelf(
			new DOMMatrix([
				1, Math.tan(sy * Math.PI / 180), 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1
			])
		);
	}

	/*
		Based on: https://github.com/niswegmann/small-matrix-inverse/
	*/
	invertSelf() {

		const m11 =
			+ this.m22 * this.m33 * this.m44
			- this.m22 * this.m34 * this.m43
			- this.m32 * this.m23 * this.m44
			+ this.m32 * this.m24 * this.m43
			+ this.m42 * this.m23 * this.m34
			- this.m42 * this.m24 * this.m33;

		const m12 =
			- this.m12 * this.m33 * this.m44
			+ this.m12 * this.m34 * this.m43
			+ this.m32 * this.m13 * this.m44
			- this.m32 * this.m14 * this.m43
			- this.m42 * this.m13 * this.m34
			+ this.m42 * this.m14 * this.m33;

		const m13 =
			+ this.m12 * this.m23 * this.m44
			- this.m12 * this.m24 * this.m43
			- this.m22 * this.m13 * this.m44
			+ this.m22 * this.m14 * this.m43
			+ this.m42 * this.m13 * this.m24
			- this.m42 * this.m14 * this.m23;

		const m14 =
			- this.m12 * this.m23 * this.m34
			+ this.m12 * this.m24 * this.m33
			+ this.m22 * this.m13 * this.m34
			- this.m22 * this.m14 * this.m33
			- this.m32 * this.m13 * this.m24
			+ this.m32 * this.m14 * this.m23;

		const m21 =
			- this.m21 * this.m33 * this.m44
			+ this.m21 * this.m34 * this.m43
			+ this.m31 * this.m23 * this.m44
			- this.m31 * this.m24 * this.m43
			- this.m41 * this.m23 * this.m34
			+ this.m41 * this.m24 * this.m33;

		const m22 =
			+ this.m11 * this.m33 * this.m44
			- this.m11 * this.m34 * this.m43
			- this.m31 * this.m13 * this.m44
			+ this.m31 * this.m14 * this.m43
			+ this.m41 * this.m13 * this.m34
			- this.m41 * this.m14 * this.m33;

		const m23 =
			- this.m11 * this.m23 * this.m44
			+ this.m11 * this.m24 * this.m43
			+ this.m21 * this.m13 * this.m44
			- this.m21 * this.m14 * this.m43
			- this.m41 * this.m13 * this.m24
			+ this.m41 * this.m14 * this.m23;

		const m24 =
			+ this.m11 * this.m23 * this.m34
			- this.m11 * this.m24 * this.m33
			- this.m21 * this.m13 * this.m34
			+ this.m21 * this.m14 * this.m33
			+ this.m31 * this.m13 * this.m24
			- this.m31 * this.m14 * this.m23;

		const m31 =
			+ this.m21 * this.m32 * this.m44
			- this.m21 * this.m34 * this.m42
			- this.m31 * this.m22 * this.m44
			+ this.m31 * this.m24 * this.m42
			+ this.m41 * this.m22 * this.m34
			- this.m41 * this.m24 * this.m32;

		const m32 =
			- this.m11 * this.m32 * this.m44
			+ this.m11 * this.m34 * this.m42
			+ this.m31 * this.m12 * this.m44
			- this.m31 * this.m14 * this.m42
			- this.m41 * this.m12 * this.m34
			+ this.m41 * this.m14 * this.m32;

		const m33 =
			+ this.m11 * this.m22 * this.m44
			- this.m11 * this.m24 * this.m42
			- this.m21 * this.m12 * this.m44
			+ this.m21 * this.m14 * this.m42
			+ this.m41 * this.m12 * this.m24
			- this.m41 * this.m14 * this.m22;

		const m34 =
			- this.m11 * this.m22 * this.m34
			+ this.m11 * this.m24 * this.m32
			+ this.m21 * this.m12 * this.m34
			- this.m21 * this.m14 * this.m32
			- this.m31 * this.m12 * this.m24
			+ this.m31 * this.m14 * this.m22;

		const m41 =
			- this.m21 * this.m32 * this.m43
			+ this.m21 * this.m33 * this.m42
			+ this.m31 * this.m22 * this.m43
			- this.m31 * this.m23 * this.m42
			- this.m41 * this.m22 * this.m33
			+ this.m41 * this.m23 * this.m32;

		const m42 =
			+ this.m11 * this.m32 * this.m43
			- this.m11 * this.m33 * this.m42
			- this.m31 * this.m12 * this.m43
			+ this.m31 * this.m13 * this.m42
			+ this.m41 * this.m12 * this.m33
			- this.m41 * this.m13 * this.m32;

		const m43 =
			- this.m11 * this.m22 * this.m43
			+ this.m11 * this.m23 * this.m42
			+ this.m21 * this.m12 * this.m43
			- this.m21 * this.m13 * this.m42
			- this.m41 * this.m12 * this.m23
			+ this.m41 * this.m13 * this.m22;

		const m44 =
			+ this.m11 * this.m22 * this.m33
			- this.m11 * this.m23 * this.m32
			- this.m21 * this.m12 * this.m33
			+ this.m21 * this.m13 * this.m32
			+ this.m31 * this.m12 * this.m23
			- this.m31 * this.m13 * this.m22;

		const det = 
			+ this.m11 * m11 
			+ this.m12 * m21 
			+ this.m13 * m31 
			+ this.m14 * m41;

		this.m11 = det ? m11 / det : NaN;
		this.m12 = det ? m12 / det : NaN;
		this.m13 = det ? m13 / det : NaN;
		this.m14 = det ? m14 / det : NaN;
		this.m21 = det ? m21 / det : NaN;
		this.m22 = det ? m22 / det : NaN;
		this.m23 = det ? m23 / det : NaN;
		this.m24 = det ? m24 / det : NaN;
		this.m31 = det ? m31 / det : NaN;
		this.m32 = det ? m32 / det : NaN;
		this.m33 = det ? m33 / det : NaN;
		this.m34 = det ? m34 / det : NaN;
		this.m41 = det ? m41 / det : NaN;
		this.m42 = det ? m42 / det : NaN;
		this.m43 = det ? m43 / det : NaN;
		this.m44 = det ? m44 / det : NaN;
		if (!det) {
			this.is2D = false;
		}
		return this;
	}

	setMatrixValue(transformList) {
		const m = new DOMMatrix(transformList);
		this.m11 = m.m11;
		this.m12 = m.m12;
		this.m13 = m.m13;
		this.m14 = m.m14;
		this.m21 = m.m21;
		this.m22 = m.m22;
		this.m23 = m.m23;
		this.m24 = m.m24;
		this.m31 = m.m31;
		this.m32 = m.m32;
		this.m33 = m.m33;
		this.m34 = m.m34;
		this.m41 = m.m41;
		this.m42 = m.m42;
		this.m43 = m.m43;
		this.m44 = m.m44;
		this.is2D = m.is2D;
		return this;
	}
}

export class DOMRectReadOnly {

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
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			top: this.top,
			bottom: this.bottom,
			left: this.left,
			right: this.right
		};
	}

	static fromRect(rect = {}) {
		return new this(rect.x, rect.y, rect.width, rect.height);
	}
}

export class DOMRect extends DOMRectReadOnly {
	constructor() {
		super(...arguments);
	}
}

export class DOMQuad {
	constructor(p1, p2, p3, p4) {
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
		this.p4 = p4;
	}

	getBounds() {
		const left = Math.min(this.p1.x, this.p2.x, this.p3.x, this.p4.x);
		const right = Math.max(this.p1.x, this.p2.x, this.p3.x, this.p4.x);
		const top = Math.min(this.p1.y, this.p2.y, this.p3.y, this.p4.y);
		const bottom = Math.max(this.p1.y, this.p2.y, this.p3.y, this.p4.y);
		return new DOMRect(left, top, right - left, bottom - top);
	}

	toJSON() {
		return {
			p1: this.p1,
			p2: this.p2,
			p3: this.p3,
			p4: this.p4
		}
	}

	static fromRect(other = {}) {
		const {x, y, width, height } = other; 
		return new DOMQuad(
			new DOMPoint(x, y),
			new DOMPoint(x + width, y),
			new DOMPoint(x + width, y + height),
			new DOMPoint(x, y + height),
		);
	}

	static fromQuad(other = {}) {
		return new DOMQuad(other.p1, other.p2, other.p3, other.p4);
	}
}

/*
	Parsing code below
	-----------------------
	From: https://github.com/danburzo/selery
*/

export function parseTransformList(str) {
	// identity matrix
	const m = new DOMMatrix();
	const tokens = tokenize(str);
	const eoi = () => !tokens.length;
	const next = () => tokens.shift();

	let tok;

	if (tokens[0].type === Tokens.Ident && tokens[0].value === 'none') {
		if (tokens.length === 1) {
			return m;
		}
		throw new Error();
	}

	// Apply dimension to token
	function dimension(token) {
		switch (token.unit) {
			case 'deg':
				return token.value;
			case 'rad':
				return token.value / Math.PI * 180;
			case 'turn':
				return token.value * 360;
			case 'grad':
				return token.value * 9/10;
			default:
				// TODO
				return token.value;
		}
	}

	function args(min, max) {
		const res = [];
		let needs_comma = false;
		max = max === undefined ? min : max;

		// comma-separated numbers followed by parens
		while (tok = next()) {
			if (tok.type === Tokens.Number) {
				res.push(tok.value);
				needs_comma = true;
				continue;
			}
			if (tok.type === Tokens.Percentage) {
				// TODO
				res.push(tok.value / 100);
				needs_comma = true;
				continue;
			}
			if (tok.type === Tokens.Dimension) {
				res.push(dimension(tok));
				needs_comma = true;
				continue;
			}
			if (tok.type === Tokens.Comma) {
				if (needs_comma) {
					needs_comma = false;
					continue;
				}
				throw new Error('Unexpected comma');
			}
			if (tok.type === Tokens.ParenClose) {
				if (res.length >= min && res.length <= max && needs_comma) {
					return res;
				}
				throw new Error('Insufficient arguments');
			}
			throw new Error('Unexpected token');
		}
		if (eoi()) {
			throw new Error('Unexpected end of input');
		}
		if (res.length < min) {
			throw new Error('Insufficient arguments');
		}
		return res;
	}

	function perspective() {
		tok = next();
		const paren = next(); // consume ParenClose
		if (paren.type !== Tokens.ParenClose) {
			throw new Error();
		}
		if (tok.type === Tokens.Ident && tok.value === 'none') {
			return -Infinity;
		}
		if (tok.type === Tokens.Number) {
			return tok.value;
		}
		if (tok.type === Tokens.Percentage) {
			// TODO
			return tok.value / 100;
		} 
		if (tok.type === Tokens.Dimension) {
			return dimension(tok);
		}
		throw new Error('Invalid perspective() argument');
	}

	while ((tok = next())) {
		if (tok.type !== Tokens.Function) {
			throw new Error('Expected transform function');
		}
		switch (tok.value) {
			case 'translate': {
				const [tx, ty] = args(1, 2);
				m.translateSelf(tx, ty = 0);
				break;
			}
			case 'translateX': {
				const [tx] = args(1);
				m.translateSelf(tx);
				break;
			}
			case 'translateY': {
				const [ty] = args(1);
				m.translateSelf(0, ty);
				break;
			}
			case 'translateZ': {
				const [tz] = args(1);
				m.translateSelf(0, 0, tz);
				break;
			}
			case 'translate3d': {
				const [tx, ty, tz] = args(3);
				m.translateSelf(tx, ty, tz);
				break;
			}
			case 'scale': {
				const [sx, sy] = args(1, 2);
				m.scaleSelf(sx, sy);
				break;
			}
			case 'scaleX': {
				const [sx] = args(1);
				m.scaleSelf(sx, 1);
				break;
			}
			case 'scaleY': {
				const [sy] = args(1);
				m.scaleSelf(1, sy);
				break;
			}
			case 'scaleZ': {
				const [sz] = args(1);
				m.scaleSelf(1, 1, sz);
				break;
			}
			case 'scale3d': {
				const [sx, sy, sz] = args(3);
				m.scaleSelf(sx, sy, sz);
				break;
			}
			case 'rotateX': {
				const [rx] = args(1);
				m.rotateSelf(rx);
				break;
			}
			case 'rotateY': {
				const [ry] = args(1);
				m.rotateSelf(0, ry);
				break;
			}
			case 'rotate':
			case 'rotateZ': {
				const [rz] = args(1);
				m.rotateSelf(0, 0, rz);
				break;
			}
			case 'rotate3d': {
				const [rx, ry, rz] = args(3);
				m.scaleSelf(rx, ry, rz);
				break;
			}
			case 'matrix': {
				m.multiplySelf(new DOMMatrix(args(6)));
				break;
			}
			case 'matrix3d': {
				m.multiplySelf(new DOMMatrix(args(16)));
				break;
			}
			case 'skew': {
				// TODO
				break;
			}
			case 'skewX': {
				const [sx] = args(1);
				m.skewXSelf(sx);
				break;
			}
			case 'skewY': {
				const [sy] = args(1);
				m.skewYSelf(sy);
				break;
			}
			case 'perspective': {
				m.multiplySelf(
					new DOMMatrix([
						1, 0, 0, 0,
						0, 1, 0, 0,
						0, 0, 1, -1/perspective(),
						0, 0, 0, 1
					])
				);
				break;
			}
		}
	}
	return m;
}


/*
	Tokenize a string according to the rules of CSS Syntax:

		https://drafts.csswg.org/css-syntax/

	The `tokenize()` function implements it almost completely,
	but skimps on a couple of areas unrelated to CSS selectors.
	(See the TODOs throughout the code.)

	It also doesn’t currently track the concrete position of tokens.
*/

// https://drafts.csswg.org/css-syntax/#ident-start-code-point

// https://drafts.csswg.org/css-syntax/#non-printable-code-point
const NonPrintableCodePoint = /[\x00-\x08\x0B\x0E-\x1F\x7F]/;
const HexDigit = /[0-9a-fA-F]/;

function nonascii(c) {
	return (
		c == 0xb7 ||
		(c >= 0xc0 && c <= 0xd6) ||
		(c >= 0xd8 && c <= 0xf6) ||
		(c >= 0xf8 && c <= 0x37d) ||
		(c >= 0x37f && c <= 0x1fff) ||
		c == 0x200c ||
		c == 0x200d ||
		c == 0x203f ||
		c == 0x2040 ||
		(c >= 0x37f && c <= 0x1fff) ||
		(c >= 0x2070 && c <= 0x218f) ||
		(c >= 0x2c00 && c <= 0x2fef) ||
		(c >= 0x3001 && c <= 0xd7ff) ||
		(c >= 0xf900 && c <= 0xfdcf) ||
		(c >= 0xfdf0 && c <= 0xfffd) ||
		c > 0x10000
	);
}

function isIdentStartCodePoint(ch) {
	return ch && (/[a-zA-Z_]/.test(ch) || nonascii(ch.codePointAt(0)));
}

function isIdentCodePoint(ch) {
	return ch && (/[-\w]/.test(ch) || nonascii(ch.codePointAt(0)));
}

const Tokens = {
	Comma: 'comma',
	Dimension: 'dimension',
	Function: 'function',
	Ident: 'ident',
	Number: 'number',
	ParenClose: ')',
	ParenOpen: '(',
	Percentage: 'percentage'
};

function tokenize(str) {

	let chars = Array.from(str.replace(/\f|\r\n?/g, '\n')).map(char => {
		const c = char.codePointAt(0);
		if (!c || (c >= 0xd800 && c <= 0xdfff)) {
			return '\uFFFD';
		}
		return char;
	});
	let _i = 0; // indexes
	let tokens = [],
		token;
	let ch, matching_ch;

	/* 
		§ 4.3.7. Consume an escaped code point
	*/
	function esc() {
		if (_i >= chars.length) {
			throw new Error('Unexpected end of input, unterminated escape sequence');
		} else if (HexDigit.test(chars[_i] || '')) {
			let hex = chars[_i++];
			while (hex.length < 6 && HexDigit.test(chars[_i] || '')) {
				hex += chars[_i++];
			}
			// consume following whitespace
			if (is_ws()) {
				_i++;
			}
			let v = parseInt(hex, 16);
			if (v === 0 || (v >= 0xd800 && v <= 0xdfff) || v > 0x10ffff) {
				return '\uFFFD';
			}
			return String.fromCodePoint(v);
		}
		return chars[_i++]; // Consume escaped character
	}

	// § 4.3.8. Check if two code points are a valid escape
	const is_esc = (offset = 0) =>
		chars[_i + offset] === '\\' && chars[_i + offset + 1] !== '\n';

	/*
		§ 4.3.10. Check if input stream contains the start of a number
		(This involves checking the last selected code point)
		https://drafts.csswg.org/css-syntax/#starts-with-a-number
	 */
	const is_num = () => {
		if (ch === '-' || ch === '+') {
			return (
				/\d/.test(chars[_i] || '') ||
				(chars[_i] === '.' && /\d/.test(chars[_i + 1] || ''))
			);
		}
		if (ch === '.') {
			return /\d/.test(chars[_i] || '');
		}
		return /\d/.test(ch || '');
	};

	/*
		§ 4.3.3. Consume a numeric token
		https://drafts.csswg.org/css-syntax/#consume-numeric-token
	 */
	function num() {
		let num_token = {
			value: ''
		};
		if (chars[_i] === '+' || chars[_i] === '-') {
			num_token.sign = chars[_i];
			num_token.value += chars[_i++];
		}
		num_token.value += digits();
		if (chars[_i] === '.' && /\d/.test(chars[_i + 1] || '')) {
			num_token.value += chars[_i++] + digits();
		}
		if (chars[_i] === 'e' || chars[_i] === 'E') {
			if (
				(chars[_i + 1] === '+' || chars[_i + 1] === '-') &&
				/\d/.test(chars[_i + 2] || '')
			) {
				num_token.value += chars[_i++] + chars[_i++] + digits();
			} else if (/\d/.test(chars[_i + 1] || '')) {
				num_token.value += chars[_i++] + digits();
			}
		}
		num_token.value = +num_token.value;
		if (is_ident()) {
			num_token.type = Tokens.Dimension;
			num_token.unit = ident();
		} else if (chars[_i] === '%') {
			_i++;
			num_token.type = Tokens.Percentage;
		} else {
			num_token.type = Tokens.Number;
		}
		return num_token;
	}

	/*
		Consume digits
	 */
	const digits = () => {
		let v = '';
		while (/\d/.test(chars[_i] || '')) {
			v += chars[_i++];
		}
		return v;
	};

	/*
		§ 4.3.9. Check if three code points would start an ident sequence
		Occasionally we need to check the last selected code point, in which
		case offset = -1, but usually offset = 0;
	 */

	function is_ident(offset = 0) {
		if (chars[_i + offset] === '-') {
			if (
				isIdentStartCodePoint(chars[_i + offset + 1]) ||
				chars[_i + offset + 1] === '-'
			) {
				return true;
			}
			if (chars[_i + offset + 1] === '\\') {
				return is_esc(offset + 1);
			}
			return false;
		}
		if (isIdentStartCodePoint(chars[_i + offset])) {
			return true;
		}
		if (chars[_i + offset] === '\\') {
			return is_esc(offset);
		}
		return false;
	}

	/*
		§ 4.3.12. Consume an ident sequence
	 */
	function ident() {
		let v = '';
		while (_i < chars.length) {
			if (isIdentCodePoint(chars[_i])) {
				v += chars[_i++];
			} else if (is_esc()) {
				_i++; // consume solidus
				v += esc();
			} else {
				return v;
			}
		}
		return v;
	}

	/*
		§ 4.3.4. Consume an ident-like token
		https://drafts.csswg.org/css-syntax/#consume-an-ident-like-token
	 */
	function identlike() {
		let v = ident();
		if (v.toLowerCase() === 'url' && chars[_i] === '(') {
			_i++; // consume parenthesis
			while (is_ws() && is_ws(1)) {
				_i++;
			}
			if (
				chars[_i] === '"' ||
				chars[_i] === "'" ||
				(is_ws() && (chars[_i + 1] === '"' || chars[_i + 1] === "'"))
			) {
				return {
					type: Tokens.Function,
					value: v
				};
			} else {
				throw new Error();
			}
		}

		if (chars[_i] === '(') {
			chars[_i++]; // consume parenthesis
			return {
				type: Tokens.Function,
				value: v
			};
		}
		return {
			type: Tokens.Ident,
			value: v
		};
	}

	function is_ws(offset = 0) {
		return (
			chars[_i + offset] === ' ' ||
			chars[_i + offset] === '\n' ||
			chars[_i + offset] === '\t'
		);
	}

	while (_i < chars.length) {
		// § 4.3.2. Consume comments
		if (chars[_i] === '/' && chars[_i + 1] === '*') {
			_i += 2; // consume start of comment
			while (
				_i < chars.length &&
				!(chars[_i] === '*' && chars[_i + 1] === '/')
			) {
				_i++;
			}
			if (_i === chars.length) {
				// Unexpected end of input, unterminated comment
				return undefined;
			}
			_i += 2; // consume end of comment
			continue;
		}

		// Consume the next input code point.
		ch = chars[_i++];

		// Consume whitespace without emitting
		if (ch === ' ' || ch === '\n' || ch === '\t') {
			while (is_ws()) {
				_i++;
			}
			continue;
		}

		if (ch === '(') {
			tokens.push({ type: Tokens.ParenOpen });
			continue;
		}

		if (ch === ')') {
			tokens.push({ type: Tokens.ParenClose });
			continue;
		}

		if (ch === '+') {
			if (is_num()) {
				_i--;
				tokens.push(num());
			} else {
				return undefined;
			}
			continue;
		}

		if (ch === ',') {
			tokens.push({ type: Tokens.Comma });
			continue;
		}

		if (ch === '-') {
			if (is_num()) {
				_i--;
				tokens.push(num());
				continue;
			}
			return undefined;
		}

		if (ch === '.') {
			if (is_num()) {
				_i--;
				tokens.push(num());
				continue;
			} 
			return undefined;
		}

		if (ch === '\\') {
			if (is_esc(-1)) {
				_i--;
				tokens.push(identlike());
				continue;
			}
			return undefined;
		}

		if (/\d/.test(ch || '')) {
			_i--;
			tokens.push(num());
			continue;
		}

		if (isIdentStartCodePoint(ch)) {
			_i--;
			tokens.push(identlike());
			continue;
		}

		// Anything not handled already is considered invalid
		return undefined;
	}

	return tokens;
}