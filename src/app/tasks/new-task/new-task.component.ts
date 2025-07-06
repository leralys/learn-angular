import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  // state

  // Newer Angular syntax using signals (Angular 17+)
  // This creates a reactive signal holding the string ''
  // You can still use two-way binding with [(ngModel)] just like with regular variables
  // Example: [(ngModel)]="enteredTitle()"
  // enteredTitle = signal('');

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // custom events
  @Output() cancel = new EventEmitter<void>();

  @Output() add = new EventEmitter<NewTaskData>();

  onCancelAddTask() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    });
  }
}
