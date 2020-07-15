export const ALERT_STORY_ICON_MAPPING_SOURCE = {
  ts: `
  import { ES_ALERT_DEFAULT_OPTIONS } from '@elonsoft/elonkit/ui/alert';

  @NgModule({
    ...
    providers: [{
      provide: ES_ALERT_DEFAULT_OPTIONS,
      useValue: {
        iconMapping: {
          warning: { svgIcon: 'warning' },
          error: { svgIcon: 'error' }
        }
      }
    }]
  })
  export class AppModule {}
  `,
  html: `
  <es-alert variant="default" icon="new_releases">
    Message
  </es-alert>

  <es-alert variant="info" svgIcon="warning">
    Message
  </es-alert>

  <es-alert variant="success">
    Message
  </es-alert>

  <es-alert variant="warning">
    Message
  </es-alert>

  <es-alert variant="error">
    Message
  </es-alert>
  `
};
