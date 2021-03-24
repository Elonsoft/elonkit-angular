import { render } from '@testing-library/angular';
import { ESLocaleService, en, ru } from '../../locale';
import { ESTableActionsComponent, ESTableActionsModule } from '../';

describe('Table Actions', () => {
  it('Should change locale', async () => {
    const localeService = new ESLocaleService();
    localeService.register('ru', ru);
    localeService.use('ru');

    const component = await render(ESTableActionsComponent, {
      imports: [ESTableActionsModule],
      providers: [{ provide: ESLocaleService, useValue: localeService }],
      excludeComponentDeclaration: true
    });

    expect(component.getByText(ru.tableActions.title)).toBeInTheDocument();
  });

  it('Should accept total input', async () => {
    const component = await render(ESTableActionsComponent, {
      imports: [ESTableActionsModule],
      componentProperties: {
        total: 15
      },
      excludeComponentDeclaration: true
    });

    expect(component.getAllByText('Selected 15')).not.toBeNull();
  });
});
