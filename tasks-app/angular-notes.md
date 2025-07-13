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

---

## 📩 `$event` in Angular

`$event` is a special Angular variable that holds the data passed from an event — either a native event (like a click) or a custom one emitted from a child component.

### ✅ When to use `$event`

Use `$event` **when the event emits data**, so you can pass it into your method.

**Example:**

```ts
@Output() add = new EventEmitter<string>();

this.add.emit('New Task'); // in child component
```

```html
<!-- Parent receives the data -->
<app-task-form (add)="onAddTask($event)" />
```

```ts
onAddTask(taskTitle: string) {
  console.log(taskTitle); // 'New Task'
}
```

---

### ❌ When you don't need `$event`

If the event doesn't send any data (like just a signal), you can skip `$event`.

**Example:**

```ts
@Output() cancel = new EventEmitter<void>();

this.cancel.emit(); // no payload
```

```html
<!-- No need for $event -->
<app-modal (cancel)="onCancel()" />
```

---

### 🧠 Summary

| Do I need `$event`? | Child emits data? | Example usage               |
| ------------------- | ----------------- | --------------------------- |
| ✅ Yes              | Yes               | `(add)="onAddTask($event)"` |
| ❌ No               | No                | `(cancel)="onCancel()"`     |

---

## 🧩 Content Projection (Like `children` in React)

Content Projection in Angular is similar to how React uses `children` to pass nested content into a component.

### 🟦 React Example

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h2>Hello</h2>
  <p>Details</p>
</Card>;
```

### 🟥 Angular Equivalent

**card.component.html**

```html
<div class="card">
  <ng-content></ng-content>
</div>
```

**parent.component.html**

```html
<app-card>
  <h2>Hello</h2>
  <p>Details</p>
</app-card>
```

### 🧠 Summary

| Concept          | React                                | Angular                            |
| ---------------- | ------------------------------------ | ---------------------------------- |
| Slot for content | `children` prop                      | `<ng-content></ng-content>`        |
| Custom layout    | JSX                                  | Angular template                   |
| Content passed   | Between `<Component>...</Component>` | Between `<app-comp>...</app-comp>` |

---

## 🛠️ Services in Angular

Services are classes in Angular used to organize and share **logic** or **data** between components.  
They help keep components lean and focused on display, while services handle things like:

- Fetching data (e.g., from an API)
- Managing shared state
- Performing business logic

### ✅ Why use a service?

- Centralize logic in one place (e.g., fetching tasks)
- Reuse the same logic across multiple components
- Improve code organization and testability

### 🧠 Think of it like:

- A **service** holds the "brain" (logic/data).
- A **component** shows the "face" (UI).

### 🧪 Example:

```ts
// tasks.service.ts
@Injectable({ providedIn: "root" })
export class TasksService {
  private tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }
}
```

Then in a component:

```ts
constructor(private tasksService: TasksService) {}

ngOnInit() {
  this.allTasks = this.tasksService.getTasks();
}
```

---

## 💉 Dependency Injection (DI) in Angular

Angular uses Dependency Injection (DI) to provide components with the services they need — such as data handling, business logic, or shared state.

### ✅ Why use Dependency Injection?

- Keeps components lean and focused on the UI
- Encourages reusable and testable code
- Automatically handles service creation and lifetime

---

### 🛠️ Manual property assignment (classic OOP style)

```ts
export class TasksComponent {
  private tasksService: TasksService;

  constructor(tasksService: TasksService) {
    // Store the injected service in a property
    this.tasksService = tasksService;
  }
}
```

- You manually declare a class property (`private tasksService`) and assign it in the constructor.

---

### 🚀 Shortcut: automatic property creation

```ts
export class TasksComponent {
  constructor(private tasksService: TasksService) {
    // Angular auto-creates and assigns the property
  }
}
```

- `private` (or `public`) before the parameter automatically:

  - creates a class property
  - assigns the injected value to it

- Use `public` if you want to access it in the template (e.g., `{{ tasksService.tasks }}`)

---

### 🧠 Key points to remember

| Concept               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| DI                    | Angular provides services your component needs               |
| Constructor injection | You list services in the constructor, Angular passes them in |
| `private`/`public`    | Automatically creates and assigns the class property         |
