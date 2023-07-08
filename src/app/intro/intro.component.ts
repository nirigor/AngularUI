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
  ngOnInit(): void {
    this.termsAgreed = this.svc.getItem('termsAgreed');
    if (this.termsAgreed) this.step = 2;
    
    this.route.queryParams
      .subscribe(params => {
        if ('participant' in params) {
          this.svc.setItem('participant', params['participant']);
        } else {
          this.svc.setItem('participant', 'unpaid');
        }
      });
  }
  
  nextClick(): void {
    this.step += 1;
  }

  backClick(): void {
    this.step -= 1;
  }

  startSurvey(): void {
    this.svc.setItem('termsAgreed', 'true');
    this.router.navigateByUrl('survey');
  }
}