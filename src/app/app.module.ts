import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WhacamoleComponent } from './whacamole/whacamole.component';

@NgModule({
  declarations: [
    AppComponent,
    WhacamoleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
