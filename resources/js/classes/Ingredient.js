import CookMath from "../helpers/CookMath";

export default class Ingredient {
    constructor(input) {
        this.amount = 0;
        this.input = input;
        this.name = '';
        this.unit = '';
        this.isValid = input.length > 2;
        console.log(this);
    }

    /**
     *
     * @param input
     */
    parse(input) {
        let parts = input.split(' ');
        if (parts.length > 1) {
            if (this.parseAmount(parts[0])) {
                // The first input may be the amount or a combination of the amount and the unit
                let amountInput = parts.shift();
                // Unit is in a separate word
                if (!this.parseUnit(amountInput) && parts.length > 2) {

                }
            } else if (this.parseAmount(parts[parts.length - 1])) {
                // The last input may be the amount and the unit combined or unit
                let amountInput = parts.pop();
                this.parseUnit(amountInput);
            } else if (parts.length > 2) {
                if (this.parseAmount(parts[parts.length - 1])) {
                    parts.pop();
                    // Check if there was an amount before the unit and remove it
                    if (this.parseUnit(parts[parts.length - 1])) {
                        parts.pop();
                    }
                }
            }
            // Check if there are any remaining parts after removing unit and amount
            if (parts.length) {
                this.name = parts.join(' ');
                this.isValid = true;
            }
        }
    }

    /**
     * Extract the amount from a word that possibly contains the amount and the unit
     * @param input The word that should be parsed
     * @returns {boolean} Returns true if the word was successfully parsed
     */
    parseAmount(input) {
        let amountMatch = input.match(/^\d+/);
        if (amountMatch) {
            let amount = amountMatch[0];
            if (CookMath.isNumeric(amount) && amount > 0) {
                this.amount = amount;
                return true;
            }
        }
        return false;
    }

    /**
     * Extract the unit from a word containing the amount and the unit
     * @param input The word that may contain the unit
     * @returns {boolean} Returns true if the word was successfully parsed
     */
    parseUnit(input) {
        let unitMatch = input.match("\[a-zA-Z]+$");
        if (unitMatch) {
            let unit = unitMatch[0];
            if (unit.length > 0) {
                this.unit = unit;
                return true;
            }
        }
        return false;
    }
}
