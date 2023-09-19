import { fromUnixTime, format } from "date-fns";

/**
 * Formats a given unix timestamp for usage with Collections.
 *
 * Returns: "Sep 13, 2023"
 *
 */
export const formatCollectionDate = (unixTimestamp: number) => {
  const date: Date = fromUnixTime(unixTimestamp);
  return format(date, 'MMM d, yyyy');
};

/**
 * Formats a given unix timestamp for usage in the tanstack table in EntriesList
 *
 * Returns: "09/13/23"
 *
 */
export const formatEntryDateInTable = (unixTimestamp: number) => {
  const date: Date = fromUnixTime(unixTimestamp);
  return format(date, 'MM/dd/yy');
};

/**
 * Formats a given unix timestamp for EntryDetails
 *
 * Returns: "Sep 13, 2023 at 19:00"
 *
 */
export const formatEntryDateInDetails = (unixTimestamp: number) => {
  const date: Date = fromUnixTime(unixTimestamp);
  return format(date, 'MMM d, yyyy \'at\' HH:mm');
};