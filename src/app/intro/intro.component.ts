import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  constructor(private route: ActivatedRoute, private svc: SharedService) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if ('participant' in params) {
          this.svc.setItem('participant', params['participant']);
        } else {
          this.svc.setItem('participant', 'unpaid');
        }
      });
  }

}
