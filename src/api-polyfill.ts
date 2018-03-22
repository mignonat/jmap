if (!Array.prototype.find) {
    Array.prototype.find = function<T>(predicate: any) {
        if (this == null) {
            throw new TypeError("Array.prototype.find called on null or undefined")
        }
        if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function")
        }
        const list = Object(this)
        const length = list.length
        const thisArg = arguments[1]
        for (let i = 0; i < length; i++) {
            if (predicate.call(thisArg, list[i], i, list)) return list[i]
        }
        return undefined
    }
}
