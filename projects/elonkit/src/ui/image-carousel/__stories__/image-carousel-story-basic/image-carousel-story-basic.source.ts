export const IMAGE_CAROUSEL_STORY_BASIC_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class AppComponent {
    public files = [{
      id: 1,
      type: 'image/jpg',
      file: 'https://dummyimage.com/400x400/405ed6/fff.jpg&text=ES1',
      name: 'FileName1.jpg',
      size: 45678,
      content: null
    },
    ...
    {
      id: 7,
      type: 'image/jpg',
      file: 'https://dummyimage.com/400x400/28B463/fff.jpg&text=ES7',
      name: 'FileName7.jpg',
      size: 456789,
      content: null
    }]
  }
  `,
  scss: `
  .container {
    max-width: 600px;
  }
  `,
  html: `
  <div class="container">
    <es-image-carousel
      [imageHeight]="imageHeight"
      [imageWidth]="imageWidth"
      [gap]="gap"
      [canView]="canView"
      [canRemove]="canRemove"
      [imageTypes]="imageTypes"
      [files]="files"
      (view)="onView($event)"
      (remove)="onRemove($event)"
    ></es-image-carousel>
  </div>
  `
};
