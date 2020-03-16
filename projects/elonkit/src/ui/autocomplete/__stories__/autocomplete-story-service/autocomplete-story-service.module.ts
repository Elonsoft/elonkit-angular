import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../..';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AutocompleteStoryServiceComponent } from './autocomplete-story-service.component';
import { AutocompleteStoryServiceService } from './autocomplete-story-service.service';

@NgModule({
  declarations: [AutocompleteStoryServiceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AutocompleteModule,

    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [AutocompleteStoryServiceComponent],
  providers: [AutocompleteStoryServiceService]
})
export class AutocompleteStoryServiceModule {}
