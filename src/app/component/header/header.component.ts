import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinoneApiService } from '../../service/coinone-api.service'
import { CommonService } from '../../service/common.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  coinoneList = [];
  userName = null;
  arrowicon = {
    assetsIcon: "keyboard_arrow_down",
    userIcon: "keyboard_arrow_down"
  }

  //btc, bch, eth, etc, xrp, qtum, iota, ltc, btg
  constructor(private cApiService: CoinoneApiService, private comService:CommonService, private router:Router) {

    let balanceSubscribe = this.cApiService.getBalance().subscribe((res) => {
      
      for (let i in Object.keys(res)) {
        let key = Object.keys(res)[i];
        if (res[key]["balance"]) {
          this.coinoneList.push({
            "coinName": this.comService.numberWithCommas(key),
            "balance": this.comService.numberWithCommas(res[key]['balance'])
          })
        }
      }
      setInterval(()=>{
        this.updateBalance();
      },4000)
      balanceSubscribe.unsubscribe();

    })

    
    let userInfoSubscribe = cApiService.getUserInfo().subscribe((res) => {
     
      cApiService.setFeeRate(res['userInfo']['feeRate'])
      comService.setUserInfo(res['userInfo'])
      this.userName = res['userInfo']['mobileInfo']['userName'];
      userInfoSubscribe.unsubscribe();
    })
  }

  updateBalance() {
    let balanceSubscribe = this.cApiService.getBalance().subscribe((res) => {
      for (let i = 0; i < this.coinoneList.length; i++) {
        let cName = this.coinoneList[i].coinName;
        this.coinoneList[i]["balance"] = res[cName]["balance"];
      }
      balanceSubscribe.unsubscribe();
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  mouseEnter(target) {
    this.arrowicon[target] = "keyboard_arrow_up"
  }
  mouseLeave(target) {
    this.arrowicon[target] = "keyboard_arrow_down"
  }

  movePage(url){
    this.router.navigateByUrl(url);
  }

  numberComma(number){
    return this.comService.numberWithCommas(number);
  }

}
