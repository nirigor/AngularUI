import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Participant } from 'src/app/models/participant.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../main.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css', '../main.component.css']
})
export class StoriesComponent implements OnInit {  
  Opts: {[key: string]: string|null} = {
    "AD" : "Adjudication",
    "AR" : "Arbitration",
    "ME" : "Mediation",
    "NE" : "Negotiation",
    "LG" : "Let go",
    "PC" : "Public Complaint",
    "" : ""
  }
  
  @Input() p: Participant = new Participant()
  @Input() step = 0;
  @Input() steps: Item[] = [];
  @Input() stepDict: {[name: string]: number} = {};
  @Output("nextClick") nextClick: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    
  }
  constructor(
    public dialog: MatDialog
  ) {}

  OpenDialog(val: string): void {
    const dialogRef = this.dialog.open(DoorDialog, {
      data: { dialog : val },
    });
  }  
}

@Component({
  selector: 'door-dialog',
  templateUrl: './door-dialog.html',
  styleUrls: ['./door-dialog.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, NgIf],
})

export class DoorDialog implements OnInit, AfterViewInit{
  constructor(
    public dialogRef: MatDialogRef<DoorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}