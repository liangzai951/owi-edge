function pause(timeInMilliseconds = 500) {
  const endTime = new Date().getTime() + timeInMilliseconds;
  while (new Date().getTime() < endTime) {} // eslint-disable-line no-empty
}

module.exports = pause;
