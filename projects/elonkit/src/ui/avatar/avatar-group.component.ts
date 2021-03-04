import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewEncapsulation,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';

import { ESAvatarComponent } from './avatar.component';
@Component({
  selector: 'es-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESAvatarGroupComponent implements OnInit, AfterContentInit {
  @ContentChildren(ESAvatarComponent, { read: ElementRef }) private avatars: QueryList<ElementRef>;
  /**
   * Defines size of the avatar in pixels.
   */
  @Input()
  public size: number;

  constructor(private _elementRef: ElementRef) {}

  public ngOnInit() {
    this._elementRef.nativeElement.style.setProperty('--size', `${this.size - 3 + `px`}`);
  }

  public ngAfterContentInit() {
    this.avatars.forEach((avatar, i) => (avatar.nativeElement.style.zIndex = i));
  }
}
