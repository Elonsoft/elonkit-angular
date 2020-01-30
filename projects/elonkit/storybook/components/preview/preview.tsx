import '!style-loader!css-loader!sass-loader!./preview.scss';

import * as React from 'react';
import { IPreviewProps } from './preview.types';

import { Source } from '@storybook/addon-docs/blocks';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

export const Preview: React.FC<IPreviewProps> = ({ children, source }) => {
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
    <div className='storybook-preview'>
      {children}
      {isSourceAvailable && (
        <div>
          <button className='storybook-preview__toggle' onClick={onSourceVisibleToggle}>
            {isSourceVisible ? 'Hide code' : 'Show code'}
          </button>
        </div>
      )}
      {isSourceVisible && (
        <div className='storybook-preview__source'>
          <Tabs
            className='storybook-preview__tabs'
            value={value}
            onChange={onChange}
            textColor='inherit'
          >
            {!!source.ts && <Tab value='ts' label='TS' />}
            {!!source.html && <Tab value='html' label='HTML' />}
            {!!source.scss && <Tab value='scss' label='SCSS' />}
          </Tabs>
          {!!source.ts && value === 'ts' && <Source dark language='ts' code={source.ts} />}
          {!!source.html && value === 'html' && <Source dark language='html' code={source.html} />}
          {!!source.scss && value === 'scss' && <Source dark language='scss' code={source.scss} />}
        </div>
      )}
    </div>
  );
};

Preview.defaultProps = {
  source: {}
};
