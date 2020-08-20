import * as React from 'react';

const REGEXP = /\.es-colors-story__color_.+_[^{]+/g;
const BASE_LENGTH = '.es-colors-story__color_'.length;

export const Colors: React.FC = () => {
  const palettes = React.useMemo(() => {
    const text = Array.from(document.getElementsByTagName('style'))
      .map((element) => element.textContent)
      .join();

    const pairs: Array<[string, string]> = Array.from((text as any).matchAll(REGEXP)).map((e) =>
      e[0].substring(BASE_LENGTH, e[0].length - 1).split('_')
    );

    const result: { [palette: string]: string[] } = {};

    pairs.forEach(([palette, hue]) => {
      if (result[palette]) {
        if (!result[palette].includes(hue)) {
          result[palette].push(hue);
        }
      } else {
        result[palette] = [hue];
      }
    });

    return result;
  }, []);

  return (
    <div className='es-colors-story es-body-m'>
      {Object.keys(palettes).map((palette) => (
        <div key={palette} className='es-colors-story__palette'>
          <h6 className='es-colors-story__title mat-h4'>{palette}</h6>
          <div className='es-colors-story__colors'>
            {palettes[palette].map((hue) => (
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
