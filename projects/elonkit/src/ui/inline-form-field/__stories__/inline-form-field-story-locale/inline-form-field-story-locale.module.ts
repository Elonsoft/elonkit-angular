import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InlineFormFieldStoryLocaleComponent } from './inline-form-field-story-locale.component';

import { ESInlineFormFieldModule, ESInlineFormFieldLocale, ESInlineFormFieldLocaleRU } from '../..';

@NgModule({
  declarations: [InlineFormFieldStoryLocaleComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule],
  exports: [InlineFormFieldStoryLocaleComponent],
  providers: [{ provide: ESInlineFormFieldLocale, useClass: ESInlineFormFieldLocaleRU }]
})
export class InlineFormFieldStoryLocaleModule {}
