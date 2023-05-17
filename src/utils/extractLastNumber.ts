export function extractLastNumber(str: string) {
  const arr = str.split("-");
  return arr[arr.length - 1];
}
