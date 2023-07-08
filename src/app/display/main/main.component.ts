import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Participant } from 'src/app/models/participant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';


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
  @Input() steps: Item[] = [];
  @Input() stepDict: {[name: string]: number} = {};
  
  @Output() stepUpdateEvent = new EventEmitter<number>();

  read: boolean = true;

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
    // this.step = 72;
    const pId = this.svc.getItem('participant');
    pId? this.p.ProlificId = pId : 'unpaid';
    this.p.SurveyStartTs = new Date();
    [ this.p.ST1Number, this.p.ST2Number, this.p.ST3Number ] = this.svc.getCases();
        
  }

  stringToBool(str: any): boolean {
    if (str == "true") { return true; }
    return false;
  }

  nextClick() {
    if (this.step == 9) this.checkStep9();
    if (this.step == 10) this.checkStep10();
    if (this.step == 13) this.checkStep13();
    if (this.step == 16) this.checkStep16();
    if (this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) this.read = false;
    this.steps[this.step]['showNext'] = true;
    this.step += 1;
    while (!this.steps[this.step]['isVisible']) this.step += 1;
    this.stepUpdateEvent.emit(this.step);
  }

  checkStep9() {
    if (!this.stringToBool(this.p.InvolvedInLegalDispute)) {
      this.p.ExperienceWithCourtProceedings = false;
      this.p.CourtProceedingsSatisfaction = 0;
      this.p.ExperienceWithCourtProceedingsText = '';
      this.steps[10]['isVisible'] = false;
      this.steps[11]['isVisible'] = false;
      this.steps[12]['isVisible'] = false;   
          
      this.p.ExperienceWithMediation = false;
      this.p.MediationSatisfaction = 0;
      this.p.ExperienceWithMediationText = '';
      this.steps[13]['isVisible'] = false;
      this.steps[14]['isVisible'] = false;
      this.steps[15]['isVisible'] = false;   

      this.p.ExperienceWithArbitration = false;
      this.p.ArbitrationSatisfaction = 0;
      this.p.ExperienceWithArbitrationText = '';
      this.steps[16]['isVisible'] = false;
      this.steps[17]['isVisible'] = false;
      this.steps[18]['isVisible'] = false;   
    } else {
      this.steps[10]['isVisible'] = true;
      this.steps[11]['isVisible'] = true;
      this.steps[12]['isVisible'] = true;
      this.steps[13]['isVisible'] = true;
      this.steps[14]['isVisible'] = true;
      this.steps[15]['isVisible'] = true;
      this.steps[16]['isVisible'] = true;
      this.steps[17]['isVisible'] = true;
      this.steps[18]['isVisible'] = true; 
    }
  }

  checkStep10() {
    if (!this.stringToBool(this.p.ExperienceWithCourtProceedings)) {
      this.p.CourtProceedingsSatisfaction = 0;
      this.p.ExperienceWithCourtProceedingsText = '';
      this.steps[11]['isVisible'] = false;
      this.steps[12]['isVisible'] = false;
    } else {
      this.steps[11]['isVisible'] = true;
      this.steps[12]['isVisible'] = true;
    }
  }
  
  checkStep13() {
    if (!this.stringToBool(this.p.ExperienceWithMediation)) {
      this.p.MediationSatisfaction = 0;
      this.p.ExperienceWithMediationText = '';
      this.steps[14]['isVisible'] = false;
      this.steps[15]['isVisible'] = false;
    } else {
      this.steps[14]['isVisible'] = true;
      this.steps[15]['isVisible'] = true;
    }
  }

  checkStep16() {
    if (!this.stringToBool(this.p.ExperienceWithArbitration)) {
      this.p.ArbitrationSatisfaction = 0;
      this.p.ExperienceWithArbitrationText = '';
      this.steps[17]['isVisible'] = false;
      this.steps[18]['isVisible'] = false;
    } else {
      this.steps[17]['isVisible'] = true;
      this.steps[18]['isVisible'] = true;
    }
  }

  backClick() {
    if (this.step == this.stepDict['BASIC_1']) this.router.navigateByUrl('');
    this.step -= 1;
    if (this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) this.read = true;
    while (!this.steps[this.step]['isVisible']) this.step -= 1;
    this.stepUpdateEvent.emit(this.step);
  }
}

