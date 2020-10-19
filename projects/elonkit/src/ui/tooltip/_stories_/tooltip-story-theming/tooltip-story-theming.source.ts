export const TOOLTIP_STORY_THEMING_SOURCE = {
  html: `
  <button
    mat-stroked-button
    esTooltip="This is a customized tooltip"
    esTooltipArrow
    esTooltipClass="es-tooltip_purple"
  >
    1
  </button>

  <button
    mat-stroked-button
    esTooltip="This is a customized tooltip"
    esTooltipArrow
    esTooltipClass="es-tooltip_marine"
  >
    2
  </button>
  `,
  scss: `
  .es-tooltip {
    &_purple {
      @include es-tooltip-color(#9b78ff, #fff);
    }

    &_marine {
      @include es-tooltip-color(#3acac0, #fff);
    }
  }
  `
};
