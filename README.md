# OWI Edge
[![Build Status](https://travis-ci.org/lexlacson/owi-edge.svg?branch=master)](https://travis-ci.org/lexlacson/owi-edge) [![Coverage Status](https://coveralls.io/repos/github/lexlacson/owi-edge/badge.svg?branch=master)](https://coveralls.io/github/lexlacson/owi-edge?branch=master)

Programmatically control your robot arm and rule the world!

This driver assumes you are using the OWI-535 Robotic Arm Edge with USB Interface.

# Install
Tested using Node 6 and 8

```sh
npm install owi-edge --save

# or yarn
yarn add owi-edge
```

This uses the [usb npm package](https://www.npmjs.com/package/usb) which uses `libusb` so you will need to build the usb drivers for your operating system. See the [usb npm package](https://www.npmjs.com/package/usb) for more details.

# Usage
```js
const Arm = require('owi-edge');
const arm = new Arm();

// Turn LED on and open hand at the same time
arm.turnLedOn();
arm.openHand();

arm.stopAll(); // or arm.stopHand(); arm.turnLedOff();
```

# Examples
```sh
# after installing this package
cd node_modules/owi-edge
npm run dance
```

# Supported Commands
```js
// LED
arm.turnLedOn();
arm.turnLedOff();

// Hand
arm.stopHand();
arm.openHand();
arm.closeHand();

// Wrist
arm.stopWrist();
arm.moveWristUp();
arm.moveWristDown();

// Elbow
arm.stopElbow();
arm.moveElbowUp();
arm.moveElbowDown();

// Shoulder
arm.stopShoulder();
arm.moveShoulderUp();
arm.moveShoulderDown();

// Base
arm.stopBase();
arm.moveBaseClockwise();
arm.moveBaseCounterClockwise();

// Stop all body parts
arm.stopAll();
```

# How it works
The USB interface reads 3 bytes for commands. Each byte corresponds to a part of the robot arm.
* Setting a bit to 1 tells a body part to move.
* Setting a bit to 0 tells that body part to stop.
* Setting multiple bits to 1 allows multiple body parts to move.

<table>
  <tr>
    <th align="center">Byte 1 - Arm</th>
    <th align="center">Byte 2 - Base</th>
    <th align="center">Byte 3 - LED</th>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <td>Shoulder Up</td>
          <td>0100 0000</td>
        </tr>
        <tr>
          <td>Shoulder Down</td>
          <td>1000 0000</td>
        </tr>
        <tr>
          <td>Elbow Up</td>
          <td>0001 0000</td>
        </tr>
        <tr>
          <td>Elbow Down</td>
          <td>0010 0000</td>
        </tr>
        <tr>
          <td>Wrist Up</td>
          <td>0000 0100</td>
        </tr>
        <tr>
          <td>Wrist Down</td>
          <td>0000 1000</td>
        </tr>
        <tr>
          <td>Hand Open</td>
          <td>0000 0010</td>
        </tr>
        <tr>
          <td>Hand Close</td>
          <td>0000 0001</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <td>Base Clockwise</td>
          <td>0000 0001</td>
        </tr>
        <tr>
          <td>Base Counter Clockwise</td>
          <td>0000 0010</td>
        </tr>
      </table>
    </td>
    <td>
    <table>
      <tr>
        <td>LED On</td>
        <td>0000 0001</td>
      </tr>
    </table>
    </td>
  </tr>
</table>

# Run tests
```sh
npm test
```

# Development
```sh
git clone https://github.com/lexlacson/owi-edge.git
npm install
npm test
npm run dance # with owi arm edge usb connected to computer
```

# Author
[Lex Lacson](https://github.com/lexlacson)

# License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

# Acknowledgements
Special thanks to [this article](https://notbrainsurgery.livejournal.com/38622.html) for explaining how the USB interface works.
