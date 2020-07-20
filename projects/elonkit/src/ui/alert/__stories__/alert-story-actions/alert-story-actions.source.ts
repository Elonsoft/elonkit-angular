export const ALERT_STORY_ACTIONS_SOURCE = {
  html: `
  <es-alert>
    Message
    <es-alert-actions>
      <button mat-flat-button (click)="onAction()">Action</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </es-alert-actions>
  </es-alert>
  `
};
