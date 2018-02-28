import { Component, OnInit } from '@angular/core';
import { CoinoneApiService } from '../../service/coinone-api.service'
import { ActivatedRoute } from '@angular/router';
import { CommonService } from "../../service/common.service"
import {MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-trade-detail',
  templateUrl: './trade-detail.component.html',
  styleUrls: ['./trade-detail.component.css']
})
export class TradeDetailComponent implements OnInit {
  private cCoinName = null;
  private tradeHistory;
  public lineChartLabels: Array<any> = [];
  public lineBidChartLabels: Array<any> = [];
  // lineChart
  public lineChartData: Array<any> = [];
  public lineBidChartData: Array<any> = [];
  //bid : 매수
  //ask : 매도
  showAskChart = false;
  // { data: [65, 59, 80, 81, 56, 55, 40, 20, 50, 70], label: 'ask' },
  availCoin = null;
  availKrw = null;
  sellPrice = null;
  displayedColumns = ['time', 'price', 'qty'];
  dataSource = null;
  maxCoinAvail = null;
  maxKrwAvail = null;
  constructor(private cApiService: CoinoneApiService, private activeRouted: ActivatedRoute, private comService: CommonService, public snackBar: MatSnackBar) {


    let tmpSubscribe = activeRouted.params.subscribe(params => {
      this.cCoinName = params["coin"];
      this.getBalance();
      let tmpSubRecentCompleteOrders = cApiService.getRecentCompleteOrders(this.cCoinName).subscribe(res=>{
        
        let ele_data:Array<RecentOrders> = [];
        let completeOrder = res['completeOrders'].reverse();
        for(let i=0; i<15; i++){
          
          let tmpEle:RecentOrders = {
            price:this.comService.numberWithCommas(completeOrder[i]['price']),
            qty:completeOrder[i]['qty'],
            time:this.timestampToDate(completeOrder[i]['timestamp'])
          }
          
          ele_data.push(tmpEle);
        }
        this.dataSource = new MatTableDataSource<RecentOrders>(ele_data);
        
        tmpSubRecentCompleteOrders.unsubscribe();
      })
      let tmpSubOrderBook = cApiService.getOderBook(this.cCoinName).subscribe(res => {
        
        let tmpQty = [];
        let tmpBidQty = [];
        for (let i = 0; i < 20; i++) {
          this.lineChartLabels.push(this.comService.numberWithCommas(res["bid"][i]["price"]));
          tmpQty.push(res["bid"][i]["qty"])
        }
        for (let i = 0; i < 20; i++) {
          this.lineBidChartLabels.push(this.comService.numberWithCommas(res["ask"][i]["price"]));
          tmpBidQty.push(res["ask"][i]["qty"])
        }
        this.lineChartData.push({
          data: tmpQty, label: "매수"
        })

        this.lineBidChartData.push({
          data: tmpBidQty, label: "매도"
        })
        this.lineChartLabels.reverse();
        setTimeout(() => {
          this.showAskChart = true;
        }, 500)
        tmpSubOrderBook.unsubscribe();
      })
      
    })
  }

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(64,195,88,.4)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#40c358',
      pointHoverBackgroundColor: '#40c358',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineBidChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(253,45,82,.4)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fd2d52',
      pointHoverBackgroundColor: '#fd2d52',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  getBalance(){
    let tmpSubBalance = this.cApiService.getBalance().subscribe(res=>{
      this.availCoin =this.comService.numberWithCommas(res[this.cCoinName]["avail"]);
      this.availKrw = this.comService.numberWithCommas(res["krw"]["avail"]);
      
      tmpSubBalance.unsubscribe();
    })
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
    
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {

  }

  timestampToDate(timestamp){
    let date = new Date(timestamp*1000);
    let hour = date.getHours()>=10?date.getHours():"0"+date.getHours();
    let min = date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
    let sec = date.getSeconds()>=10?date.getSeconds():"0"+date.getSeconds();


    return hour+":"+min+":"+sec;
  }

  onlyNumber(event){
  
    this.comService.onlyInputNumbers(event);
  }

  maxOrder(){
    let krw = <HTMLInputElement>document.getElementById("buy-krw");
    
    let tmpNum = (this.availKrw.replace(/,/gi, "")/Number(krw.value.replace(/,/gi, "")));
    
    this.maxKrwAvail = (Math.floor(tmpNum*10000000))/10000000
  }

  limitSell(){
    let qty = <HTMLInputElement>document.getElementById("sell-coin");
    let price = <HTMLInputElement>document.getElementById("sell-krw");
    let tmpSubscribe = this.cApiService.limitSell(price.value.replace(/,/gi, ""),qty.value.replace(/,/gi, ""),this.cCoinName).subscribe(res=>{
      let msg = res["result"] == "error"? "ERROR! - code : "+res["errorCode"]:"판매 신청 완료"
      // let msg = res.
      if(res["result"] == "error"){
        this.openSnackBar(msg, 10000);
      }else{
        this.openSnackBar(msg);
      }
      tmpSubscribe.unsubscribe();
    })
  }

  limitBuy(){
    let qty = <HTMLInputElement>document.getElementById("buy-coin");
    let price = <HTMLInputElement>document.getElementById("buy-krw");
    let tmpSubscribe = this.cApiService.limitBuy(price.value.replace(/,/gi, ""),qty.value.replace(/,/gi, ""),this.cCoinName).subscribe(res=>{
     
      let msg = res["result"] == "error"? "ERROR! - code : "+res["errorCode"]:"구매 신청 완료"
      // let msg = res.
      if(res["result"] == "error"){
        this.openSnackBar(msg, 10000);
      }else{
        this.openSnackBar(msg);
      }
      
      tmpSubscribe.unsubscribe();
    })
  }

  openSnackBar(message: string, duration=5000) {
    this.snackBar.open(message, "확인", {
      duration: duration,
    });
  }


}

export interface RecentOrders {
  time: string;
  price: string;
  qty: string;
}

