import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  Input
} from '@angular/core';
import { Router } from '@angular/router';
import { ES_BREADCRUMBS_DEFAULT_SIZES } from '../..';

@Component({
  selector: 'es-breadcrumbs-customization',
  template: `
    <div class="customization">
      <es-breadcrumbs typography="mat-body-1" [sizes]="sizes" [withBackButton]="withBackButton">
        <mat-icon *esBreadcrumbsSeparator class="es-breadcrumbs__separator">
          chevron_right
        </mat-icon>
        <mat-icon *esBreadcrumbsBack> keyboard_backspace </mat-icon>
        <mat-icon *esBreadcrumbsMore> more_horiz </mat-icon>
      </es-breadcrumbs>
      <br />
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./breadcrumbs-story-customization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsStoryCustomizationComponent implements OnInit {
  public sizes = {
    ...ES_BREADCRUMBS_DEFAULT_SIZES,
    separator: 24
  };

  @Input() public withBackButton: boolean;

  constructor(private router: Router) {}

  public ngOnInit() {
    // Hack for RouterTestingModule
    this.router.navigate(['/categories/1/1/edit']);
  }
}
