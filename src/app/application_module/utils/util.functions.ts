export function toBool(value: string): boolean {
  return value === 'true';
}

export function convertToBool(value: any): boolean {
  return value === 'true' || true;
}
