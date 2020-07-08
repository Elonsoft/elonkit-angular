export const ALERT_STORY_ACTIONS_SOURCE = {
  html: `
  <es-alert>
    Alert message for a user
    <es-alert-actions>
      <button mat-flat-button (click)="onAction()">Action</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </es-alert-actions>
  </es-alert>
  `
};
