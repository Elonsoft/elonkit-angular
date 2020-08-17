import * as React from 'react';

const REGEXP = /\.es-colors__color_.+_[^{]+/g;
const BASE_LENGTH = '.es-colors__color_'.length;

export const Colors: React.FC = () => {
  const palettes = React.useMemo(() => {
    const text = Array.from(document.getElementsByTagName('style'))
      .map(element => element.textContent)
      .join();

    const pairs: Array<[string, string]> = Array.from((text as any).matchAll(REGEXP)).map(e =>
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
    <div className='es-colors mat-body-1'>
      {Object.keys(palettes).map(palette => (
        <div key={palette} className='es-colors__palette'>
          <h6 className='es-colors__title mat-h4'>{palette}</h6>
          <div className='es-colors__colors'>
            {palettes[palette].map(hue => (
              <div key={hue} className={`es-colors__color es-colors__color_${palette}_${hue}`}>
                {hue}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
