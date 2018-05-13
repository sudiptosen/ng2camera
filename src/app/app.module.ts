import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllPicsComponent } from './all-pics/all-pics.component';
import { NewPicComponent } from './new-pic/new-pic.component';
import {NgDatepickerModule} from 'ng2-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    AllPicsComponent,
    NewPicComponent
  ],
  imports: [
    BrowserModule,
    NgDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
