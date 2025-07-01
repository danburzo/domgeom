# domgeom

[DOM Geometry interfaces](https://drafts.fxtf.org/geometry/) shim for Node.js.

[CSS Transforms: Mathematical description](https://drafts.csswg.org/css-transforms/#mathematical-description)

```
m11 m21 m31 m41
m12 m22 m32 m42
m13 m23 m33 m43
m14 m24 m34 m44

a c 0 e
b d 0 f
0 0 1 0
0 0 0 1

translate:

1 0 0 tx
0 1 0 ty
0 0 1 tz
0 0 0 1

scale:

sx 0  0  0 
0  sy 0  0
0  0  sz 0
0  0  0  1

skew:

1      tan(a) 0 0 
tan(b) 1      0 0
0      0      1 0
0      0      0 1

skewX:

1 tan(a) 0 0 
0 1      0 0
0 0      1 0
0 0      0 1

skewY:

1      0 0 0 
tan(b) 1 0 0
0      0 1 0
0      0 0 1


```