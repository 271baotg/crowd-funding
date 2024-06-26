export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export function invertColor(hex) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

export const timeAgo = (timestamp) => {
  const currentTime = new Date();
  const providedTime = new Date(timestamp * 1000); // Convert timestamp to milliseconds

  const timeDifference = currentTime - providedTime;

  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  // Generate human-readable output based on time difference
  if (timeDifference < minute) {
    return `${Math.floor(timeDifference / 1000)} seconds ago`;
  } else if (timeDifference >= minute && timeDifference < hour) {
    return `${Math.floor(timeDifference / minute)} minutes ago`;
  } else if (timeDifference >= hour && timeDifference < day) {
    return `${Math.floor(timeDifference / hour)} hours ago`;
  } else if (timeDifference >= day && timeDifference < week) {
    return `${Math.floor(timeDifference / day)} days ago`;
  } else {
    return `${Math.floor(timeDifference / week)} weeks ago`;
  }
};
