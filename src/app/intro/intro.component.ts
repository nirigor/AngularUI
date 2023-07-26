import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  constructor(private route: ActivatedRoute, private svc: SharedService, private router: Router) {}
  
  step = 1;
  termsAgreed:any = false;
  isPaid: boolean = false;
  canVibrate: boolean = true;
  
  ngOnInit(): void {
    if (window.navigator.vibrate([])) this.canVibrate = false;
    if (this.svc.getItem('termsAgreed', this.svc.PROGRESS_LOCATION).state) { 
      this.termsAgreed = this.svc.getItem('termsAgreed', this.svc.PROGRESS_LOCATION).value; 
      this.step = 2; 
    }
    this.svc.setItem('participant', 'unpaid', this.svc.PROGRESS_LOCATION);

    this.route.queryParams
      .subscribe((params) => {
        if ('participant' in params) {
          this.svc.setItem('participant', params['participant'], this.svc.PROGRESS_LOCATION);
          this.svc.isPaid = true;
          this.isPaid = true;
        } else {
          this.svc.setItem('participant', 'unpaid', this.svc.PROGRESS_LOCATION);
          this.svc.isPaid = false;
        }
      });
  }
  
  nextClick(): void {
    this.step += 1;
    window.scrollTo(0,0);
    this.svc.vibrate();
  }

  backClick(): void {
    this.step -= 1;
    window.scrollTo(0,0);
    this.svc.vibrate();
  }

  startSurvey(): void {
    this.svc.setItem('termsAgreed', 'true', this.svc.PROGRESS_LOCATION);
    window.scrollTo(0,0);
    this.router.navigateByUrl('survey');
    this.svc.vibrate();
  }
}
