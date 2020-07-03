export const FILE_LIST_STORY_BASIC_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class AppComponent {
    public files: ESFileListFile[] = [
      {
        id: 1,
        type: 'image',
        file: 'https://dummyimage.com/400x400/405ed6/fff.jpg&text=ES',
        name: 'FileName1.jpg',
        size: 45678,
        content: null
      },
      {
        id: 2,
        type: 'image',
        file: 'https://dummyimage.com/400x400/228a0f/fff.jpg&text=ES',
        name: 'FileName2.jpg',
        size: 456789,
        content: null
      },
      {
        id: 3,
        type: 'application/pdf',
        file: 'https://dummyimage.com/400x400/d6761c/fff.jpg&text=ES',
        name: 'FileName3.pdf',
        size: 4567,
        content: null
      },
      {
        id: 4,
        type: 'image',
        file: 'https://dummyimage.com/400x400/2dbdb8/fff.jpg&text=ES',
        name: 'FileName4.jpg',
        size: 456,
        content: null
      }
    ];
  }
  `,
  html: `
  <es-file-list
    [options]="{
      canRemove: canRemove,
      canDownload: canDownload,
      hideImages: hideImages
    }"
    [files]="files"
    (remove)="onRemove($event)"
  ></es-file-list>
  `
};
