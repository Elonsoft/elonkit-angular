import { Component, Inject, OnInit } from '@angular/core';
import { CustomDialogRef } from '../custom-dialog-ref';
import { CUSTOM_DIALOG_DATA } from '../custom-dialog.tokens';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'es-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {
  public imageUrl: string;
  public isLoading = false;
  public deleteImageFn;

  constructor(
    private dialogRef: CustomDialogRef,
    @Inject(CUSTOM_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.imageUrl = this.data.imageUrl;
    this.deleteImageFn = this.data.deleteImageFn;
  }

  public closeImageDialog() {
    this.dialogRef.close({ imageUrl: this.imageUrl });
  }

  public deleteImage() {
    const obs = this.deleteImageFn();
    this.isLoading = true;
    obs.pipe().subscribe(
      () => {
        this.isLoading = false;
        this.dialogRef.close({ imageUrl: null });
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  public getSanitizedImage() {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.imageUrl}')`);
  }
}
