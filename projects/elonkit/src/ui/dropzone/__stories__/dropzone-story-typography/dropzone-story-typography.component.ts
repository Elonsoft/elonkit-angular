import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'es-dropzone-typography',
  templateUrl: './dropzone-story-typography.component.html',
  styleUrls: ['./dropzone-story-typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DropzoneStoryTypographyComponent {
  public form = new FormGroup({
    docs: new FormControl([])
  });
}
