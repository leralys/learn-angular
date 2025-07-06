import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { type Task } from './task.model';

@Component({
  selector: 'app-task',
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  // This component *expects* to receive a 'task' object from its parent
  @Input({ required: true }) task!: Task;

  // This is our "loudspeaker" named 'complete'
  // The parent component can listen for this event: (complete)="onCompleteTask($event)" and trigger a method
  // This event will send a string value
  @Output() complete = new EventEmitter<string>();

  // When this method is called (e.g., from a button click),
  // we use the loudspeaker to tell the parent: "This task (by ID) is complete"
  onCompleteTask() {
    this.complete.emit(this.task.id);
  }
}
