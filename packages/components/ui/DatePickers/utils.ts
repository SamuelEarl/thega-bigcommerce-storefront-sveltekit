/**
 * This functions accepts a date object and returns an ISO date string of the form "YYYY-MM-DD".
 */
export function getISODateFromDateObj(dateObj: Date) {
  // Get the current date in US format, which also pads the dates with leading zeros when necessary.
  // See https://stackoverflow.com/a/47160545/9453009
  const localeDateString = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return `${localeDateString.slice(6)}-${localeDateString.slice(0, 2)}-${localeDateString.slice(3, 5)}`;
}


/**
 * This function accepts an ISO date string of the form "YYYY-MM-DD" and returns a date object.
 * 
 * NOTE: If I simply pass the ISO string to the `new Date()` constructor, then the date could be off by a day depending on the timezone. However, if I create a new Date object and then parse out the year, month, and day with the `getUTC*` functions (aka `getISO*` functions), then the date appears to be accurate. I think the reason for that is because the string that is being passed to this function is an ISO string and when you parse that string into a Date object using the `getUTC*` functions, then it parses the date that is based in the same timezone, which returns the correct date no matter what time of day it is. I think this is because both the input (ISO string) and output (Date object) are using the same format (i.e. ISO format) and timezone (UTC), so there are no conversion errors due to the difference in timezones.
 */  
export function getDateObjFromISODate(isoDateString: string) {
  const d = new Date(isoDateString);
  const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return utcDate;
}


/**
 * This `isDateFormatInvalid()` function is borrowed from this post:
 * https://stackoverflow.com/a/35413963/9453009
 */
export function isDateFormatInvalid(dateString: string) {
  // Leaving the date field empty is valid. So if the input is an empty string, then return `false`.
  if (!dateString) {
    return false;
  }

  // Run the validation against the string input.
  // If `dateString` is NOT a valid format, then return `true`.
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) {
    return true;
  }

  const d = new Date(dateString);
  
  // If `dateInMS` is a NaN value or it is NOT a valid date, then return `true`.
  const dateInMS = d.getTime();
  if (!dateInMS && dateInMS !== 0) {
    return true;
  }
  
  // If the ISO string is NOT the same as the dataString, the return `true`.
  const isoString = d.toISOString().slice(0,10);
  return isoString !== dateString;
}


/**
 * 
 * @param dateString - A date string with the format YYYY-MM-DD.
 * @param validDateRange - A 2-item array of date strings (start date and end date) that indicate the range of dates that can be selected or typed into the date picker.
 * @returns 
 */
export function isDateOutOfRange(dateString: string, validDateRange: string[]) {
  const dateTimestamp = getDateObjFromISODate(dateString).getTime();
  const [dateRangeStart, dateRangeEnd] = validDateRange;

  let dateRangeStartTimestamp: number;
  if (dateRangeStart) {
    dateRangeStartTimestamp = getDateObjFromISODate(dateRangeStart).getTime();
  }

  let dateRangeEndTimestamp: number;
  if (dateRangeEnd) {
    dateRangeEndTimestamp = getDateObjFromISODate(dateRangeEnd).getTime();
  }

  // If the dateTimestamp is before the dateRangeStart date or after the dateRangeEnd date, then set `outOfRange` to true.
  return (
    (dateRangeStartTimestamp && dateTimestamp < dateRangeStartTimestamp) || 
    (dateRangeEndTimestamp && dateTimestamp > dateRangeEndTimestamp)
  ) ? true : false;
}


/**
 * This function will return a new Date object representing the first day of the specified month.
 * @param year 
 * @param monthNumber 
 * @returns 
 */
export function getFirstDayOfMonth(year: number, monthNumber: number) {
  return new Date(year, monthNumber, 1);
}


/**
 * This function will return a new Date object representing the last day of the specified month.
 * @param year 
 * @param monthNumber 
 * @returns 
 */
export function getLastDayOfMonth(year: number, monthNumber: number) {
  // The `day` parameter should be a number between 1 and 31. If you pass 0 to the `day` parameter, then that will represent the last day of the previous month.
  // So the argument that gets passed to the following Date constructor's `month` parameter will represent the next month. But the since 0 is being passed to the `day` parameter, it will cause this function to return the last day of the month that is passed in.
  return new Date(year, monthNumber + 1, 0);
}
