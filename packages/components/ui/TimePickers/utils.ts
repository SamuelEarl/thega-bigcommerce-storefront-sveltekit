export function getCurrentTime() {
  try {
    const date = new Date();
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // If the hour is "0", then this will return "12".
    const minutes = date.getMinutes();
    // This will return the seconds for the current time, but most people probably do not need to specify the exact seconds so the seconds will always be zero.
    // const seconds = date.getSeconds();
    const seconds = 0;
    // Pad single digits with a leading zero.
    const hr = String(hours).padStart(2, "0");
    const min = String(minutes).padStart(2, "0");
    const sec = String(seconds).padStart(2, "0");
    return `${hr}:${min}:${sec} ${ampm}`;
  }
  catch(err) {
    console.error("getCurrentTime", err);
  }
}

/**
 * @param date - A date string in `YYYY-MM-DD` format.
 * @param hours - A double-digit hour string (`"04"`)
 * @param minutes - A double-digit minute string (`"12"`)
 * @param seconds - A double-digit second string (`"32"`)
 * @param ampm - A string for either `"AM"` or `"PM"`
 * @returns An object with `isoDateString` and `localDateObj` properties.
 * * The `isoDateString` is an ISO date string, which is in UTC time.
 * * The `localDateObj` is a Date object expressed in standard form and local time.
 */
export function convertDateAndTimeToTimestamp(
  date: string = "1970-01-01",
  time: string = "00:00:00 AM"
) {
  try {
    // Extract the parts of the time from the time string.
    let [ hours, minutes, secAMPM ] = time.split(":");
    let [ seconds, ampm ] = secAMPM.split(" ");
    // Convert 12-hour time to 24-hour time.
    if (hours === "12") {
      hours = ampm === "AM" ? "00" : "12";
    }
    else if (ampm === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }
    // Make sure that any single digits are padded with a leading zero.
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0"); 
    // Convert datetime to ISO string.
    const timeString = `${hours}:${minutes}:${seconds}`;
    const localDateObj = new Date(`${date}T${timeString}`);
    const isoDateString = localDateObj.toISOString();
    return { isoDateString, localDateObj };
  }
  catch(err: any) {
    console.error("convertDateAndTimeToTimestamp", err);
    // If there is an error, then return the error message as the value for each property.
    // This will show the error in the UI.
    return { 
      isoDateString: err.message, 
      localDateObj: err.message,
    };
  }
}
