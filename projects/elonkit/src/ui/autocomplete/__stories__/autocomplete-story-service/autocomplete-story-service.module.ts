import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../../autocomplete.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteService } from '../autocomplete-story-service/autocomplete.service';

import { AutocompleteStoryServiceComponent } from './autocomplete-story-service.component';

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
  providers: [AutocompleteService]
})
export class AutocompleteStoryServiceModule {}
