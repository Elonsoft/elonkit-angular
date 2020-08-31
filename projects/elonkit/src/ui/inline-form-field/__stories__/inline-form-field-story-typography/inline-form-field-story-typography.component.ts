import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

const TEXT = 'Hello World';

const TEXT_MMULTILINE = `Hello World
Good Morning World`;

@Component({
  selector: 'es-inline-form-field-typography',
  templateUrl: './inline-form-field-story-typography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineFormFieldStoryTypographyComponent {
  @Input() public typography;

  public text = TEXT;
  public textMultiline = TEXT_MMULTILINE;
}
