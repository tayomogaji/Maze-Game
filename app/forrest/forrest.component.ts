import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'forrest',
  templateUrl: './forrest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForrestComponent {

  //rooms
  public one: boolean;
  public two: boolean;
  public three: boolean;
  @Output() enter = new EventEmitter;

  //danger
  public isDeadEnd: boolean;
  @Input() isAlfredRescued: boolean;

  //gold
  public gold: number;
  public hasGoldS: boolean;
  @Output() goldFound = new EventEmitter();

  //narration
  public title: string;
  public dialogue: string;

  constructor(private toastr: ToastrService) {
    this.gold = 0;
    this.goldFound = new EventEmitter();
    this.enter = new EventEmitter();
    this.dialogueReset();
  }

  public dialogueReset(): void {
    if (!this.isAlfredRescued) {
      this.title = '';
      this.dialogue = 'Where next...';
    } else {
      this.title = 'Quiet Alfred...'
      this.dialogue = 'Dont wake the bear up';
    }
  }

  public northClicked(): void {
    if (!this.isAlfredRescued) {
      this.title = "I think I see a dog ...being stalked by a bear!"
      this.dialogue = "I've got to find a way to stop it before the dog gets hurt."
    } else {
      this.one = false;
      this.two = false;
      this.three = true;
      this.getEnter();
      this.dialogueReset();
    }
  }

  public eastClicked(): void {
    this.title = 'UGGHH Dead end!!'
    this.dialogue = 'I cant go through here.'
  }

  public southClicked(): void {
    this.one = false;
    this.two = true;
    this.three = false;
    this.getEnter();
    this.dialogueReset();
    if (!this.hasGoldS) {
      this.goldAmount(50);
      this.hasGoldS = true;
      this.toastr.success('50 gold coins have been added to your purse', 'Found Gold!')
    }
  }

  public westClicked(): void {
    this.one = false;
    this.two = true;
    this.three = false;
    this.getEnter();
    this.dialogueReset();

  }

  public goldAmount(amount): void {
    this.gold = this.gold + amount;
    this.goldFound.emit(this.gold)
  }

  public getEnter(): void {
    this.enter.emit([this.one, this.two, this.three]);
  }
}
