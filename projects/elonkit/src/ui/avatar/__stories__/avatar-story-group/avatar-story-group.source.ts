export const AVATAR_STORY_GROUP_SOURCE = {
<<<<<<< HEAD
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
=======
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
      { avatarSrc: null, size: 60 },
      { avatarSrc: null, size: 60, textTypography: 'typography' }
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
      [ngStyle]="{ 'z-index': avatars.length - i }"
      [size]="avatar.size"
      [alt]="avatar.alt"
      [src]="avatar.src"
      [textTypography]="avatar.textTypography"
    ></es-avatar>
  </es-avatar-group>
  `,
  scss: `
  .typography {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.25px;
  }
>>>>>>> fix(avatar): delete status badge from avatar component, some fixies
  `
};
