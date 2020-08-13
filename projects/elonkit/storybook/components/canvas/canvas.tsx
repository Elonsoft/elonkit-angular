import '!style-loader!css-loader!sass-loader!./canvas.scss';

import * as React from 'react';
import { ICanvasProps } from './canvas.types';

import { Source } from '@storybook/addon-docs/blocks';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import dedent from 'ts-dedent';

export function Canvas({ children, source }: ICanvasProps) {
  const [value, setValue] = React.useState(source.ts ? 'ts' : source.html ? 'html' : 'scss');
  const [isSourceVisible, setSourceVisible] = React.useState(false);

  const onChange = React.useCallback((_, newValue: string) => {
    setValue(newValue);
  }, []);

  const onSourceVisibleToggle = React.useCallback(() => {
    setSourceVisible(!isSourceVisible);
  }, [isSourceVisible]);

  const isSourceAvailable = React.useMemo(() => {
    return Boolean(source.html || source.ts || source.scss);
  }, [source]);

  return (
    <div className='storybook-canvas'>
      {children}
      {isSourceAvailable && (
        <div>
          <button className='storybook-canvas__toggle' onClick={onSourceVisibleToggle}>
            {isSourceVisible ? 'Hide code' : 'Show code'}
          </button>
        </div>
      )}
      {isSourceVisible && (
        <div className='storybook-canvas__source'>
          <Tabs
            className='storybook-canvas__tabs'
            value={value}
            onChange={onChange}
            textColor='inherit'
          >
            {!!source.ts && <Tab value='ts' label='TS' />}
            {!!source.html && <Tab value='html' label='HTML' />}
            {!!source.scss && <Tab value='scss' label='SCSS' />}
          </Tabs>
          {!!source.ts && value === 'ts' && <Source dark language='ts' code={dedent(source.ts)} />}
          {!!source.html && value === 'html' && (
            <Source dark language='html' code={dedent(source.html)} />
          )}
          {!!source.scss && value === 'scss' && (
            <Source dark language='scss' code={dedent(source.scss)} />
          )}
        </div>
      )}
    </div>
  );
}

Canvas.defaultProps = {
  source: {}
};
