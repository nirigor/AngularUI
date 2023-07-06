import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedService } from './shared.service';

import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DisplayComponent } from './display/display.component';
import { ProgressComponent } from './display/progress/progress.component';
import { MainComponent } from './display/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { IntroComponent } from './intro/intro.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    MainComponent,
    DisplayComponent,
    PageNotFoundComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
