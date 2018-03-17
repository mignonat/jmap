export default {
    getExclamationMarksByCount: (count: number): string => {
        return Array(count).join('!')
    }
}