import { HOUR, DAY, MINUTE, SECOND} from "../constants";

export const getDays = (ms) => Math.floor(ms / SECOND / MINUTE / HOUR / DAY);

export const getHours = (ms) => Math.floor(ms/ SECOND / MINUTE / HOUR);

export const getMinutes = (ms) => Math.floor(ms / SECOND / MINUTE);

export const getSeconds = (ms) => Math.floor(ms / SECOND);