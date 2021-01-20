var CookMath = Object.create(Math);

CookMath.isNumeric = (number) => !isNaN(parseFloat(n)) && isFinite(n);

export { CookMath };
