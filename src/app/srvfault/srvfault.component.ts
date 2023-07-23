import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-srvfault',
  templateUrl: './srvfault.component.html',
  styleUrls: ['./srvfault.component.css']
})
export class SrvfaultComponent implements OnInit {
  state$: Observable<object> | undefined;
  status_code: number = 0;
  message: string = "";
  description: string = "";
  constructor(public activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state))
    this.status_code = window.history.state.status_code;
    this.message = window.history.state.message;

    if (this.status_code === 451) {
      this.description = "This error message indicates the submitted survey data failed to pass the participant attention verification check performed by our server. In accordance with our terms of use the provided information will not be used in our research, therefore a token will not be granted."
    } else if (this.status_code === 401) {
      this.description = "This error message indicates your prolificId is already showing in our database, the participation in this survey is limited to only one attempt"
    } else {
      this.description = this.message
    }
  }
}
