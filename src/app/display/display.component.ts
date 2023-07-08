import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  constructor(private route: ActivatedRoute, private svc: SharedService, private router: Router) { }
  step = 0;
  termsAgreed = this.svc.getItem('termsAgreed');
  steps: Item[] = [];
  stepDict: {[name: string]: number} = {};

  updateStep (value: number) {
    this.step = value;
  }
  
  ngOnInit() {
    if (this.termsAgreed != "true") {
      this.router.navigate(['', {'back' : true}]);
    }

    const pId = this.svc.getItem('participant');
    [this.steps, this.stepDict] = this.svc.initSteps();

  }
}
