import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  InjectionToken,
  Optional,
  Inject,
  HostListener
} from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  ESImageCarouselFile,
  ESImageCarouselAction,
  ESImageCarouselOptions
} from './image-carousel.types';
import { ESImageCarouselLocale } from './image-carousel.component.locale';
import { validateFileType } from '~utils/validate-file-type';

export const ES_IMAGE_CAROUSEL_DEFAULT_OPTIONS = new InjectionToken<ESImageCarouselOptions>(
  'ES_IMAGE_CAROUSEL_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESImageCarouselComponent implements OnInit {
  /**
   * Array of files to display.
   */
  @Input()
  public get files(): ESImageCarouselFile[] {
    return this._files;
  }
  public set files(value: ESImageCarouselFile[]) {
    this._files = value.filter((file) => validateFileType(file, this.imageTypes));
  }
  private _files: ESImageCarouselFile[];

  /**
   * File types to be considered as image separatedby a comma, e.g. `image/png,image/jpg,image/jpeg`.
   * Defaults to `image/*`.
   */
  @Input()
  public get imageTypes(): string {
    return this._imageTypes;
  }
  public set imageTypes(value: string) {
    this._imageTypes = value ?? this.defaultOptions?.imageTypes ?? 'image/*';
  }
  private _imageTypes: string;

  /**
   * Defines height of each image in pixels.
   */
  @Input()
  public get imageHeight(): number {
    return this._imageHeight;
  }
  public set imageHeight(value: number) {
    this._imageHeight = coerceNumberProperty(value, 160);
  }
  private _imageHeight: number;

  /**
   * Defines width of each image in pixels.
   */
  @Input()
  public get imageWidth(): number {
    return this._imageWidth;
  }
  public set imageWidth(value: number) {
    this._imageWidth = coerceNumberProperty(value, 160);
  }
  private _imageWidth: number;

  /**
   * Defines gap between images in pixels.
   */
  @Input()
  public get gap(): number {
    return this._gap;
  }
  public set gap(value: number) {
    this._gap = coerceNumberProperty(value, 16);
  }
  private _gap: number;

  /**
   * Defines whether remove buttons should be rendered for images.
   */
  @Input()
  public get canRemove(): boolean {
    return this._canRemove;
  }
  public set canRemove(value: boolean) {
    this._canRemove = coerceBooleanProperty(value);
  }
  private _canRemove: boolean;

  /**
   * Defines whether view buttons should be rendered for images.
   */
  @Input()
  public get canView(): boolean {
    return this._canView;
  }
  public set canView(value: boolean) {
    this._canView = coerceBooleanProperty(value);
  }
  private _canView: boolean;

  /**
   * Defines custom svg icon to render for view buttons.
   */
  @Input()
  public get viewSvgIcon(): string {
    return this._viewSvgIcon;
  }
  public set viewSvgIcon(value: string) {
    this._viewSvgIcon = value ?? this.defaultOptions?.viewSvgIcon;
  }
  private _viewSvgIcon: string;

  /**
   * Object with `ESImageCarouselAction` type is emitted.
   */
  @Output()
  public view: EventEmitter<ESImageCarouselAction> = new EventEmitter();

  /**
   * Object with `ESImageCarouselAction` type is emitted.
   */
  @Output()
  public remove: EventEmitter<ESImageCarouselAction> = new EventEmitter();

  @ViewChild('carousel', { static: true })
  private carousel: ElementRef<HTMLElement>;

  private carouselPosition = 0;
  private slideCount = 0;
  private maxSlideCount: number;

  /**
   * @internal
   * @ignore
   */
  @HostListener('window:resize') public onResize() {
    const fitInViewCount = Math.floor(
      this.carousel.nativeElement.clientWidth / (this.imageWidth + this.gap)
    );
    this.maxSlideCount = this.files.length - fitInViewCount;
  }

  /**
   * @internal
   * @ignore
   */
  constructor(
    @Optional()
    @Inject(ES_IMAGE_CAROUSEL_DEFAULT_OPTIONS)
    private defaultOptions: ESImageCarouselOptions,
    public locale: ESImageCarouselLocale
  ) {
    this.gap = this.defaultOptions?.gap;
    this.imageHeight = this.defaultOptions?.imageHeight;
    this.imageWidth = this.defaultOptions?.imageWidth;
    this.imageTypes = this.defaultOptions?.imageTypes;
    this.canRemove = this.defaultOptions?.canRemove;
    this.canView = this.defaultOptions?.canView;
    this.viewSvgIcon = this.defaultOptions?.viewSvgIcon;
  }

  /**
   * @internal
   * @ignore
   */
  public ngOnInit(): void {
    const fitInViewCount = Math.floor(
      this.carousel.nativeElement.clientWidth / (this.imageWidth + this.gap)
    );
    this.maxSlideCount = this.files.length - fitInViewCount;
  }

  /**
   * @internal
   * @ignore
   */
  public getImage(file: ESImageCarouselFile): string {
    return file.id ? file.file : file.base64;
  }

  /**
   * @internal
   * @ignore
   */
  public slideRight(): void {
    this.slideCount++;
    this.carouselPosition = this.carouselPosition - (this.imageWidth + this.gap);
  }

  /**
   * @internal
   * @ignore
   */
  public slideLeft(): void {
    this.slideCount--;
    this.carouselPosition = this.carouselPosition + (this.imageWidth + this.gap);
  }

  /**
   * @internal
   * @ignore
   */
  public get carouselWidth(): number {
    // Last file doesn't have a gap
    const gapWidth = (this.files.length - 1) * this.gap;
    const totalWidth = this.files.length * this.imageWidth + gapWidth;
    return totalWidth;
  }

  /**
   * @internal
   * @ignore
   */
  public get getTranslateX(): string {
    return `translateX(${this.carouselPosition}px)`;
  }

  /**
   * @internal
   * @ignore
   */
  public get canScrollRight(): boolean {
    return this.slideCount < this.maxSlideCount;
  }

  /**
   * @internal
   * @ignore
   */
  public get canScrollLeft(): boolean {
    return Math.abs(this.carouselPosition) >= this.imageWidth + this.gap;
  }

  /**
   * @internal
   * @ignore
   */
  public viewImage(file: ESImageCarouselAction): void {
    this.view.emit(file);
  }

  /**
   * @internal
   * @ignore
   */
  public removeImage(file: ESImageCarouselAction): void {
    this.remove.emit(file);
  }
}
