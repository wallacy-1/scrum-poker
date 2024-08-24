export function getShortString(text: string, size: number) {
  const textNoWhiteSpace = text.trim();
  const dots = text.length > size ? "..." : "";

  return `${textNoWhiteSpace.slice(0, size)}${dots}`;
}
