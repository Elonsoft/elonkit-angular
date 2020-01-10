import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";

import { ElonkitModule } from "./elonkit.module";

export default { title: "Elonkit", decorators: [withKnobs, withA11y] };

export const AllVariants = () => ({
  template: `<es-elonkit [text]="text" (hello)="onHello($event)"></es-elonkit>`,
  moduleMetadata: {
    imports: [ElonkitModule]
  },
  props: {
    text: text("text", "Hello Storybook"),
    onHello: action("onHello")
  }
});
