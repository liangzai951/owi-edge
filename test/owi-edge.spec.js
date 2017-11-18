import { expect } from 'chai';
import sinon from 'sinon';
import usb from 'usb';
import Arm from '../lib/owi-edge';
import {
  MASKS,
} from '../src/constants';

const sandbox = sinon.createSandbox();
const { CLEAR } = MASKS;

describe('OWI Edge', () => {
  let arm;
  let findByIdsStub;
  let controlTransferStub;
  let openSpy;

  beforeEach(() => {
    controlTransferStub = sandbox.stub();
    openSpy = sandbox.spy();
    findByIdsStub = sandbox.stub(usb, 'findByIds');
    findByIdsStub.returns({
      controlTransfer: controlTransferStub,
      open: openSpy,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('should throw an error if unable to find the device', () => {
      function shouldThrow() {
        findByIdsStub.returns(null);
        arm = new Arm();
      }
      expect(shouldThrow).to.throw();
    });

    it('should create arm object', () => {
      arm = new Arm();
      expect(arm).to.be.ok;
      expect(openSpy.calledOnce).to.be.true;
      expect(arm.command.equals(Buffer.from([CLEAR, CLEAR, CLEAR]))).to.be.true;
    });
  });

  describe('Hand', () => {
    it('should set correct bytes for opening the hand', () => {
      arm = new Arm();
      arm.openHand();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.OPEN_HAND, CLEAR, CLEAR]);
    });

    it('should set correct bytes for closing the hand', () => {
      arm = new Arm();
      arm.closeHand();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.CLOSE_HAND, CLEAR, CLEAR]);
    });

    it('should set correct bytes for stopping the hand', () => {
      arm = new Arm();
      arm.openHand();
      arm.stopHand();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - open to close', () => {
      arm = new Arm();
      arm.openHand();
      arm.closeHand();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.CLOSE_HAND, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - close to open', () => {
      arm = new Arm();
      arm.closeHand();
      arm.openHand();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.OPEN_HAND, CLEAR, CLEAR]);
    });
  });

  describe('Wrist', () => {
    it('should set correct bytes for moving the wrist up', () => {
      arm = new Arm();
      arm.moveWristUp();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.WRIST_UP, CLEAR, CLEAR]);
    });

    it('should set correct bytes for moving the wrist down', () => {
      arm = new Arm();
      arm.moveWristDown();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.WRIST_DOWN, CLEAR, CLEAR]);
    });

    it('should set correct bytes for stopping the wrist', () => {
      arm = new Arm();
      arm.moveWristUp();
      arm.stopWrist();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - up to down', () => {
      arm = new Arm();
      arm.moveWristUp();
      arm.moveWristDown();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.WRIST_DOWN, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - down to up', () => {
      arm = new Arm();
      arm.moveWristDown();
      arm.moveWristUp();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.WRIST_UP, CLEAR, CLEAR]);
    });
  });

  describe('Elbow', () => {
    it('should set correct bytes for moving the elbow up', () => {
      arm = new Arm();
      arm.moveElbowUp();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.ELBOW_UP, CLEAR, CLEAR]);
    });

    it('should set correct bytes for moving the elbow down', () => {
      arm = new Arm();
      arm.moveElbowDown();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.ELBOW_DOWN, CLEAR, CLEAR]);
    });

    it('should set correct bytes for stopping the elbow', () => {
      arm = new Arm();
      arm.moveElbowUp();
      arm.stopElbow();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - up to down', () => {
      arm = new Arm();
      arm.moveElbowUp();
      arm.moveElbowDown();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.ELBOW_DOWN, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - down to up', () => {
      arm = new Arm();
      arm.moveElbowDown();
      arm.moveElbowUp();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.ELBOW_UP, CLEAR, CLEAR]);
    });
  });

  describe('Shoulder', () => {
    it('should set correct bytes for moving the shoulder up', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.SHOULDER_UP, CLEAR, CLEAR]);
    });

    it('should set correct bytes for moving the shoulder down', () => {
      arm = new Arm();
      arm.moveShoulderDown();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([MASKS.SHOULDER_DOWN, CLEAR, CLEAR]);
    });

    it('should set correct bytes for stopping the shoulder', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.stopShoulder();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - up to down', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveShoulderDown();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.SHOULDER_DOWN, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - down to up', () => {
      arm = new Arm();
      arm.moveShoulderDown();
      arm.moveShoulderUp();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([MASKS.SHOULDER_UP, CLEAR, CLEAR]);
    });
  });

  describe('Base', () => {
    it('should set correct bytes for moving the base clockwise', () => {
      arm = new Arm();
      arm.moveBaseClockwise();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([CLEAR, MASKS.BASE_CLOCKWISE, CLEAR]);
    });

    it('should set correct bytes for moving the base counter clockwise', () => {
      arm = new Arm();
      arm.moveBaseCounterClockwise();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([CLEAR, MASKS.BASE_COUNTER_CLOCKWISE, CLEAR]);
    });

    it('should set correct bytes for stopping the base', () => {
      arm = new Arm();
      arm.moveBaseClockwise();
      arm.stopBase();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });

    it('should set correct bytes when changing directions - clockwise to counter clockwise', () => {
      arm = new Arm();
      arm.moveBaseClockwise();
      arm.moveBaseCounterClockwise();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, MASKS.BASE_COUNTER_CLOCKWISE, CLEAR]);
    });

    it('should set correct bytes when changing directions - counter clockwise to clockwise', () => {
      arm = new Arm();
      arm.moveBaseCounterClockwise();
      arm.moveBaseClockwise();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, MASKS.BASE_CLOCKWISE, CLEAR]);
    });
  });

  describe('LED', () => {
    it('should set correct bytes for turning the LED on', () => {
      arm = new Arm();
      arm.turnLedOn();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, MASKS.LED_ON]);
    });

    it('should set correct bytes for turning the LED off', () => {
      arm = new Arm();
      arm.turnLedOff();
      const command = controlTransferStub.firstCall.args[4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });

    it('should set correct bytes when turning LED on to off', () => {
      arm = new Arm();
      arm.turnLedOn();
      arm.turnLedOff();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });

    it('should set correct bytes when turning LED off to on', () => {
      arm = new Arm();
      arm.turnLedOff();
      arm.turnLedOn();
      const command = controlTransferStub.args[1][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, MASKS.LED_ON]);
    });
  });

  describe('Combinations', () => {
    it('should set correct bytes for when moving shoulder and elbow', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      const command = controlTransferStub.args[1][4];

      // 1001 0000
      expect([...command]).to.have.ordered.members([0x90, CLEAR, CLEAR]);
    });

    it('should set correct bytes for when moving shoulder, elbow and wrist', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.moveWristUp();
      const command = controlTransferStub.args[2][4];

      // 1001 0100
      expect([...command]).to.have.ordered.members([0x94, CLEAR, CLEAR]);
    });

    it('should set correct bytes for when moving shoulder, elbow, wrist, and base clockwise', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.moveWristUp();
      arm.moveBaseClockwise();
      const command = controlTransferStub.args[3][4];

      // 1001 0100 0000 0001
      expect([...command]).to.have.ordered.members([0x94, 0x01, CLEAR]);
    });

    it('should set correct bytes for when moving shoulder, elbow, wrist, and base counter clockwise', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.moveWristUp();
      arm.moveBaseCounterClockwise();
      const command = controlTransferStub.args[3][4];

      // 1001 0100 0000 0010
      expect([...command]).to.have.ordered.members([0x94, 0x02, CLEAR]);
    });

    it('should set correct bytes for when moving shoulder, elbow, wrist, base, and led on', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.moveWristUp();
      arm.moveBaseCounterClockwise();
      arm.turnLedOn();
      const command = controlTransferStub.args[4][4];

      // 1001 0100 0000 0010 0000 0001
      expect([...command]).to.have.ordered.members([0x94, 0x02, 0x01]);
    });

    it('should set correct bytes for when moving shoulder, elbow, wrist, base, and led off', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.moveWristUp();
      arm.moveBaseCounterClockwise();
      arm.turnLedOff();
      const command = controlTransferStub.args[4][4];

      // 1001 0100 0000 0010 0000 0000
      expect([...command]).to.have.ordered.members([0x94, 0x02, CLEAR]);
    });

    it('should set correct bytes for when moving shoulder, elbow, and stoping shoulder', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.stopShoulder();

      const command = controlTransferStub.args[2][4];

      // 0001 0000
      expect([...command]).to.have.ordered.members([0x10, CLEAR, CLEAR]);
    });

    it('should set correct bytes for when moving shoulder, elbow, base, hand and stoping base', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.moveWristUp();
      arm.openHand();
      arm.moveBaseCounterClockwise();
      arm.stopBase();
      const command = controlTransferStub.args[5][4];

      // 1001 0110 0000 0000
      expect([...command]).to.have.ordered.members([0x96, CLEAR, CLEAR]);
    });

    it('should be able to stop all commands', () => {
      arm = new Arm();
      arm.moveShoulderUp();
      arm.moveElbowUp();
      arm.moveWristUp();
      arm.openHand();
      arm.moveBaseCounterClockwise();
      arm.stopAll();
      const command = controlTransferStub.args[5][4];

      expect([...command]).to.have.ordered.members([CLEAR, CLEAR, CLEAR]);
    });
  });

  describe('error', () => {
    it('should throw error given an error', () => {
      function shouldThrow() {
        Arm.error(new Error());
      }

      expect(shouldThrow).to.throw();
    });

    it('should not throw error given no error', () => {
      function shouldNotThrow() {
        Arm.error();
      }

      expect(shouldNotThrow).to.not.throw();
    });
  });
});
