import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

import { ESAvatarGroupSets } from '../../avatar.types';

@Component({
  selector: 'es-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESAvatarGroupComponent implements OnInit {
  /**
   * Defines size of the avatar in pixels.
   */
  @Input()
  public avatars: ESAvatarGroupSets[];

  /**
   * Defines size of the avatar in pixels.
   */
  @Input()
  public size: number;

  constructor(private _elementRef: ElementRef) {}

  public ngOnInit() {
    this._elementRef.nativeElement.style.setProperty('--size', `${this.size - 3 + `px`}`);
  }
}
