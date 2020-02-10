import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cave',
  templateUrl: './cave.component.html'
})
export class CaveComponent {

  public one: boolean;
  public two: boolean;
  public three: boolean;
  @Output() enter = new EventEmitter;

  @Input() isAlfredRescued: boolean;
  @Input() isBiteCured: boolean;
  @Input() isTinaRescued: boolean;

  public isExit: boolean;
  public isContinue: boolean;
  public isSuccess: boolean;
  public isResult: boolean;
  public isStart: boolean;
  @Output() complete = new EventEmitter;

  public gold: number;
  public yGoldW: boolean;
  public yGoldS: boolean;
  public yGoldE: boolean;
  public nGoldE: boolean;
  @Output() goldFound = new EventEmitter();

  public title: string;
  public dialogue: string;

  constructor(private toastr: ToastrService) { 
    this.gold = 0;
    this.goldFound = new EventEmitter();
    this.complete = new EventEmitter();
    this.enter = new EventEmitter();
    this.dialogueReset();
  }

  public dialogueReset(): void {
      this.title = '';
      this.dialogue = 'Where next...';
  }

  public northClicked(): void {
    this.one = false;
    this.two = true;
    this.three = false;
    this.getEnter();
    this.dialogueReset();
  }

  public eastClicked(): void {
    if(this.isTinaRescued && !this.isAlfredRescued){
      this.title = "What about Alfred..."
      this.dialogue = "Tina will reward me for rescuing her dog Alfred."
      this.isExit = true;
      this.isContinue = true;
    }
    if(this.isTinaRescued && !this.isBiteCured && !this.nGoldE){
      this.title = "Tina is coverd in mosquito bites..."
      this.dialogue = "And she is now falling ill. I had to help her."
      if(!this.nGoldE){
        this.goldAmount(-90)
        this.toastr.error("90 gold coins were used to heal Tina", 'Tina healed')
        this.nGoldE = true;
      }
      if(this.nGoldE){
        this.dialogue = 'I had to give some medicine to make her feel better.'
      }
      this.isExit = true;
      this.isContinue = true;
      
    }else if(!this.isTinaRescued){
      this.title = "I can't leve now"
      this.dialogue = "Tina still needs my help"
      this.isContinue = true;
    }
    if(this.isAlfredRescued && this.isTinaRescued){
    this.isExit = true;
    this.isContinue = false;
    this.title = "There's the exit!"
    this.dialogue = "Lets get out of here"
    if(!this.yGoldE){
      this.goldAmount(200);
      this.toastr.success("Tina has rewarded you for rescuing Alfred", 'Alfred rescued')
      this.yGoldE = true
    }
    }
    this.toastr.info("I've found the exit", 'Exit Found')
  }
  
  public southClicked(): void {
    if(!this.isTinaRescued){
      this.title = "Ive found Tina. She's stuck down a pit."
      this.dialogue = 'Now I just need to think of a way to get her out.'
    }else {
      this.title = "Ok Tina"
      this.dialogue = "We're almost there..."
      this.one = true;
      this.two = false;
      this.three = false;
      this.getEnter();
      this.dialogueReset();
    }
  }

  public westClicked(): void {
    this.one = true;
    this.two = false;
    this.three = false;
    this.getEnter();
    this.dialogueReset();
    if(!this.yGoldW){
      this.goldAmount(25);
      this.yGoldW = true;
      this.toastr.success('25 gold coins were added to your purse', 'Gold found')
    }
  }

  public goldAmount(amount): void {
    this.gold += amount;
    this.goldFound.emit(this.gold);
  }

  public continue(): void {
    this.isExit = false;
    this.isContinue = false
  }

  public exit(): void {
    this.isStart = false;
    this.isResult = true
    this.isSuccess = true;
    if(!this.isAlfredRescued){
      this.toastr.success('Tina is safe')
    }else {
      this.toastr.success('Tina and Alfred are safe', 'Success')
    }
    this.complete.emit([this.isStart, this.isResult, this.isSuccess]);
  }

  public getEnter(): void {
    this.enter.emit([this.one, this.two, this.three]);
  }

}
