const CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = CHARACTERS.length;

export function encode(num: number): string {
  if (num === 0) return CHARACTERS[0].padStart(7, "0");

  let encoded = "";

  while (num > 0) {
    const remainder = num % BASE;
    encoded = CHARACTERS[remainder] + encoded; 
    num = Math.floor(num / BASE);
  }


  return encoded.padStart(7, "0");
}


export function decode(str: string): number {
  let num = 0;

  for (const char of str) {
    num = num * BASE + CHARACTERS.indexOf(char);
  }

  return num;
}