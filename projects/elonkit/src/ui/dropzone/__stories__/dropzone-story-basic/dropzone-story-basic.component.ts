import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { ESDropzoneFile } from '../../dropzones.types';

@Component({
  selector: 'es-dropzone-basic',
  templateUrl: './dropzone-story-basic.component.html',
  styleUrls: ['./dropzone-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropzoneStoryBasicComponent implements OnInit {
  @Input()
  public chooseText: string;

  @Input()
  public dragText: string;

  @Input()
  public accept: string;

  @Input()
  public maxSize: number;

  @Input()
  public type: 'base64' | 'binary';

  @Output()
  public changeFiles = new EventEmitter<ESDropzoneFile[]>();

  public docs = new FormControl([]);

  public ngOnInit(): void {
    this.docs.valueChanges.subscribe((val) => {
      this.changeFiles.emit(val);
    });
  }
}
