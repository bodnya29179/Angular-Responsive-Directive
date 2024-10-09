import { Component } from '@angular/core';
import { HideOnScreenDirective, ShowOnScreenDirective } from './directives';
import { SCREEN_SIZES } from './directives/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HideOnScreenDirective, ShowOnScreenDirective],
  standalone: true,
})
export class AppComponent {
  protected readonly screenSizes = SCREEN_SIZES;
}
