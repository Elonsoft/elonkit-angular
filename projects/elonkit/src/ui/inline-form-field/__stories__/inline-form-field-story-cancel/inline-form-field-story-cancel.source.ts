export const INLINE_FORM_FIELD_STORY_CANCEL_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class ExampleComponent {
    text = 'Hello World';
    private textPrevious: string;

    onEdit() {
      this.textPrevious = this.text;
    }

    onCancel() {
      this.text = this.textPrevious;
    }
  }
  `,
  html: `
  <es-inline-form-field [text]="text" (edit)="onEdit()" (cancel)="onCancel()">
    <mat-form-field>
      <input [(ngModel)]="text" matInput />
    </mat-form-field>
  </es-inline-form-field>
  `
};
