import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormFieldStoryBasicComponent } from './form-field-story-basic.component';

@NgModule({
  declarations: [FormFieldStoryBasicComponent],
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [FormFieldStoryBasicComponent]
})
export class FormFieldStoryBasicModule {}
