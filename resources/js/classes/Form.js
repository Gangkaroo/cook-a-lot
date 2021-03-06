import Errors from './Errors'

export default class Form {
    constructor(data) {
        this.originalData = data;
        this.errors = new Errors();

        // Attach properties of data to the object
        for (let field in data) {
            this[field] = data[field];
        }
    }

    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    onFail(errors) {
        this.errors.record(errors);
    }

    onSuccess(data) {
        this.reset();
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    get(url) {
        return this.submit('get', url);
    }

    post(url) {
        return this.submit('post', url);
    }

    put(url) {
        return this.submit('put', url);
    }

    patch(url) {
        return this.submit('patch', url);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    submit(requestType, url) {
        return new Promise(function(resolve, reject) {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data.errors);
                    reject(error.response.data.errors);
                });
        }.bind(this));
    }
}
