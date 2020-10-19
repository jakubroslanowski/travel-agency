export const formatTime = (param) => {
  if (param === undefined) {
    return null;
  } else if (isNaN(param)) {
    return null;
  } else if (param < 0) {
    return null;
  } else {
    let secs = 0;
    let mins = 0;
    let hrs = 0;
    secs = (secs + Math.floor(param % 60) + '').padStart(2, '0');
    mins = (mins + (Math.floor(param / 60) % 60) + '').padStart(2, '0');
    hrs = (hrs + Math.floor(param / 3600) + '').padStart(2, '0');
    return hrs + ':' + mins + ':' + secs;
  }
};
