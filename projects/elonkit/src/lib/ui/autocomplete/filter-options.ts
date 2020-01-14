export function GetFilterOptions(text: string, options: any): any {
  const lowerText = text.toLowerCase();
  return options.filter(e => e.toLowerCase().includes(lowerText));
}
