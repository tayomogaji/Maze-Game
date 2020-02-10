import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'lake',
  templateUrl: './lake.component.html'
})
export class LakeComponent implements OnInit {

  //rooms
  @Input() area: string;
  public one: boolean;
  public two: boolean;
  public three: boolean;
  @Output() enter = new EventEmitter;

  //danger
  @Input() isBiteCured: boolean;

  //gold
  public gold: number;
  public hasGoldN: boolean;
  public hasGoldE: boolean;
  @Output() goldFound = new EventEmitter();

  //narration
  public title: string;
  public dialogue: string;

  constructor(private toastr: ToastrService, private route: Router) { 
    this.gold = 0;
    this.goldFound = new EventEmitter();
    this.enter = new EventEmitter();
    this.dialogueReset();
  }

  ngOnInit() {
  }

  public dialogueReset(): void {
    if(!this.isBiteCured){
      this.title = '';
      this.dialogue = 'Where next...';
    }else{
      this.title = 'These mosquitos are annoying...'
      this.dialogue = "But I'll be ok";
    }
  }

  public northClicked(): void {
    this.one = false;
    this.two = false;
    this.three = true;
    this.getEnter();
    this.dialogueReset();
    if(!this.hasGoldN){
      this.goldAmount(75);
      this.hasGoldN = true;
    }
  }

  public eastClicked(): void {
    this.one = true;
    this.two = false;
    this.three = false;
    this.getEnter();
    this.dialogueReset();
  }

  public southClicked(): void {
    //snake here
    this.one = true;
    this.two = false;
    this.three = false;
    this.getEnter();
    this.dialogueReset();
  }

  public westClicked(): void {
    if(!this.isBiteCured){
      this.title = "Ouch! There're mosquitos everywhere!!"
      this.dialogue = "I'm starting to feel really dizzy..."
    }else{
      this.one = false;
      this.two = false;
      this.three = true;
      this.getEnter();
      this.dialogueReset();
    }
  }

  public goldAmount(amount): void {
    this.gold = this.gold + amount;
    this.goldFound.emit(this.gold);
    this.toastr.success(amount + ' gold coins have been added to your purse', 'Found Gold!')
  }

  public getEnter(): void {
    this.enter.emit([this.one, this.two, this.three]);
  }

}
