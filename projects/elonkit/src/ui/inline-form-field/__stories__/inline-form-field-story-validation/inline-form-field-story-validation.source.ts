export const INLINE_FORM_FIELD_STORY_VALIDATION_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class InlineFormFieldStoryValidationComponent {
    form: FormGroup;

    constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        text: ['Hello World', [Validators.required]],
        server: 'Hello Server Side Validation'
      });
    }

    onSave(inlineFormField: ESInlineFormFieldComponent) {
      const value: string = this.form.get('server').value;

      save(value).subscribe(
        () => {
          inlineFormField.setHidden(true);
        },
        errors => {
          this.form.get('server').setErrors(errors);
          this.changeDetector.detectChanges();
        }
      );
    }
  }
  `,
  html: `
  <form [formGroup]="form">
    <es-inline-form-field [text]="form.get('text').value">
      <mat-form-field>
        <input formControlName="text" matInput />
        <mat-error *ngIf="form.get('text').hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>
    </es-inline-form-field>

    <es-inline-form-field
      [text]="form.get('server').value"
      [manualSave]="true"
      (save)="onSave($event)"
    >
      <mat-form-field>
        <input formControlName="server" matInput />
        <mat-error *ngIf="form.get('server').hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>
    </es-inline-form-field>
  </form>
  `
};
