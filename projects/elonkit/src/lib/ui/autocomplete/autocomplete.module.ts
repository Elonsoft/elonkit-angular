import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [MatButtonModule],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule {}
