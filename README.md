# 🎯 Responsive Directives for Angular 

This project provides two custom structural directives to handle responsive design in Angular applications. These directives allow you to show or hide elements based on screen size breakpoints without relying on CSS media queries. The directives are:

- **ShowOnScreenDirective**: Displays elements when the screen width is equal to or larger than a specified breakpoint.
- **HideOnScreenDirective**: Hides elements when the screen width is equal to or larger than a specified breakpoint.

## ✨ Features

- **Declarative Control**: Easily manage element visibility with structural directives based on viewport size.
- **No External Dependencies**: Fully implemented using Angular's core and RxJS utilities.
- **Responsive UI**: Efficient and dynamic UI rendering based on real-time screen resizing.

## 🚀 Usage

### ShowOnScreen Directive

The `ShowOnScreenDirective` conditionally renders elements based on the screen size. You can specify at which breakpoint the element should be displayed.

```html
<div *showOnScreen="'lg'">
  This element will be visible on screens larger than or equal to 1024px (lg).
</div>
```

### HideOnScreen Directive

The `HideOnScreenDirective` conditionally hides elements based on the screen size. You can specify at which breakpoint the element should be hidden.

```html
<div *hideOnScreen="'md'">
  This element will be hidden on screens larger than or equal to 768px (md).
</div>
```

### 📏 Breakpoints

The following screen size breakpoints are available:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

These breakpoints can be adjusted in the `SCREEN_SIZES` object if needed.

## 🛠 Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/bodnya29179/angular-responsive-directive.git
   cd angular-responsive-directive
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Import the directives in your Angular module.

   ```typescript
   import { ShowOnScreenDirective } from './directives/show-on-screen.directive';
   import { HideOnScreenDirective } from './directives/hide-on-screen.directive';

   @NgModule({
     declarations: [
       ShowOnScreenDirective,
       HideOnScreenDirective,
       // other components and directives
     ],
     imports: [/* other modules */],
   })
   export class AppModule {}
   ```

## ⚡️ How It Works

Both directives listen to the window's `resize` event using RxJS. The window's width is checked against the specified breakpoint (`showOnScreen` or `hideOnScreen`), and the element is either rendered or removed from the DOM.

- **`ShowOnScreenDirective`**: Adds the element to the DOM when the screen width is equal to or larger than the specified breakpoint.
- **`HideOnScreenDirective`**: Removes the element from the DOM when the screen width is equal to or larger than the specified breakpoint.

The directives use the `WINDOW_RESIZE$` observable, which emits events when the window is resized. The `takeUntilDestroyed` operator ensures that the subscription to the resize event is properly cleaned up when the directive is destroyed.

### 📚 Example Usage

```html
<!-- Show only on large screens and above (1024px and larger) -->
<div *showOnScreen="'lg'">Visible on large screens</div>

<!-- Hide on medium screens and above (768px and larger) -->
<div *hideOnScreen="'md'">Hidden on medium screens</div>
```

## 📄 License

This project is licensed under the MIT License.
