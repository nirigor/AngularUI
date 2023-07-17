import { Component, OnInit, Input, Output, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Participant } from 'src/app/models/participant.model';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Feedback } from 'src/app/models/feedback.model';
import { NgIf } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import EasySpeech from 'easy-speech';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

interface MaritalStatuses {
  value: string;
  viewValue: string;
}

export interface DialogData {
  dialog: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
              './main.component.complete.css']
})

export class MainComponent implements OnInit{
  p: Participant = new Participant();
  feedback: Feedback = new Feedback();
  story? = 0; // Story number for child comp.
  read: boolean = true; // Read/Answer mode switch.

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

  Opts: {[key: string]: string|null} = {
    "AD" : "Adjudication",
    "AR" : "Arbitration",
    "ME" : "Mediation",
    "NE" : "Negotiation",
    "LG" : "Let go",
    "PC" : "Public Complaint",
    "" : ""
  }

  constructor(
    private svc: SharedService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(): void {
    let prog_dict = this.svc.getProgress();
    
    if (prog_dict.step.state) this.step = JSON.parse(prog_dict.step.value);
    if (prog_dict.steps.state) this.steps = JSON.parse(prog_dict.steps.value);
    if (prog_dict.feedback.state) this.feedback = Object.assign(new Feedback, JSON.parse(prog_dict.feedback.value));
    if (prog_dict.isComplete.state) this.isComplete = JSON.parse(prog_dict.isComplete.value);
    if (prog_dict.p.state) {
      this.p = Object.assign(new Participant, JSON.parse(prog_dict.p.value));
    } else {
      this.p.ProlificId = 'unpaid';
      if(this.svc.getItem('participant', this.svc.PROGRESS_LOCATION).state) this.p.ProlificId = this.svc.getItem('participant', this.svc.PROGRESS_LOCATION).value;
      if(this.p.ProlificId == 'unpaid') {this.p.Age = "unpaid"; this.p.Gender = "unpaid"}
      this.p.SurveyStartTs = new Date();
      [ this.p.ST1Number, this.p.ST2Number, this.p.ST3Number ] = this.svc.getCases();
    }
    while(!this.steps[this.step]['isVisible']) this.step++;
  }

  stringToBool(str: any): boolean {
    if (str == "true") { return true; }
    return false;
  }

  nextClick() {
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
    while (!this.steps[this.step]['isVisible']) this.step += 1;
    this.stepUpdateEvent.emit(this.step);
    this.svc.saveProgress(this.p, this.steps, this.step, this.isComplete, this.feedback, this.read);
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
    if ((this.p.ProlificId == 'unpaid' && this.step == 0) || (this.p.ProlificId != 'unpaid' && this.step == 2)) {
      this.router.navigateByUrl('');
    } else {
      this.step -= 1;
      while (!this.steps[this.step]['isVisible']) this.step -= 1;
      if (this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) this.read = true;
      if (this.step == this.stepDict['STORIES1_23'] || this.step == this.stepDict['STORIES2_23'] || this.step == this.stepDict['STORIES3_23']) this.read = false;
      this.stepUpdateEvent.emit(this.step);
    }
    this.svc.saveProgress(this.p, this.steps, this.step, this.isComplete, this.feedback, this.read);
  }

  OpenDialog(val: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { dialog : val },
    });
  }

  async submit() {
    this.p.SurveyEndTs = new Date();
    let response = await this.svc.submitSurvey(this.p);
    let data = response['data'];
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
    } 
    this.feedback.Message = data['Message'];
    this.feedback.Valid = data['Valid'];
    this.feedback.Token = data['Token'];
    this.isComplete = true;
    this.svc.saveProgress(this.p, this.steps, this.step, this.isComplete, this.feedback, this.read);
    this.isCompleteUpdateEvent.emit(this.isComplete);
    this.nextClick();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, NgIf],
})
export class DialogOverviewExampleDialog implements OnInit, AfterViewInit{
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}