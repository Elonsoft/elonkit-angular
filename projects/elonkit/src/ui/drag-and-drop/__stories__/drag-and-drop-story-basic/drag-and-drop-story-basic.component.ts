import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'es-drag-and-drop-basic',
  templateUrl: './drag-and-drop-story-basic.component.html',
  styleUrls: ['./drag-and-drop-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragAndDropStoryBasicComponent {
  public form = new FormGroup({
    docs: new FormControl([])
  });

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'upload',
      sanitizer.bypassSecurityTrustResourceUrl('/icons/upload.svg')
    );
  }
}
