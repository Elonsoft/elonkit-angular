export const AVATAR_STORY_GROUP_SOURCE = {
  ts: `
  @Component({
    encapsulation: ViewEncapsulation.None
  })
  export class AppComponent {
    @Input()
    public size: number;

    public avatars = [
      {
        size: 60,
        src: '/img/es-logo.png',
        alt: 'alt text'
      },
      { src: null, size: 60 },
      { src: null, size: 60, textTypography: 'typography' }
    ];
  }
  `,
  html: `
  <es-avatar-group
  [size]="size"
  >
    <es-avatar
      *ngFor="let avatar of avatars; index as i"
      class="es-avatar-group__avatar"
      [size]="avatar.size"
      [alt]="avatar.alt"
      [src]="avatar.src"
      [textTypography]="avatar.textTypography"
    ></es-avatar>
  </es-avatar-group>
  `
};
