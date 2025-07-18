import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // essential. includes datepipe

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, SharedModule, TasksModule], // for standalone components and modules
})
export class AppModule {}
