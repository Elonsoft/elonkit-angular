import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'es-drag-and-drop-required',
  templateUrl: './drag-and-drop-story-required.component.html',
  styleUrls: ['./drag-and-drop-story-required.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragAndDropStoryRequiredComponent {
  public form = new FormGroup({
    docs: new FormControl([], Validators.required)
  });

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'upload',
      sanitizer.bypassSecurityTrustResourceUrl('/icons/upload.svg')
    );
  }

  public onSubmit(form: any) {}
}
