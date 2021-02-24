export const AVATAR_STORY_GROUP_SOURCE = {
  ts: `
  @Component({
    encapsulation: ViewEncapsulation.None
  })
  export class AppComponent {
    public avatars = [
      {
        showStatus: true,
        statusSrc: '/icons/avatar/star.svg',
        statusHeight: '20px',
        statusWidth: '20px',
        src: '/img/es-logo.png'
      },
      { avatarSrc: null },
      { avatarSrc: null, textTypography: 'typography' }
    ];
  }
  `,
  html: `
  <div class="group">
    <es-avatar-group [size]="size" [variant]="variant" [avatars]="avatars"></es-avatar-group>
  </div>
  `,
  scss: `
  .typography {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.25px;
  }
  `
};
