export default {
    get(key) {
        if (localStorage) {
            return JSON.parse(localStorage.getItem(key));
        }
        return false;
    },
    set(key, value) {
        if (localStorage) {
            localStorage.setItem(key,value);
            return true;
        }
        return false;
    },
    has(key) {
        if (localStorage) {
            return localStorage.getItem(key) !== null
        }

        return false;
    },
    remove(key) {
        if (localStorage) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },
    getOrUndefined(key, invalidValues = [null,false]) {

        if (localStorage && this.has(key) !== false && invalidValues.includes(this.get(key)) === false) {
            return localStorage.getItem(key);
        }
        return undefined;
    }
}