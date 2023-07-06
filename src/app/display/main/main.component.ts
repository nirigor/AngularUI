import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Participant } from 'src/app/models/participant.model';
import { ActivatedRoute, Router } from '@angular/router';

interface MaritalStatuses {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  p: Participant = new Participant();
  @Input() step = 0;
  @Output() stepUpdateEvent = new EventEmitter<number>();

  phaseSteps: any = this.svc.getCurrentPhaseSteps(1);
  surveyStatus: {[step: number]: boolean} = {};
  surveyLStatus: {[step: number]: boolean} = {};
  congrats = false;
  lstep = 0;
  cstep = 0;
  mstep = 0; 
  astep = 0;

  mStatuses: MaritalStatuses[] = [
    {value: 'SI', viewValue: 'Single'},
    {value: 'MA', viewValue: 'Married'},
    {value: 'SE', viewValue: 'Separated'},
    {value: 'DI', viewValue: 'Divorced'},
    {value: 'WI', viewValue: 'Widowed'},
  ];

  constructor(
    private svc: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.step = 26;
    // this.congrats = true;

    this.lstep = 0;
    this.cstep = 0;
    this.mstep = 0;
    this.astep = 0;

    const pId = this.svc.getItem('participant');
    pId? this.p.ProlificId = pId : 'unpaid';
    this.p.SurveyStartTs = new Date();
    [ this.p.ST1Number, this.p.ST2Number, this.p.ST3Number ] = this.svc.getCases();
        
  }

  getcode(): number {
    switch(this.lstep) {
      case 1:
        return 10 + this.cstep;
      case 2:
        return 20 + this.mstep;
      case 3:
        return 30 + this.astep;
    }
    return 0;
  }

  stringToBool(str: any): boolean {
    if (str == "true") { return true; }
    return false;
  }

  nextClick(show_congrats = false): void {
    if (show_congrats) {
      this.congrats = true;
    } else {
      this.surveyStatus[this.step] = true;
      this.step += 1;
      this.stepUpdateEvent.emit(this.step);
      this.phaseSteps = this.svc.getCurrentPhaseSteps(this.step);
    }
  }

  backClick(): void {
    if (this.step == 1) {
      this.router.navigateByUrl('');
    }
    
    this.step -= 1;
    if (this.step == 10) {
      this.congrats = true;
    }
    this.stepUpdateEvent.emit(this.step);
    this.phaseSteps = this.svc.getCurrentPhaseSteps(this.step);    
  }

  nextClick10(): void {
    let code = this.getcode();
    switch (code) {
      case 0:
        if (this.stringToBool(this.p.InvolvedInLegalDispute)) {
          this.lstep = 1;
          this.cstep = 1;
          this.mstep = 1;
          this.astep = 1;
        }
        else {
          this.p.ExperienceWithCourtProceedings = false;
          this.p.CourtProceedingsSatisfaction = 0;
          this.p.ExperienceWithCourtProceedingsText = '';      
          
          this.p.ExperienceWithMediation = false;
          this.p.MediationSatisfaction = 0;
          this.p.ExperienceWithMediationText = '';
    
          this.p.ExperienceWithArbitration = false;
          this.p.ArbitrationSatisfaction = 0;
          this.p.ExperienceWithArbitrationText = '';
          this.nextClick(true);
        }
        this.surveyLStatus[0] = true;
        break;
      // Adjudication
      case 11:
        if (this.stringToBool(this.p.ExperienceWithCourtProceedings)) {
          this.cstep = 2;
          this.surveyLStatus[11] = true;
        } else {
          this.p.CourtProceedingsSatisfaction = 0;
          this.p.ExperienceWithCourtProceedingsText = '';
          this.lstep = 2;
        }
        break;
      case 12:
        this.cstep = 3;
        this.surveyLStatus[12] = true;
        this.surveyLStatus[13] = true;
        break;
      case 13:
        this.lstep = 2;
        break;
      // Mediation  
      case 21:
        if (this.stringToBool(this.p.ExperienceWithMediation)) {
          this.mstep = 2;
          this.surveyLStatus[21] = true;
        } else {
          this.p.MediationSatisfaction = 0;
          this.p.ExperienceWithMediationText = '';
          this.lstep = 3;
        }
        break;
      case 22:
        this.mstep = 3;
        this.surveyLStatus[22] = true;
        this.surveyLStatus[23] = true;
        break;
      case 23:
        this.lstep = 3;
        break;
      // Arbitration
      case 31:
        if (this.stringToBool(this.p.ExperienceWithArbitration)) {
          this.astep = 2;
          this.surveyLStatus[31] = true;
        } else {
          this.p.ArbitrationSatisfaction = 0;
          this.p.ExperienceWithArbitrationText = '';
          this.lstep += 1;
          this.nextClick(true);
        }
        break;
      case 32:
        this.astep = 3;
        this.surveyLStatus[32] = true;
        this.surveyLStatus[33] = true;
        break;
      case 33:
        this.lstep += 1;
        this.nextClick(true);
        break;
      }
  }

  backClick10() {
    if (this.congrats)  {
      this.congrats = false;
      this.lstep -= 1;
      if (this.lstep < 0) this.lstep = 0; 
    } else {
      let code = this.getcode();
      switch (code) {
        // Adjudication
        case 11:
          this.lstep = 0;
          break;
        case 12:
          this.cstep = 1;
          break;
        case 13:
          this.cstep = 2;
          break;
        // Mediation  
        case 21:
          this.lstep = 1;
          break;
        case 22:
          this.mstep = 1;
          break;
        case 23:
          this.mstep = 2;
          break;
        // Arbitration
        case 31:
          this.lstep = 2;
          break;
        case 32:
          this.astep = 1;
          break;
        case 33:
          this.astep = 2;
          break;
        default:
          this.backClick();
        }
    }
  }
}

