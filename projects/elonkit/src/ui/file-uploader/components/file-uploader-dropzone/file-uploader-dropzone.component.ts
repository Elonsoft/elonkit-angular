import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'es-file-uploader-dropzone',
  templateUrl: './file-uploader-dropzone.component.html',
  styleUrls: ['./file-uploader-dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESFileUploaderDropzoneComponent {
  @Input() multiple: boolean;
  @Input() accept = '*';

  @Output() selected = new EventEmitter<FileList>();

  @ViewChild('input', { static: true }) private input: ElementRef<HTMLInputElement>;

  constructor(public changeDetector: ChangeDetectorRef) {}

  public onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selected.emit(target.files);
    this.input.nativeElement.value = '';
  }

  public onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  public onDragEnter() {}

  public onDragLeave() {}

  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.selected.emit(event.dataTransfer.files);
  }

  get title() {
    return `Выберите файл${this.multiple ? 'ы' : ''}`;
  }

  get subtitle() {
    return `или перетащите файл${this.multiple ? 'ы' : ''} в эту область`;
  }
}
