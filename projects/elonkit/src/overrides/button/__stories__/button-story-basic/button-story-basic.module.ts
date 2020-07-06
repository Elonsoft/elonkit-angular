import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { ButtonStoryBasicComponent } from './button-story-basic.component';

@NgModule({
  declarations: [ButtonStoryBasicComponent],
  imports: [MatButtonModule],
  exports: [ButtonStoryBasicComponent]
})
export class ButtonStoryBasicModule {}
