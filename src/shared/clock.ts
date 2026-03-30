export interface Clock {
  nowIso(): string;
}

export class SystemClock implements Clock {
  nowIso(): string {
    return new Date().toISOString();
  }
}
