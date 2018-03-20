export function getExclamationMarksByCount(count: number): string {
    return Array(count).join('!')
}

export default {
    getExclamationMarksByCount : getExclamationMarksByCount
}