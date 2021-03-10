import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewEncapsulation,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Renderer2
} from '@angular/core';

import { ESAvatarComponent } from './avatar.component';
import { of } from 'rxjs';
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

  constructor(private _elementRef: ElementRef, private renderer: Renderer2) {}

  public ngOnInit() {
    this._elementRef.nativeElement.style.setProperty('--size', `${this.size - 2 + `px`}`);
  }

  public ngAfterContentInit() {
    this.setAvatarsIndex(this.avatars);
    this.avatars.changes.subscribe((avatars) => {
      if (avatars) {
        this.setAvatarsIndex(avatars);
      }
    });
  }

  private setAvatarsIndex = (avatars): void => {
    avatars.forEach((avatar, index) => {
      this.renderer.setStyle(avatar.nativeElement, 'z-index', index);
    });
  };
}
