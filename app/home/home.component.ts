import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public isMission: boolean;
  
  public isEnter: boolean;
  public isStart: boolean;

  public missionDialouge: string;
  public area: string;

  public isForrest: boolean;
  public isLake: boolean;
  public isCave: boolean;

  public totalGold: number
  public countDown: CountdownComponent;

  public isAlfredRescued: boolean;
  public isTinaRescued: boolean;
  public isBiteCured: boolean;

  public isResult: boolean;
  public isSuccess?: boolean;

  constructor(private toastr: ToastrService) { 
    this.totalGold = 100;
    this.area = '????'
  }

  ngOnInit() {
    this.isMission = true;
    this.statement();
  }

  public enter(): void {
    this.isMission = false;
    this.isEnter = true;
  }

  public enterForrest(): void {
    this.isEnter = false;
    this.isStart = true; // for tools gold and time
    this.isForrest = true; // for spacifc area
  }

  public enterLake(): void {
    this.isEnter = false;
    this.isStart = true;
    this.isLake = true;
  }

  public enterCave(): void {
    this.isEnter = false;
    this.isStart = true;
    this.isCave = true;
  }

  public purse(gold): void {
    this.totalGold += gold;
  }

  public complete([start, result, success]): void {
    this.isStart = start;
    this.isResult = result;
    this.isSuccess = success;
    if(this.isSuccess){

    }
  }

  public forrestPassage([one, two, three]): void {
    this.isForrest = one;
    this.isLake = two;
    this.isCave = three;
  }

  public lakePassage([one, two, three]): void {
    this.isForrest = one;
    this.isLake = two;
    this.isCave = three;
  }

  public cavePassage([one, two, three]): void {
    this.isForrest = one;
    this.isLake = two;
    this.isCave = three;
  }

  public tranquilizerClicked(): void {
    if(this.isForrest){
      if(!this.isAlfredRescued){
          this.totalGold = this.totalGold - 75;
          this.isAlfredRescued = true;
          this.toastr.success("Alfred has now been rescued.", 'Ssshhh The bear is asleep');
    }
    }else{
      this.wrongItem();
    }
  }

  public medicineClicked(): void {
    if(this.isLake){
      if(!this.isBiteCured){
          this.totalGold = this.totalGold - 50;
          this.isBiteCured = true;
          this.toastr.success("Medication has been taken", 'Thats much better');
      }
    }else{
      this.wrongItem();
    }
  }

  public branchClicked(): void {
    if(this.isCave){
      if(!this.isTinaRescued){
          this.totalGold = this.totalGold - 25;
          this.isTinaRescued = true;
          this.toastr.success('Tina has now been rescued', 'Tina is safe');
      }
    }else{
      this.wrongItem();
    }
  }

  public statement(): void {
    this.missionDialouge =
      'Tina was reported missing over the weekend and was last seen hiking through the woods with her dog Alfred.' +
      '\nThis area is known to inhabit dangerous wildlife so its imperative that you waste no time in finding and getting her home safely.';
  }

  public notEnough(): void {
    this.toastr.error('I dont have enough gold to use this item.', 'More gold needed');
  }

  public wrongItem(): void {
    this.toastr.warning('Got to keep looking...', 'I cant find this item here.')
  }

  public restart(): void {
    location.reload();
  }

  public timeOut(e: CountdownEvent): void {
    if(e.action == "done" && !this.isSuccess){
      this.isStart = false;
      this.isResult = true;
      this.isSuccess = false;
      this.toastr.error('You have faild the mission', 'Failed');
    }
    
  }
}
