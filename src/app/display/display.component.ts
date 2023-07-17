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
  isComplete = false;
  termsAgreed = this.svc.getItem('termsAgreed', this.svc.PROGRESS_LOCATION);
  steps: Item[] = [];
  stepDict: {[name: string]: number} = {};

  updateStep (value: number) {
    this.step = value;
  }

  updateSteps (steps: Item[]) {
    this.steps = steps;
  }

  updateIsComplete( isComplete: boolean ) {
    this.isComplete = isComplete;
  }
  
  ngOnInit() {
    //this.svc.loadMockData();
    
    if (!this.termsAgreed.state) {
      this.router.navigateByUrl('');
    }

    if (this.svc.getItem('participant', this.svc.PROGRESS_LOCATION).value == 'unpaid') { 
      this.isPaid = false;
    } else { this.isPaid = true; this.step = 2; };
    
    [this.steps, this.stepDict] = this.svc.initSteps(this.isPaid);
  }
}
