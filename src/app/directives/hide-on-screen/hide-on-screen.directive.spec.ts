import { HideOnScreenDirective } from './hide-on-screen.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SCREEN_SIZES } from '../constants';

@Component({
  template: `<div *hideOnScreen="screenSize" class="test-element">Hidden on md and larger</div>`,
  imports: [HideOnScreenDirective],
  standalone: true,
})
class HostComponent {
  screenSize: keyof typeof SCREEN_SIZES;
}

describe(HideOnScreenDirective.name, () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
  });

  function getDebugElement(): DebugElement {
    return fixture.debugElement.query(By.css('.test-element'));
  }

  function dispatchResize(): void {
    window.dispatchEvent(new Event('resize'));
  }

  Object.keys(SCREEN_SIZES).forEach((screenSize: keyof typeof SCREEN_SIZES) => {
    it(`should hide the element when screen width is greater than or equal to ${SCREEN_SIZES[screenSize]}px`, fakeAsync(() => {
      // Arrange
      fixture.componentInstance.screenSize = screenSize;

      // Act
      fixture.detectChanges();

      tick(300);

      spyOnProperty(window, 'innerWidth').and.returnValue(SCREEN_SIZES[screenSize]);

      dispatchResize();
      fixture.detectChanges();

      tick(300);

      // Assert
      expect(getDebugElement()).toBeFalsy();
    }));

    it(`should display the element when screen width is less than ${SCREEN_SIZES[screenSize]}px`, fakeAsync(() => {
      // Arrange
      fixture.componentInstance.screenSize = screenSize;

      // Act
      fixture.detectChanges();

      tick(300);

      spyOnProperty(window, 'innerWidth').and.returnValue(SCREEN_SIZES[screenSize] - 1);

      dispatchResize();
      fixture.detectChanges();

      tick(300);

      // Assert
      expect(getDebugElement()).toBeTruthy();
    }));

    it('should hide the element only once when toggling screen width', fakeAsync(() => {
      // Arrange
      fixture.componentInstance.screenSize = screenSize;

      const widthSpy = spyOnProperty(window, 'innerWidth');
      widthSpy.and.returnValue(SCREEN_SIZES[screenSize] - 1);

      // Act
      fixture.detectChanges();

      tick(300);

      dispatchResize();
      fixture.detectChanges();

      tick(300);

      widthSpy.and.returnValue(SCREEN_SIZES[screenSize]);
      dispatchResize();
      fixture.detectChanges();

      tick(300);

      widthSpy.and.returnValue(SCREEN_SIZES[screenSize] - 1);
      dispatchResize();
      fixture.detectChanges();

      tick(300);

      // Assert
      expect(getDebugElement()).toBeTruthy();
    }));
  });
});
