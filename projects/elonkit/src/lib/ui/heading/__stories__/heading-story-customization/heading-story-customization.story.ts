export const HEADING_STORY_CUSTOMIZATION_SOURCE = {
  html: `
  <div class="custom-heading">
    <es-heading></es-heading>
  </div>
  `,
  scss: `
  .custom-heading {
    color: #912ce4;

    .es-heading {
      font-size: 24px;

      &__title {
        color: #eb20ae;
      }
    }
  }
  `
};
