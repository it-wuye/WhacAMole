import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whacamole',
  templateUrl: './whacamole.component.html',
  styleUrls: ['./whacamole.component.css']
})
export class WhacamoleComponent implements OnInit {

  private barrier: number = 1; // 关卡数
  private maxBarrier: number;  // 最大关卡数，可以不设置
  private field: Array<any> = [];  // 田地格子
  private columnNum: number;  // 田地的行数和列数
  private time: any;
  private mole: any;
  private score: any;
  private timeCounting: any;
  private disploayMoling: any;
  private gameOver: any = { isOver: false, isPassAll: false };

  constructor(){ }

  ngOnInit(){
      this.initData();
  }

  initData(){
      this.gameOver.isOver = false;
      this.gameOver.isPassAll = false;
      this.columnNum = this.barrier * 5;
      this.time = { timeTotal: 30, timeLeft: 0, autoDisplaySpacing: 3 };
      this.time.timeLeft = this.time.timeTotal;
      this.mole = { randomDisplay: undefined, clickedMole: undefined, moleShowed: 0 };
      this.score = { scoreTotal: 0, hitRate: 0, hitCount: 0};
      this.field = [];
      for(let i = 0; i < this.columnNum; i++) {
          this.field.push( { id: i, clicked: false });
      }
  }
   
   
  timeCountFn(){
      // 每一秒调用一次函数倒计时
      this.timeCounting = setInterval(() => {
          this.time.timeLeft--;
          if (this.time.timeLeft <= 0){
              this.gameStopFn();
          }
       }, 1000);
  }
  displayMoleFn(num){
      // 根据不同的关卡，每一关传入的参数不同，地鼠出现的频率也不同
      this.disploayMoling = setInterval(() => {
          this.mole.clickedMole = undefined;
          this.mole.randomDisplay = [];
          let temRandomDisplay = [];
           
          // 随机生成老鼠出现的位置
          for(let i = 0; i < this.barrier; i++){
              this.mole.randomDisplay[i] = Math.round(Math.random() * (this.field.length - 1) );
          }
          // 随机出现老鼠去重
          for(let i = 0; i < this.mole.randomDisplay.length; i++){
              if(temRandomDisplay.indexOf(this.mole.randomDisplay[i]) == -1){
                  temRandomDisplay.push(this.mole.randomDisplay[i]);
              }
          }
          this.mole.moleShowed = this.mole.moleShowed + temRandomDisplay.length;
          // 重置为未点击状态
          for(let i = 0; i < this.field.length; i++){
              this.field[i].clicked = false;
          }
          // 刷新击打百分比
          this.hitRateFn();
      }, num*1000);
  }
  hitFn(num) {
      // 计算击中数量
      if(this.field[num].clicked == true){
          return;
      }
      this.score.hitCount++;
      this.score.scoreTotal = this.score.hitCount * 10;
      this.mole.clickedMole = num;
      this.field[num].clicked = true;
      this.hitRateFn();
  }
  hitRateFn(){
      // 计算击中率
      let hitRate = this.score.hitCount / this.mole.moleShowed;
      this.score.hitRate = Math.floor(hitRate * 100);
  }

  gameStartFn(flag: string){
      // 开始游戏
      if(flag == 'restart') {
          this.barrier = 1;
      }
      this.initData();
      this.timeCountFn();
      this.displayMoleFn(this.time.autoDisplaySpacing);
  }
  gameStopFn(){
      // 游戏结束
      clearInterval(this.timeCounting);
      clearInterval(this.disploayMoling);
       
      // 如果击中率大于60%，可以选择进入下一关；否则，直接game over
      if(this.score.hitRate > 60 ) {
          let confirmResult = confirm('Section ' + this.barrier + ' is stopping! \n Your total score is ' + this.score.scoreTotal + '\n Your hit rate is ' + this.score.hitRate + '\n Would you like to go on to next section?');
          if(confirmResult){
              this.barrier++;
              if(this.barrier > this.maxBarrier){
                  this.gameOverFn('allpass');
                   
              } else {
                  this.initData();
                  this.gameStartFn('continue');
              }
          } else {
              this.gameOverFn('failed');
          }
      } else {
          this.gameOverFn('failed');
      }
  }
  gameOverFn(flag: string){
      // 游戏结束
      clearInterval(this.timeCounting);
      clearInterval(this.disploayMoling);
      if(flag == 'failed') {
          this.gameOver.isOver = true;
          this.gameOver.isPassAll = false;
      } else if (flag == 'allpass'){
          this.gameOver.isOver = false;
          this.gameOver.isPassAll = true;
      }
  }
}
