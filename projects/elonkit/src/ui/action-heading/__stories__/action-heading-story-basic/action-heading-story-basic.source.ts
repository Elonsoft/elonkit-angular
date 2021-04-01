export const ACTION_HEADING_STORY_BASIC_SOURCE = {
  html: `
    <es-action-heading
      [text]="text"
      [type]="type"
      [typography]="typography"
      [actionLabel]="actionLabel"
      [actionIcon]="actionIcon"
      [actionSvgIcon]="actionSvgIcon"
      [color]="color"
      (action)="onAction()">
    </es-action-heading>
  `
};
