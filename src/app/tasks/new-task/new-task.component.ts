import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  standalone: false,
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  // custom events
  @Output() close = new EventEmitter<void>();
  // @Output() add = new EventEmitter<NewTaskData>();

  // state

  // Newer Angular syntax using signals (Angular 17+)
  // This creates a reactive signal holding the string ''
  // You can still use two-way binding with [(ngModel)] just like with regular variables
  // Example: [(ngModel)]="enteredTitle()"
  // enteredTitle = signal('');

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // Using Angular's `inject()` function to get an instance of TasksService
  // It is an alternative to the constructor-based approach
  // `TasksService` acts as the injection token — a key that tells Angular what to provide
  // This is an alternative to injecting via constructor and works inside standalone functions or properties
  private tasksService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    // this.add.emit({
    //   title: this.enteredTitle,
    //   summary: this.enteredSummary,
    //   dueDate: this.enteredDate,
    // });

    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDate,
      },
      this.userId
    );

    this.close.emit();
  }
}
