export const VENDOR_ID = '0x1267';
export const PRODUCT_ID = 0;
export const BM_REQUEST_TYPE = 0x40;
export const B_REQUEST = 6;
export const W_VALUE = 0x100;
export const IN_LENGTH = 0;
export const CLEAR = 0x00;

// all the 'stops/off' are the complement of the 'on' values
// so that we can logical & them together to create 0 for that segment of bits
export const MASKS = {
  STOP_HAND: 0x03, // 0000 0011
  OPEN_HAND: 0x02, // 0000 0010
  CLOSE_HAND: 0x01, // 0000 0001
  STOP_WRIST: 0x0C, // 0000 1100
  WRIST_UP: 0x04, // 0000 0100
  WRIST_DOWN: 0x08, // 0000 1000
  STOP_ELBOW: 0x30, // 0011 0000
  ELBOW_UP: 0x10, // 0001 0000
  ELBOW_DOWN: 0x20, // 0010 0000
  STOP_SHOULDER: 0xC0, // 1100 0000
  SHOULDER_UP: 0x80, // 0100 0000
  SHOULDER_DOWN: 0x40, // 1000 0000
  STOP_BASE: 0x03, // 0000 0011
  BASE_CLOCKWISE: 0x01, // 0000 0001
  BASE_COUNTER_CLOCKWISE: 0x02, // 0000 0010
  LED_ON: 0x01, // 0000 0001
  LED_OFF: 0x01, // 0000 0001
  CLEAR: 0x00,
};
