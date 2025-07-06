# Angular Notes

## 📦 Components vs Directives

- Components are actually **directives with templates**.
- A directive is like a component **without a template**.
- Use a **component** when you want to define UI + behavior.
- Use a **directive** when you only want to change behavior of existing DOM elements.

---

## 📤 @Input and @Output

- `@Input()` is used to **receive data from a parent**.
- `@Output()` is used to **emit custom events to the parent**.
  ```ts
  @Output() cancel = new EventEmitter<void>();
  ```
  - The parent listens to this with `(cancel)="handleCancel()"`.

---

## 🔄 Event Flow

- Child emits: `this.cancel.emit();`
- Parent listens: `<child-comp (cancel)="handleCancel()">`

---

## 💡 Common Patterns

- `EventEmitter<Type>()` helps keep type safety.
- Use `$event` to catch the emitted data in parent method.

---

## 🧠 Other Notes

- Angular templates do **not use** standard JS like `.forEach()` or `.map()` directly — use `*ngFor` (for older versions).

---

## 📝 ngModel (Two-Way Binding)

```html
<!-- 
  ngModel is an Angular directive that binds an input field to your component's data.
  It enables two-way data binding — when the user types, the value in your component updates,
  and if you change the value in code, the input field updates too.

  This is useful when you want to live-track or react to what the user types without manually
  setting up event listeners or updating the DOM.

  🧠 Coming from React?
  Think of ngModel like combining `value={state}` and `onChange={e => setState(e.target.value)}` into one.
  Angular handles both directions automatically.

  ✅ To enable full two-way binding with a variable, use the syntax: [(ngModel)]="enteredTitle"
-->
<input type="text" id="title" name="title" [(ngModel)]="enteredTitle" />
```
