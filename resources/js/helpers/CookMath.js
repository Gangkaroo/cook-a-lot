var CookMath = Object.create(Math);

CookMath.isNumeric = (number) => !isNaN(parseFloat(number)) && isFinite(number);

export default CookMath;
