export function clear(bits, mask) {
  return bits &= ~mask; // eslint-disable-line
}

export function set(bits, mask) {
  return bits |= mask; // eslint-disable-line
}
