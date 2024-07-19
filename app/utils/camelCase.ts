export function toCamelCase(str: string): string {
  return str
    .split(" ")
    .map((word, index) => {
      // Convert the first word to lowercase, and capitalize the first letter of the subsequent words
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
}
