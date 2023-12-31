import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayComponent } from './display/display.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IntroComponent } from './intro/intro.component';
import { SrvfaultComponent } from './srvfault/srvfault.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'survey', component: DisplayComponent },
  { path: 'fault', component: SrvfaultComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }