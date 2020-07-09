import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'es-dropzone-basic',
  templateUrl: './dropzone-story-basic.component.html',
  styleUrls: ['./dropzone-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropzoneStoryBasicComponent {
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
