import usb from 'usb';
import {
  VENDOR_ID,
  PRODUCT_ID,
  BM_REQUEST_TYPE,
  B_REQUEST,
  W_VALUE,
  IN_LENGTH,
  MASKS,
} from './constants';
import { clear, set } from './utils';

const { CLEAR } = MASKS;

/**
 * @class OwiEdge
 *
 * A UBS driver for the OWI Robotic Arm Edge. Assumes a USB connection
 * using the USB interface for Robotic Arm Edge.
 * Allows simultaneous body part movements.
 * All move commands make the robot parts move continuously in that
 * direction until a stop command is invoked. For example, calling
 * `moveBaseClockWise()` will move the robot base clockwise until
 * either `stopBase()` or `stopAll()` is called.
 */
class OwiEdge {
  constructor() {
    this.arm = usb.findByIds(VENDOR_ID, PRODUCT_ID);

    // make sure the arm is connected before using
    if (!this.arm) {
      throw new Error('Unable to connect to your robot arm! Check power and connection.');
    }

    // initialize the arm to do nothing
    this.command = Buffer.from([CLEAR, CLEAR, CLEAR]);

    // open the connection to send commands
    this.arm.open();
  }

  turnLedOn() {
    this.command[2] = set(this.command[2], MASKS.LED_ON);
    this.send();
  }

  turnLedOff() {
    this.command[2] = clear(this.command[2], MASKS.LED_OFF);
    this.send();
  }

  stopHand() {
    this.command[0] = clear(this.command[0], MASKS.STOP_HAND);
    this.send();
  }

  openHand() {
    this.command[0] = clear(this.command[0], MASKS.STOP_HAND);
    this.command[0] = set(this.command[0], MASKS.OPEN_HAND);
    this.send();
  }

  closeHand() {
    this.command[0] = clear(this.command[0], MASKS.STOP_HAND);
    this.command[0] = set(this.command[0], MASKS.CLOSE_HAND);
    this.send();
  }

  stopWrist() {
    this.command[0] = clear(this.command[0], MASKS.STOP_WRIST);
    this.send();
  }

  moveWristUp() {
    this.command[0] = clear(this.command[0], MASKS.STOP_WRIST);
    this.command[0] = set(this.command[0], MASKS.WRIST_UP);
    this.send();
  }

  moveWristDown() {
    this.command[0] = clear(this.command[0], MASKS.STOP_WRIST);
    this.command[0] = set(this.command[0], MASKS.WRIST_DOWN);
    this.send();
  }

  stopElbow() {
    this.command[0] = clear(this.command[0], MASKS.STOP_ELBOW);
    this.send();
  }

  moveElbowUp() {
    this.command[0] = clear(this.command[0], MASKS.STOP_ELBOW);
    this.command[0] = set(this.command[0], MASKS.ELBOW_UP);
    this.send();
  }

  moveElbowDown() {
    this.command[0] = clear(this.command[0], MASKS.STOP_ELBOW);
    this.command[0] = set(this.command[0], MASKS.ELBOW_DOWN);
    this.send();
  }

  stopShoulder() {
    this.command[0] = clear(this.command[0], MASKS.STOP_SHOULDER);
    this.send();
  }

  moveShoulderUp() {
    this.command[0] = clear(this.command[0], MASKS.STOP_SHOULDER);
    this.command[0] = set(this.command[0], MASKS.SHOULDER_UP);
    this.send();
  }

  moveShoulderDown() {
    this.command[0] = clear(this.command[0], MASKS.STOP_SHOULDER);
    this.command[0] = set(this.command[0], MASKS.SHOULDER_DOWN);
    this.send();
  }

  stopBase() {
    this.command[1] = clear(this.command[1], MASKS.STOP_BASE);
    this.send();
  }

  moveBaseClockwise() {
    this.command[1] = clear(this.command[1], MASKS.STOP_BASE);
    this.command[1] = set(this.command[1], MASKS.BASE_CLOCKWISE);
    this.send();
  }

  moveBaseCounterClockwise() {
    this.command[1] = clear(this.command[1], MASKS.STOP_BASE);
    this.command[1] = set(this.command[1], MASKS.BASE_COUNTER_CLOCKWISE);
    this.send();
  }

  stopAll() {
    this.command = Buffer.from([CLEAR, CLEAR, CLEAR]);
    this.send();
  }

  send() {
    this.arm.controlTransfer(
      BM_REQUEST_TYPE,
      B_REQUEST,
      W_VALUE,
      IN_LENGTH,
      this.command,
      OwiEdge.error,
    );
  }

  static error(error, data) {
    if (error) {
      console.error('command error:', error, data); // eslint-disable-line
      throw error;
    }
  }
}

export default OwiEdge;
