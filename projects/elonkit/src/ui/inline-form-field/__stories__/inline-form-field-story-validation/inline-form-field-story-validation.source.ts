export const INLINE_FORM_FIELD_STORY_VALIDATION_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class ExampleComponent {
    form: FormGroup;
    previousValues: Array<{ control: FormControl; value: any }> = [];

    constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        text: ['Hello World', [Validators.required]],
        server: 'Hello Server Side Validation'
      });
    }

    onEdit(control: FormControl) {
      const index = this.previousValues.findIndex(e => e.control === control);
      if (index !== -1) {
        this.previousValues[index].value = control.value;
      } else {
        this.previousValues.push({
          control,
          value: control.value
        });
      }
    }

    onCancel(control: FormControl) {
      const index = this.previousValues.findIndex(e => e.control === control);
      control.setValue(this.previousValues[index].value);
    }

    onSave(inlineFormField: ESInlineFormFieldComponent) {
      const value: string = this.form.get('server').value;

      save(value)
        .then(() => {
          inlineFormField.setHidden(true);
        })
        .catch(() => {
          this.form.get('server').setErrors({ required: true });
          this.changeDetector.detectChanges();
        });
    }
  }
  `,
  html: `
  <form [formGroup]="form">
    <es-inline-form-field
      [text]="form.get('text').value"
      (edit)="onEdit(form.get('text'))"
      (cancel)="onCancel(form.get('text'))"
      class="inline-form-field"
    >
      <mat-form-field>
        <input formControlName="text" matInput autocomplete="off" />
        <mat-error *ngIf="form.get('text').hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>
    </es-inline-form-field>

    <es-inline-form-field
      [text]="form.get('server').value"
      [saveManually]="true"
      (edit)="onEdit(form.get('server'))"
      (save)="onSave($event)"
      (cancel)="onCancel(form.get('server'))"
      class="inline-form-field"
    >
      <mat-form-field>
        <input formControlName="server" matInput autocomplete="off" />
        <mat-error *ngIf="form.get('server').hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>
    </es-inline-form-field>
  </form>
  `
};
