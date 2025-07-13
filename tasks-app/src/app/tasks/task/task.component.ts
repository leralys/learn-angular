import { Component, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { type Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: false,
})
export class TaskComponent {
  constructor(private tasksService: TasksService) {}

  // This component *expects* to receive a 'task' object from its parent
  @Input({ required: true }) task!: Task;

  // instead of changing the state in the parent component we use the service inside the child component
  // and the service holds shared state of tasks
  onCompleteTask() {
    this.tasksService.removeTask(this.task.id);
  }

  // --- OLD CODE BEFORE CREATING THE TASKS SERVICE ---
  // // This is our "loudspeaker" named 'complete'
  // // The parent component can listen for this event: (complete)="onCompleteTask($event)" and trigger a method
  // // This event will send a string value
  // @Output() complete = new EventEmitter<string>();

  // // When this method is called (e.g., from a button click),
  // // we use the loudspeaker to tell the parent: "This task (by ID) is complete"
  // onCompleteTask() {
  //   this.complete.emit(this.task.id);
  // }
}
