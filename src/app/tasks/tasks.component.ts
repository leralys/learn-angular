import { Component, Input } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  // props that component receives
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;

  isAddingTask = false;

  // ✅ Dependency Injection in Angular
  // You declare what services (dependencies) your class needs by listing them as parameters in the constructor.
  // Angular automatically creates and provides those services when the component is initialized.

  // 🟡 Manual property setup (verbose, but clear OOP style)
  // private tasksService: TasksService;

  // constructor(tasksService: TasksService) {
  //   // Store the injected service in a class property so it's accessible in other methods
  //   this.tasksService = tasksService;
  // }

  // ✅ Shortcut version — Angular will auto-create the class property for you
  // This does exactly the same thing as above, but in one line
  // Adding `private` (or `public`) in the constructor parameter creates the property automatically
  // - Use `private` if you only need it inside the class
  // - Use `public` if you want to access it (for example from the template)
  constructor(private tasksService: TasksService) {
    // no need to manually assign — Angular does it for you
  }

  onToggleAddTask() {
    this.isAddingTask = !this.isAddingTask;
  }

  // ✅ Getter = computed property (like a read-only function)
  // - Looks like a property when used (no parentheses), but runs logic when accessed
  // - Useful for returning dynamic or filtered data from other sources (like a service or state)
  // - Automatically updates when re-evaluated during Angular's change detection
  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  // --- OLD CODE BEFORE CREATING THE TASKS SERVICE ---
  // onCompleteTask(id: string) {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // onAddTask(data: NewTaskData) {
  //   this.tasks.unshift({
  //     id: new Date().getTime().toString(),
  //     userId: this.userId,
  //     ...data,
  //   });

  //   this.isAddingTask = !this.isAddingTask;
  // }
}
