import { format } from "timeago.js";

export const parseDate = (time: string) => {
  return format(time);
}