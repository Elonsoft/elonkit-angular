export const AVATAR_STORY_GROUP_SOURCE = {
  ts: `
  @Component({
    encapsulation: ViewEncapsulation.None
  })
  export class AppComponent {
    public avatars = [
      {
        showStatus: true,
        statusSrc: '/icons/avatar/star.svg'
      },
      { avatarSrc: null }
    ];
  }
  `,
  html: `
  <div class="group">
    <es-avatar
      *ngFor="let avatar of avatars; index as i"
      class="group__avatar"
      [showStatus]="avatar.showStatus"
      [statusSrc]="avatar.statusSrc"
      [ngStyle]="{ 'z-index': 10 - i }"
    ></es-avatar>
    <es-avatar class="group__avatar" textTypography="typography"></es-avatar>
  </div>
  `,
  scss: `
  .group {
    display: flex;

    &__avatar {
      background: #fff;
      border: 2px solid #fff;
      border-radius: 50%;

      &:last-child {
        z-index: 1;
      }

      &:not(:first-child) {
        margin-left: -12px;
      }
    }
  }

  .typography {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.25px;
  }
  `
};
