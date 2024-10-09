import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW_RESIZE$, SCREEN_SIZES } from '../../constants';

/**
 * Directive to conditionally hide an element based on the screen size.
 *
 * The element associated with this directive will be hidden and removed from the DOM
 * if the viewport width is equal to or greater than the specified breakpoint.
 *
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} hideOnScreen - The screen size at which the element should be hidden.
 *
 * @usageNotes
 * This directive is ideal for scenarios where certain elements should only be visible on smaller screens,
 * enabling a clean and user-friendly interface on larger devices.
 */
@Directive({
  selector: '[hideOnScreen]',
  standalone: true,
})
export class HideOnScreenDirective implements OnInit {
  private hasView = false;

  @Input({ required: true })
  hideOnScreen: keyof typeof SCREEN_SIZES;

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
    const minWidth = SCREEN_SIZES[this.hideOnScreen];

    if (currentWidth < minWidth && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (currentWidth >= minWidth && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }

    this.cd.detectChanges();
  }
}
