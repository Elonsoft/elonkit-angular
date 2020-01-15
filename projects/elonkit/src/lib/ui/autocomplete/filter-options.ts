export function GetFilterOptions(text: string, options: any): any {
  const lowerText = text ? text.toLowerCase() : '';
  return options.filter(e => e.toLowerCase().includes(lowerText));
}

export function GetFilterOptionsByKey(text: string, options: any, key: string): any {
  const lowerText = text ? text.toLowerCase() : '';
  return options.filter(e => e[key].toLowerCase().includes(lowerText));
}
