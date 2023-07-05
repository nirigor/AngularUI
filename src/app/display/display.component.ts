import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  constructor(private route: ActivatedRoute, private svc: SharedService) { }
  step = 1;

  updateStep (value: number) {
    this.step = value;
  }
  
  ngOnInit() {
    // this.route.queryParams
    //   .subscribe(params => {
    //     if ('participant' in params) {
    //       this.svc.setItem('participant', params['participant']);
    //     } else {
    //       this.svc.setItem('participant', 'unpaid');
    //     }
    //   });
  }
}
