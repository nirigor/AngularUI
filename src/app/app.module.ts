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
import { MatDialogModule } from '@angular/material/dialog';
import { StoryComponent } from './display/main/stories/story/story.component';
import { StylesComponent } from './display/main/styles/styles.component';
import { StoriesIntroComponent } from './display/main/storiesintro/storiesintro.component';
import { BasicComponent } from './display/main/basic/basic.component';
import { StoriesComponent } from './display/main/stories/stories.component';
import { RtestComponent } from './rtest/rtest.component';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';


const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    MainComponent,
    DisplayComponent,
    PageNotFoundComponent,
    IntroComponent,
    StoryComponent,
    StylesComponent,
    StoriesIntroComponent,
    BasicComponent,
    StoriesComponent,
    RtestComponent,
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
    MatDialogModule,
  ],
  providers: [
    SharedService,
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
