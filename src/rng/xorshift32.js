export function xorshift32(seed) {
    var state = seed;
    return function() {
        let x = state;
        x ^= x<<13;
        x ^= x>>17;
        x ^= x<<5;
        state = x;
        return (state / 0x100000000) + 0.5;
    }
}