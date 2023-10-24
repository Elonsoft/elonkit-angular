import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'es-dropzone-required',
  templateUrl: './dropzone-story-required.component.html',
  styleUrls: ['./dropzone-story-required.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropzoneStoryRequiredComponent {
  @Input() public heading: string;
  @Input() public subheading: string;

  @Input() public locale: 'en' | 'ru';

  public form = new UntypedFormGroup({
    docs: new UntypedFormControl([], Validators.required)
  });

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'upload',
      sanitizer.bypassSecurityTrustResourceUrl('/icons/upload.svg')
    );
  }

  public onSubmit(form: any) {}
}
