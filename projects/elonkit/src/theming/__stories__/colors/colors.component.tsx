import * as React from 'react';

const PALETTES = {
  primary: [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'A50',
    'A75',
    'A100',
    'A150',
    'A200',
    'A300',
    'A400',
    'A500'
  ],
  accent: [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'A50',
    'A75',
    'A100',
    'A150',
    'A200',
    'A300',
    'A400',
    'A500'
  ],
  warn: ['500', 'A50', 'A75', 'A100', 'A150', 'A200', 'A300', 'A400', 'A500'],
  info: ['500', 'A50', 'A75', 'A100', 'A150', 'A200', 'A300', 'A400', 'A500'],
  positive: ['500', 'A50', 'A75', 'A100', 'A150', 'A200', 'A300', 'A400', 'A500'],
  attention: ['500', 'A50', 'A75', 'A100', 'A150', 'A200', 'A300', 'A400', 'A500'],
  'mono-a': [
    '500',
    'A50',
    'A100',
    'A150',
    'A200',
    'A300',
    'A400',
    'A500',
    'A600',
    'A700',
    'A800',
    'A900'
  ],
  'mono-b': [
    '500',
    'A50',
    'A100',
    'A150',
    'A200',
    'A300',
    'A400',
    'A500',
    'A600',
    'A700',
    'A800',
    'A900'
  ],
  greyscale: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  surface: ['0', '1', '2', '3', '4', '6', '8', '12', '16', '24', 'on'],
  white: [
    '500',
    'A50',
    'A100',
    'A150',
    'A200',
    'A300',
    'A400',
    'A500',
    'A600',
    'A700',
    'A800',
    'A900'
  ],
  black: [
    '500',
    'A50',
    'A100',
    'A150',
    'A200',
    'A300',
    'A400',
    'A500',
    'A600',
    'A700',
    'A800',
    'A900'
  ],
  other: [
    'background',
    'overlay-gallery',
    'overlay-modal',
    'overlay-filter',
    'link',
    'link-visited',
    'switch'
  ]
};

export const Colors: React.FC = () => {
  return (
    <div className='es-colors-story es-body-m'>
      {Object.keys(PALETTES).map((palette) => (
        <div key={palette} className='es-colors-story__palette'>
          <h6 className='es-colors-story__title mat-h4'>{palette}</h6>
          <div className='es-colors-story__colors'>
            {PALETTES[palette].map((hue) => (
              <div
                key={hue}
                className={`es-colors-story__color es-colors-story__color_${palette}_${hue}`}
              >
                {hue}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
