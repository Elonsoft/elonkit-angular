export const IMAGE_CAROUSEL_STORY_CUSTOM_ICON_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class AppComponent {
    constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'magnify',
        sanitizer.bypassSecurityTrustResourceUrl('/icons/magnify.svg')
      );
      iconRegistry.addSvgIcon(
        'trash-can',
        sanitizer.bypassSecurityTrustResourceUrl('/icons/image-carousel/trash-can.svg')
      );
    }
  }

  @NgModule({
    ...
    imports: [CommonModule, ESImageCarouselModule, HttpClientModule],
    ...
  })
  `,
  html: `
  <div class="container">
    <es-image-carousel viewSvgIcon="magnify" removeSvgIcon="trash-can" [files]="files"></es-image-carousel>
  </div>
  `
};
