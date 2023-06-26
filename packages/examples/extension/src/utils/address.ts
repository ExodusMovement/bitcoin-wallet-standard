export function condenseAddress(address: string): string {
    return `${address.slice(0, 10)}..${address.slice(-10)}`;
}
