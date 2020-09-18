export function calculateDaysLeft(airDateString: string): number {
  const airDate = Date.parse(airDateString);
  const timeDifference = airDate - Date.now();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

export function calculateMonthsLeft(days: number): number {
  return Math.ceil(days / 30);
}
