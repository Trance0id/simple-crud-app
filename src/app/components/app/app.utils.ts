export function getRandomId(digits = 8): number {
  return Math.floor(Math.random() * Math.pow(10, digits));
}
