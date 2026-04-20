// Recent event buffer for admin dashboard

const buffer: any[] = [];
const MAX = 100;

export function pushEvent(event: any) {
  buffer.push(event);
  if (buffer.length > MAX) buffer.shift();
}

export function recentEvents() {
  return buffer;
}

