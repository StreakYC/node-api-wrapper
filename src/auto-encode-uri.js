/* @flow */
//jshint ignore:start

export default function autoEncodeURI(templateParts: string[], ...values: any[]): string {
  var parts = new Array(templateParts.length*2-1);
  parts[0] = templateParts[0];
  for (var i=0, len=values.length; i<len; i++) {
    var value: string = values[i];
    parts[2*i+1] = encodeURIComponent(value);
    parts[2*i+2] = templateParts[i+1];
  }
  return parts.join('');
}
