import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ESIconsService } from '../src/ui/icons';

@NgModule({
  imports: [MatIconModule],
  providers: [ESIconsService]
})
export class CoreModule {
  constructor(private iconsService: ESIconsService) {
    this.iconsService.register();
  }
}
