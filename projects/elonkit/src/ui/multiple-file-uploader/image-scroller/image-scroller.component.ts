import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { CustomDialogService } from '../custom-dialog';
import { ImageDialogComponent } from '../custom-dialog/image-dialog/image-dialog.component';
import { IMAGE_TYPES } from '../multiple-file-uploader.configs';
import { ESFileDownloadService } from '../file-download.service';
import {
  IESMultipleUploaderRemoveAction,
  IESMultipleUploaderFile
} from '../multiple-file-uploader.types';

@Component({
  selector: 'es-image-scroller',
  templateUrl: './image-scroller.component.html',
  styleUrls: ['./image-scroller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESImageScrollerComponent implements AfterViewChecked {
  public IMAGE_TYPES = IMAGE_TYPES;

  @Input()
  public files: IESMultipleUploaderFile[];

  @Input()
  public imgHeight = '160px';

  @Input()
  public imgWidth = '160px';

  @Input()
  public canRemove = true;

  @Input()
  public canDownload = false;

  @Output()
  public remove: EventEmitter<IESMultipleUploaderRemoveAction> = new EventEmitter();

  @ViewChild('scroller', { static: true })
  public scroller: ElementRef<HTMLElement>;

  constructor(
    private customDialogService: CustomDialogService,
    private documentLinkService: ESFileDownloadService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngAfterViewChecked(): void {
    this.cdRef.markForCheck();
  }

  public getImage(file: IESMultipleUploaderFile): string {
    return file.id ? file.file : file.base64;
  }

  public getSanitizedImage(file: IESMultipleUploaderFile): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.getImage(file)}')`);
  }

  public scrollToRight(): void {
    const scrollValues = this.getValuesToScroll();
    if (this.isRightButton()) {
      let left = +this.pruneString(scrollValues.el.style.left);
      if (scrollValues.countOfElOutView > scrollValues.el.clientWidth) {
        left =
          left -
          (scrollValues.countOfElOutView + scrollValues.restOfCountInView) * scrollValues.imgWidth;
      } else {
        left =
          left -
          (scrollValues.countOfElInView + scrollValues.restOfCountInView) * scrollValues.imgWidth +
          scrollValues.margin;
      }

      left =
        Math.abs(left) + scrollValues.el.clientWidth > scrollValues.el.scrollWidth
          ? -(scrollValues.el.scrollWidth - scrollValues.el.clientWidth)
          : left;

      scrollValues.el.style.left = `${left}px`;
    }
  }

  public isRightButton(): boolean {
    const el = this.scroller.nativeElement;
    const left = Math.abs(+this.pruneString(el.style.left)) + el.offsetWidth;
    return left !== el.scrollWidth;
  }

  public isLeftButton(): boolean {
    const el = this.scroller.nativeElement;
    return +this.pruneString(el.style.left) !== 0;
  }

  public scrollToLeft(): void {
    const scrollValues = this.getValuesToScroll();

    if (this.isLeftButton()) {
      let left = +this.pruneString(scrollValues.el.style.left);
      if (left > scrollValues.el.clientWidth) {
        left =
          left +
          (scrollValues.countOfElOutView + scrollValues.restOfCountInView) * scrollValues.imgWidth;
      } else {
        left =
          left +
          (scrollValues.countOfElInView + scrollValues.restOfCountInView) * scrollValues.imgWidth -
          scrollValues.margin;
      }

      left = left > 0 ? 0 : left;
      scrollValues.el.style.left = `${left}px`;
    }
  }

  public removeFile(file: IESMultipleUploaderRemoveAction): void {
    this.remove.emit(file);
  }

  public openImageDialog(file: IESMultipleUploaderFile): void {
    this.customDialogService.open(ImageDialogComponent, {
      data: {
        imageUrl: this.getImage(file)
      }
    });
  }

  public downloadFile(file: IESMultipleUploaderFile): void {
    if (!file.file) {
      return;
    }
    this.documentLinkService.saveAs(file.file, file.name).subscribe();
  }

  private pruneString(val: string): string {
    return val.replace(/[а-я]|[a-z]?\s*/g, '');
  }

  private getValuesToScroll() {
    const el = this.scroller.nativeElement;
    const margin = 16;
    const imgWidth = +this.pruneString(this.imgWidth);
    const countOfElInView = Math.floor(el.clientWidth / (imgWidth + margin));
    const doubleCountInView = el.clientWidth / (imgWidth + margin);
    const doubleCountAllView = el.scrollWidth / (imgWidth + margin);
    const countOfElOutView = doubleCountAllView - doubleCountInView;
    const restOfCountInView = Math.ceil(doubleCountInView) - doubleCountInView;

    return {
      el,
      margin,
      imgWidth,
      countOfElInView,
      doubleCountInView,
      doubleCountAllView,
      countOfElOutView,
      restOfCountInView
    };
  }
}
