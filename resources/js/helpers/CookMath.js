var CookMath = Object.create(Math);

CookMath.prototype.isNumeric = (number) => !isNaN(parseFloat(n)) && isFinite(n);

export { CookMath };
