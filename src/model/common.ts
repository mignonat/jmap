/**
 * The map interface
 */
export interface IMap<V> {
    get(key: string): V
    put(key: string, object: V): V|undefined
    remove(key: string): V|undefined
    contains(key: string): boolean
}

/**
 * A simple map implementation
 */
export class Map<V> implements IMap<V> {
    private valuesByKey: { [key: string]: V } = {}
    public get(key: string): V {
        return this.valuesByKey[key]
    }
    public put(key: string, value: V): V|undefined {
        const previousValue: V = this.valuesByKey[key]
        this.valuesByKey[key] = value
        return previousValue
    }
    public remove(key: string): V|undefined {
        if (this.valuesByKey.hasOwnProperty(key)) {
            const value: V = this.valuesByKey[key]
            delete this.valuesByKey[key]
            return value
        } else {
            return
        }
    }
    public contains(key: string): boolean {
        return this.valuesByKey.hasOwnProperty(key)
    }
}
