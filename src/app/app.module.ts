import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllPicsComponent } from './all-pics/all-pics.component';
import { NewPicComponent } from './new-pic/new-pic.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPicsComponent,
    NewPicComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
