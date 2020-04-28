import CookMath from "../helpers/CookMath";

export default class Ingredient {
    constructor(input) {
        this.amount = 0;
        this.name = '';
        this.unit = '';
        this.isValid = false;
        this.parse(input);
    }

     parse(input) {
        let parts = input.split(' ');
        if (parts.length > 1) {
            if (this.parseAmount(parts[0])) {
                // The first input may be the amount or a combination of the amount and the unit
                let amountInput = parts.shift();
                this.parseUnit(amountInput);
            } else if (this.parseAmount(parts[parts.length - 1])) {
                // The last input may be the amount and the unit combined or unit
                let amountInput = parts.pop();
                this.parseUnit(amountInput);
            } else if (parts.length > 2 && this.parseUnit(parts[parts.length - 1])) {
                parts.pop();
                // Check if there was an amount before the unit and remove it
                if (this.parseUnit(parts[parts.length - 1])) {
                    parts.pop();
                }
            }
            // Check if there are any remaining parts after removing unit and amount
            if (parts.length) {
                this.name = parts.join(' ');
                this.isValid = true;
            }
        }
     }

    parseAmount(input) {
        let amount = parts[0].match("^\\d+*");
        if (CookMath.isNumeric(amount) && amount > 0) {
            this.amount = amount;
            return true;
        }
        return false;
    }

    parseUnit(input) {
        let unit = parts[0].match("\[a-zA-Z]+$");
        if (CookMath.isNumeric(amount)) {
            this.amount = amount;
            return true;
        }
        return false;
    }
 }
