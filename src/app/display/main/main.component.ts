import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, Inject} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Participant } from 'src/app/models/participant.model';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Feedback } from 'src/app/models/feedback.model';
import EasySpeech from 'easy-speech';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';


interface MaritalStatuses {
  value: string;
  viewValue: string;
}

export interface DialogData {
  dialog: string;
}

export interface WarningDialogData {
  isPaid: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
              '../display.component.css',
              './main.component.complete.css']
})

export class MainComponent implements OnInit{
  p: Participant = new Participant();
  feedback: Feedback = new Feedback();
  story? = 0; // Story number for child comp.
  read: boolean = true; // Read/Answer mode switch.
  warningCounter: number = 0;
  warningGiven = false;
  isPaid = this.svc.isPaid;
  
  @Input() step = 0;
  @Input() steps: Item[] = [];
  @Input() isComplete: boolean = false;
  @Input() stepDict: {[name: string]: number} = {};
  
  @Output() stepUpdateEvent = new EventEmitter<number>();
  @Output() stepsUpdateEvent = new EventEmitter<Item[]>();
  @Output() isCompleteUpdateEvent = new EventEmitter<boolean>();


  mStatuses: MaritalStatuses[] = [
    {value: 'SI', viewValue: 'Single'},
    {value: 'MA', viewValue: 'Married'},
    {value: 'SE', viewValue: 'Separated'},
    {value: 'DI', viewValue: 'Divorced'},
    {value: 'WI', viewValue: 'Widowed'},
  ];

  constructor(
    private svc: SharedService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(): void {
    //this.step = this.stepDict['STORIES1_2'];
    let prog_dict = this.svc.getProgress();
    if (prog_dict.step.state) this.step = JSON.parse(prog_dict.step.value);
    if (prog_dict.steps.state) {
      this.steps = JSON.parse(prog_dict.steps.value);
      for (let i=0; i < this.steps.length; i++) {
        this.steps[i].endTime = new Date(this.steps[i].endTime);
        this.steps[i].startTime = new Date(this.steps[i].startTime);
      }
    }
    if (prog_dict.feedback.state) this.feedback = Object.assign(new Feedback, JSON.parse(prog_dict.feedback.value));
    if (prog_dict.isComplete.state) this.isComplete = JSON.parse(prog_dict.isComplete.value);
    if (prog_dict.p.state) {
      this.p = Object.assign(new Participant, JSON.parse(prog_dict.p.value));
    } else {
      this.p.ProlificId = 'unpaid';
      if(this.svc.getItem('participant', this.svc.PROGRESS_LOCATION).state) this.p.ProlificId = this.svc.getItem('participant', this.svc.PROGRESS_LOCATION).value;
      // if(this.p.ProlificId != 'unpaid') {this.p.Age = "0"; this.p.Gender = "E"}
      this.p.SurveyStartTs = new Date();
      [ this.p.ST1Number, this.p.ST2Number, this.p.ST3Number ] = this.svc.getCases();
    }
    while(!this.steps[this.step]['isVisible']) this.step++;
  }

  stringToBool(str: any): boolean {
    if (str == "true") { return true; }
    return false;
  }

  checkAttentionPass(step: number): boolean {
    if ((this.steps[step].endTime.getTime() - this.steps[step].startTime.getTime()) >= this.steps[step].minTime) { return true }
    return false
  }

  nextClick() {
    this.steps[this.step].endTime = new Date();
    if (!this.checkAttentionPass(this.step)) this.warningCounter += 1;
    this.steps[this.step].minTime = 0;
    if (this.step == this.stepDict['BASIC_11']) this.checkB11();
    if (this.step == this.stepDict['BASIC_12']) this.checkB12();
    if (this.step == this.stepDict['BASIC_15']) this.checkB15();
    if (this.step == this.stepDict['BASIC_18']) this.checkB18();
    if (this.step == this.stepDict['STORIES1_23'] || this.step == this.stepDict['STORIES2_23'] || this.step == this.stepDict['STORIES3_23']) this.read = true;
    if (this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) {
      this.read = false;
      if (EasySpeech.status()['initialized']) EasySpeech.cancel();
    }
    this.steps[this.step]['showNext'] = true;
    this.step += 1;
    this.steps[this.step].startTime = new Date();
    while (!this.steps[this.step]['isVisible']) this.step += 1;
    this.stepUpdateEvent.emit(this.step);
    this.svc.saveProgress(this.p, this.steps, this.step, this.isComplete, this.feedback, this.read);
    window.scrollTo(0,0);
    this.svc.vibrate();

    if (this.step == this.stepDict['BF_16'] && !(this.p.TQ1 == "false")) {
      if (this.warningGiven) {
        this.discontinue();
        return;
      } else {
      this.GiveWarning();
        this.warningGiven = true;
        this.warningCounter = 0;
        this.p.TQ1 = "false";
      }
    }
    if (this.step == this.stepDict['STORIES1_20'] && !(this.p.TQ2 == "false")) {
      if (this.warningGiven) {
        this.discontinue();
        return;
      } else {
        this.GiveWarning();
        this.warningGiven = true;
        this.warningCounter = 0;
        this.p.TQ2 = "false";
      }
    }

    if (this.warningCounter === 4) {
      if (this.warningGiven) {
        this.discontinue();
        return;
      } else {
        this.GiveWarning();
        this.warningGiven = true;
        this.warningCounter = 0;
      }
    }
    this.delay(200);
  }

  checkB11() {
    if (!this.stringToBool(this.p.InvolvedInLegalDispute)) {
      this.p.ExperienceWithCourtProceedings = false;
      this.p.CourtProceedingsSatisfaction = 0;
      this.p.ExperienceWithCourtProceedingsText = '';
      this.steps[this.stepDict['BASIC_12']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_13']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = false;   
          
      this.p.ExperienceWithMediation = false;
      this.p.MediationSatisfaction = 0;
      this.p.ExperienceWithMediationText = '';
      this.steps[this.stepDict['BASIC_15']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_16']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = false;   

      this.p.ExperienceWithArbitration = false;
      this.p.ArbitrationSatisfaction = 0;
      this.p.ExperienceWithArbitrationText = '';
      this.steps[this.stepDict['BASIC_18']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_19']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = false;   
    } else {
      this.steps[this.stepDict['BASIC_12']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_13']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_15']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_16']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_18']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_19']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = true; 
    }
  }

  checkB12() {
    if (!this.stringToBool(this.p.ExperienceWithCourtProceedings)) {
      this.p.CourtProceedingsSatisfaction = 0;
      this.p.ExperienceWithCourtProceedingsText = '';
      this.steps[this.stepDict['BASIC_13']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = false;
    } else {
      this.steps[this.stepDict['BASIC_13']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = true;
    }
  }
  
  checkB15() {
    if (!this.stringToBool(this.p.ExperienceWithMediation)) {
      this.p.MediationSatisfaction = 0;
      this.p.ExperienceWithMediationText = '';
      this.steps[this.stepDict['BASIC_16']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = false;
    } else {
      this.steps[this.stepDict['BASIC_16']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = true;
    }
  }

  checkB18() {
    if (!this.stringToBool(this.p.ExperienceWithArbitration)) {
      this.p.ArbitrationSatisfaction = 0;
      this.p.ExperienceWithArbitrationText = '';
      this.steps[this.stepDict['BASIC_19']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = false;
    } else {
      this.steps[this.stepDict['BASIC_19']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = true;
    }
  }

  backClick() {
    this.delay(200);
    if (this.step == 0) {
      this.router.navigateByUrl('intro');
    } else {
      if ((this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) && EasySpeech.status()['initialized']) EasySpeech.cancel();
      this.step -= 1;
      while (!this.steps[this.step]['isVisible']) this.step -= 1;
      if (this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) this.read = true;
      if (this.step == this.stepDict['STORIES1_23'] || this.step == this.stepDict['STORIES2_23'] || this.step == this.stepDict['STORIES3_23']) this.read = false;
      this.stepUpdateEvent.emit(this.step);
    }
    this.svc.saveProgress(this.p, this.steps, this.step, this.isComplete, this.feedback, this.read);
    window.scrollTo(0,0);
    this.svc.vibrate();
  }

  async submit() {
    this.p.SurveyEndTs = new Date();
    let response = await this.svc.submitSurvey(this.p);
    let data = response['data'];
    let context:{[key: string]: any} = {};
    this.feedback.Message = data['Message'];
    this.feedback.Valid = data['Valid'];

    if (response['status'] === 200) {
      this.feedback.BFAgreeablenessScore = data['BFAgreeablenessScore'];
      this.feedback.BFConscientiousnessScore = data['BFConscientiousnessScore'];
      this.feedback.BFExtraversionScore = data['BFExtraversionScore'];
      this.feedback.BFNeuroticismScore = data['BFNeuroticismScore'];
      this.feedback.BFOpennessScore = data['BFOpennessScore'];
      this.feedback.TKAccommodatingScore = data['TKAccommodatingScore'];
      this.feedback.TKAvoidingScore = data['TKAvoidingScore'];
      this.feedback.TKCollaboratingScore = data['TKCollaboratingScore'];
      this.feedback.TKCompetingScore = data['TKCompetingScore'];
      this.feedback.TKCompromisingScore = data['TKCompromisingScore'];
    } else {
      context['status_code'] = response['status'];
      if (response['status'] === 451) { context['message'] = this.feedback.Message; } else { context['message'] = JSON.stringify(response['data'].message); }
      this.router.navigateByUrl('fault', { state: context });
    }
    this.feedback.Token = data['Token'];
    this.isComplete = true;
    this.svc.saveProgress(this.p, this.steps, this.step, this.isComplete, this.feedback, this.read);
    this.isCompleteUpdateEvent.emit(this.isComplete);
    this.nextClick();
  }
  
  GiveWarning(): void {
    this.steps[this.step].isVisible = false;
    const dialogRef = this.dialog.open(WarningDialog, {
      disableClose: true,
      data: { isPaid : this.svc.isPaid },
    }).afterClosed().subscribe(() => {
      this.steps[this.step].isVisible = true;
    });
  }  

  discontinue(): void {
    let context = {
      'status_code' : 451,
      'message' : 'Attention verification failed.'
    }
    this.p = new Participant();
    this.svc.clearItems();
    this.router.navigateByUrl('fault', { state: context });
  }
}

@Component({
  selector: 'warning-dialog',
  templateUrl: './warning-dialog.html',
  styleUrls: ['./warning-dialog.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, NgIf],
})

export class WarningDialog implements OnInit, AfterViewInit{
  constructor(
    public dialogRef: MatDialogRef<WarningDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WarningDialogData,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {}

}