import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW_RESIZE$, SCREEN_SIZES } from '../constants';

/**
 * Directive to conditionally render an element based on the screen size.
 *
 * The element associated with this directive will only be rendered if the
 * viewport width is equal to or greater than the specified breakpoint.
 *
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} showOnScreen - The minimum screen size at which the element should be displayed.
 *
 * @usageNotes
 * This directive is useful for implementing responsive designs where certain elements should only
 * be visible on larger screens, improving both performance and user experience on smaller devices.
 */
@Directive({
  selector: '[showOnScreen]',
  standalone: true,
})
export class ShowOnScreenDirective implements OnInit {
  private hasView = false;

  @Input({ required: true })
  showOnScreen: keyof typeof SCREEN_SIZES;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly cd: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    WINDOW_RESIZE$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.handleResize());
  }

  private handleResize(): void {
    const currentWidth = window.innerWidth;
    const minWidth = SCREEN_SIZES[this.showOnScreen];

    if (currentWidth >= minWidth && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (currentWidth < minWidth && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }

    this.cd.detectChanges();
  }
}
