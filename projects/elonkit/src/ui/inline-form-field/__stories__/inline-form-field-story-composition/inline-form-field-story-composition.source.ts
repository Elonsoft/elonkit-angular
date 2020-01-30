export const INLINE_FORM_FIELD_STORY_COMPOSITION_SOURCE = {
  html: `
  <es-inline-form-field [text]="date | date: 'M/d/yyyy'">
    <mat-form-field>
      <input [(ngModel)]="date" matInput [matDatepicker]="picker" />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  </es-inline-form-field>

  <es-inline-form-field [text]="text">
    <mat-form-field>
      <button matPrefix mat-icon-button>
        <mat-icon>favorite</mat-icon>
      </button>
      <input [(ngModel)]="text" matInput />
      <button matSuffix mat-icon-button>
        <mat-icon>thumb_up</mat-icon>
      </button>
    </mat-form-field>
  </es-inline-form-field>

  <es-inline-form-field [text]="select">
    <mat-form-field>
      <mat-select [(ngModel)]="select">
        <mat-option value="Apple">
          Apple
        </mat-option>
        <mat-option value="Grape">
          Grape
        </mat-option>
        <mat-option value="Pineapple">
          Pineapple
        </mat-option>
      </mat-select>
    </mat-form-field>
  </es-inline-form-field>

  <es-inline-form-field [text]="hint">
    <mat-form-field>
      <input [(ngModel)]="hint" matInput />
      <mat-hint>This is a hint</mat-hint>
    </mat-form-field>
  </es-inline-form-field>
  `
};
