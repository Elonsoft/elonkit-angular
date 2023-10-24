import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'es-dropzone-custom-icon',
  templateUrl: './dropzone-story-custom-icon.component.html',
  styleUrls: ['./dropzone-story-custom-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropzoneStoryCustomIconComponent {
  @Input() public heading: string;
  @Input() public subheading: string;

  @Input() public locale: 'en' | 'ru';

  public form = new UntypedFormGroup({
    docs: new UntypedFormControl([])
  });

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'upload',
      sanitizer.bypassSecurityTrustResourceUrl('/icons/upload.svg')
    );
  }
}
