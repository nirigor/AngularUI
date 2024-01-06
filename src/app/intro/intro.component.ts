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
  constructor(
    private route: ActivatedRoute, 
    private svc: SharedService, 
    private router: Router) {}
  
  public get prolificId() {
    return this.route.snapshot.queryParamMap.get('PROLIFIC_PID');
  }

  step = 1;
  termsAgreed:any = false;
  isPaid: boolean = false;
  canVibrate: boolean = true;
  prolific_pid: string | null = null;
  
  ngOnInit(): void {
    if (window.navigator.vibrate([])) this.canVibrate = false;
    if (this.svc.getItem('termsAgreed', this.svc.PROGRESS_LOCATION).state) { 
      this.termsAgreed = this.svc.getItem('termsAgreed', this.svc.PROGRESS_LOCATION).value; 
      this.step = 2; 
    }

    this.route.queryParamMap
      .subscribe((params) => {
        if (params.has('PROLIFIC_PID')) {
          this.svc.setItem('participant', params.get('PROLIFIC_PID'), this.svc.PROGRESS_LOCATION);
          if (params.get('PROLIFIC_PID') == 'unpaid') {
            this.svc.isPaid = false;
            this.isPaid = false;
          }
          else {
            this.svc.isPaid = true;
            this.isPaid = true;
          }
        } else {
          let context = { 'message' : 'System could not get your PROLIFIC_ID, please try again later..'}
          this.router.navigateByUrl('fault', { state: context }); 
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
