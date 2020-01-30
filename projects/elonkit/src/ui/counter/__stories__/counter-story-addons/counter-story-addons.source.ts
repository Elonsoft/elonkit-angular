export const COUNTER_STORY_ADDONS_SOURCE = {
  ts: `
  onIncrease(event: number) {
    // ...
  }
  `,
  html: `
  <es-counter heading="Counter With Addons" (increase)="onIncrease($event)"></es-counter>
  `
};
