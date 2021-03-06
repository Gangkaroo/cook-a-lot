export default class Errors {
    constructor() {
        this.errors = {};
    }

    // Check if there are any errors. If so, disable the submit button
    any() {
        return Object.keys(this.errors).length > 0;
    }

    // Clear a single field or the whole errors object if no field is given
    clear(field) {
        if (field) {
            delete this.errors[field];
        } else {
            this.errors = {};
        }
    }

    // Check if the field exists in the laravel errors object
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    // Only show error box if an error exists
    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    // Record new errors as received from the server
    record(errors) {
        if (typeof errors === 'object') {
            this.errors = errors;
        } else {
            this.errors = {};
        }
    }

    // Set a single error
    set(field, message) {
        if (!Array.isArray(this.errors[field])) {
            this.errors[field] = [];
        }
        this.errors[field].push(message);
    }
}
