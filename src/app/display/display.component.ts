import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  constructor(private route: ActivatedRoute, private svc: SharedService, private router: Router) { }
  step = 1;
  termsAgreed = this.svc.getItem('termsAgreed');

  updateStep (value: number) {
    this.step = value;
  }
  
  ngOnInit() {
    if (this.termsAgreed != "true") {
      this.router.navigate(['', {'back' : true}]);
    }
  }
}
