import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinoneApiService} from '../../service/coinone-api.service'
import { CommonService }  from '../../service/common.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit, OnDestroy {
  private intervalTicker;
  private coinList = [];
  constructor(private cApiService:CoinoneApiService, private comService:CommonService, private router:Router) { 
    let tmpSubscirbe = cApiService.getTickerAll().subscribe(res=>{
      
      let obj = Object.keys(res);
      for(let i=0; i<obj.length;i++){
        if(obj[i] != "errorCode" && obj[i] != "timestamp" && obj[i] != "result"){
          this.coinList.push(res[obj[i]]);
        }
      }
      this.intervalTicker = setInterval(()=>{
        this.updateTickerAll();
      },4000)
      this.updateTickerAll();
      tmpSubscirbe.unsubscribe();
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    if(this.intervalTicker) clearInterval(this.intervalTicker)
  }

  updateTickerAll(){
    let tmpSubscirbe = this.cApiService.getTickerAll().subscribe(res=>{

      for(let i=0; i<this.coinList.length; i++){
        let coin = this.coinList[i]['currency']
        this.coinList[i]["first"] = res[coin]["first"]
        this.coinList[i]["high"] = res[coin]["high"]
        this.coinList[i]["last"] = res[coin]["last"]
        this.coinList[i]["low"] = res[coin]["low"]
        this.coinList[i]["volume"] = res[coin]["volume"]
        this.coinList[i]["yesterday_first"] = res[coin]["yesterday_first"]
        this.coinList[i]["yesterday_high"] = res[coin]["yesterday_high"]
        this.coinList[i]["yesterday_last"] = res[coin]["yesterday_last"]
        this.coinList[i]["yesterday_low"] = res[coin]["yesterday_low"]
        this.coinList[i]["yesterday_volume"] = res[coin]["yesterday_volume"]
      }
      tmpSubscirbe.unsubscribe();
    })
  }

  movePage(c){
    this.router.navigate(["/trade-detail",c])
  }

  numberWithCommas(x){
    
    return this.comService.numberWithCommas(x);
  }



}
