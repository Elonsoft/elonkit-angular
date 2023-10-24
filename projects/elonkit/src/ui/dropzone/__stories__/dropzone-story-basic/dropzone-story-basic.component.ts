import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { ESDropzoneFile } from '../../dropzones.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'es-dropzone-basic',
  templateUrl: './dropzone-story-basic.component.html',
  styleUrls: ['./dropzone-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropzoneStoryBasicComponent implements OnInit, OnDestroy {
  @Input() public heading: string;
  @Input() public subheading: string;
  @Input() public accept: string;
  @Input() public maxSize: number;
  @Input() public type: 'base64' | 'binary';

  @Input() public locale: 'en' | 'ru';

  @Output()
  public changeFiles = new EventEmitter<ESDropzoneFile[]>();

  public docs = new UntypedFormControl([]);

  private docSub: Subscription;

  public ngOnInit(): void {
    this.docSub = this.docs.valueChanges.subscribe((val) => {
      this.changeFiles.emit(val);
    });
  }

  public ngOnDestroy(): void {
    this.docSub.unsubscribe();
  }
}
