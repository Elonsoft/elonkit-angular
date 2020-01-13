import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent {
  text = '';
  options: string[] = ['One', 'Two', 'Three'];

  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    console.log(this.text);
  }

  public displayWith(suggestion?: any): string | undefined {
    console.log(suggestion);
    return suggestion ? suggestion : undefined;
  }
}
