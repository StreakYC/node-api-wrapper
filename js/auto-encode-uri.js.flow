/* @flow */

export default function autoEncodeURI(templateParts: string[], ...values: any[]): string {
  const parts = new Array(templateParts.length*2-1);
  parts[0] = templateParts[0];
  for (let i=0, len=values.length; i<len; i++) {
    const value: string = values[i];
    parts[2*i+1] = encodeURIComponent(value);
    parts[2*i+2] = templateParts[i+1];
  }
  return parts.join('');
}
