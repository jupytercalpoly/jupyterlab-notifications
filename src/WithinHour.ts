const ONE_HOUR = 60 * 60 * 1000; /* ms */
const NANO_TO_MS = 1000000;

export function WithinHour(created: string): boolean {
  return Date.now() - parseInt(created) / NANO_TO_MS < ONE_HOUR;
}
