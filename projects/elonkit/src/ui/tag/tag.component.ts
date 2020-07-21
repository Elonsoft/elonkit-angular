import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESTagComponent {
  /**
   * The background color of tag.
   */
  @Input()
  public color = '#000';

  /**
   * The color of text.
   */
  @Input()
  public textColor = '#fff';

  /**
   * The icon displayed before the text.
   */
  @Input() icon?: string;

  /**
   * Override the icon displayed before the text.
   */
  @Input() svgIcon?: string;

  get currentIcon() {
    if (this.icon) {
      return { icon: this.icon };
    }
    if (this.svgIcon) {
      return { svgIcon: this.svgIcon };
    }
  }
}
