export const AVATAR_STORY_GROUP_SOURCE = {
  ts: `
  @Component({
    encapsulation: ViewEncapsulation.None
  })
  export class AppComponent {
    @Input()
    public size: number;
  }
  `,
  html: `
  <es-avatar-group
    [size]="size"
  >
    <es-avatar
      [size]="size"
      [alt]="alt"
      [src]="src"
    ></es-avatar>
    <es-avatar
      [size]="size"
      [alt]="alt"
      [src]="src"
    ></es-avatar>
    <es-avatar
      [size]="size"
      [alt]="alt"
      [src]="src"
    ></es-avatar>
  </es-avatar-group>
  `
};
