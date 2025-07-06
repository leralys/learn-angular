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

- Angular templates do **not use** standard JS like `.forEach()` or `.map()` directly — use `*ngFor` (for older versions)
