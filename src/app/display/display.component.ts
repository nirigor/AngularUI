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
  isPaid = false;
  termsAgreed = this.svc.getItem('termsAgreed', 'session');
  steps: Item[] = [];
  stepDict: {[name: string]: number} = {};

  updateStep (value: number) {
    this.step = value;
  }

  updateSteps (steps: Item[]) {
    this.steps = steps;
  }
  
  ngOnInit() {
    if (this.termsAgreed != "true") {
      this.router.navigate(['', {'back' : true}]);
    }

    const pId = this.svc.getItem('participant', 'session');
    if (pId == 'unpaid') { 
      this.isPaid = false;
    } else { this.isPaid = true; this.step = 2; };
    
    [this.steps, this.stepDict] = this.svc.initSteps(this.isPaid);
  }
}
