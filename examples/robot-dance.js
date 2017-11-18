const Arm = require('../lib/owi-edge');
const pause = require('./util/pause');

const arm = new Arm();
let wiggle = [
  arm.turnLedOn,
  arm.turnLedOff,
  arm.turnLedOn,
  arm.turnLedOff,
  arm.turnLedOn,
  arm.turnLedOff,
  arm.moveBaseClockwise,
  arm.moveBaseCounterClockwise,
  arm.moveBaseClockwise,
  arm.moveBaseCounterClockwise,
  function shoulderTransition() {
    arm.stopBase();
    arm.moveShoulderUp();
  },
  arm.moveShoulderDown,
  arm.moveShoulderUp,
  arm.moveShoulderDown,
  function elbowTransition() {
    arm.stopShoulder();
    arm.moveElbowUp();
  },
  arm.moveElbowDown,
  arm.moveElbowUp,
  arm.moveElbowDown,
  function wristTransition() {
    arm.stopElbow();
    arm.moveWristUp();
  },
  arm.moveWristDown,
  arm.moveWristUp,
  arm.moveWristDown,
  function handTransition() {
    arm.stopWrist();
    arm.openHand();
  },
  arm.closeHand,
  arm.openHand,
  arm.closeHand,
  arm.stopAll,
];

wiggle = wiggle.map(move => move.bind(arm));

function perform(danceMoves) {
  danceMoves.forEach((move) => {
    move();
    pause(750);
  });
}

perform(wiggle);
