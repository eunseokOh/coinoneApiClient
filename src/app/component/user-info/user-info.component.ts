import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CoinoneApiService } from '../../service/coinone-api.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepositAlertComponent } from "../deposit-alert/deposit-alert.component"
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../service/common.service'
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  displayedColumns = ['coinName', 'avail', 'balance', 'makerFee', 'takerFee', 'deposit'];
  dataSource = null;
  updateBalanceSubscribe: Subscription = null;

  @ViewChild(MatSort) sort: MatSort;
  tmpInterval = null;
  userInfoInterval = null;
  updateIntervalList = [];

  userInfo = null;
  subscribeList: Array<Subscription> = [];
  bankName = null;
  constructor(private cApiService: CoinoneApiService, public dialog: MatDialog, private comService: CommonService) {
    this.initBalance();
  
    // this.updateIntervalList.push(setInterval(() => {
      
    // }, 5000));
    this.userInfoInterval = setInterval(()=>{
      
      if(this.userInfo = comService.getUserInfo()){
        
        clearInterval(this.userInfoInterval);
        this.userInfoInterval = null;
        this.bankName = this.getBankName(this.userInfo.bankInfo.bankCode)
      }
    },100)
  }

  initBalance() {

    this.dataSource = null;
    if (this.updateBalanceSubscribe) {
      this.updateBalanceSubscribe.unsubscribe();
      this.updateBalanceSubscribe = null;
    }

    this.updateBalanceSubscribe = this.cApiService.getBalance().subscribe((res) => {
      
      let feeRates = null;
      let element_data: Element[] = [];

      this.tmpInterval = setInterval(() => {
        if (this.cApiService.getFeeRate()) {
          clearInterval(this.tmpInterval);
          this.tmpInterval = null;
          feeRates = this.cApiService.getFeeRate();
          for (let i in Object.keys(res)) {
            let key = Object.keys(res)[i];
            if (res[key]["avail"]) {
              element_data.push({
                coinName: key,
                avail: this.comService.numberWithCommas(res[key]['avail']),
                balance: this.comService.numberWithCommas(res[key]['balance']),
                deposit: key == "krw" ? false : true,
                makerFee: key == "krw" ? "" : this.doubleToPercent(feeRates[key]["maker"]),
                takerFee: key == "krw" ? "" : this.doubleToPercent(feeRates[key]["taker"])
              })
            }
          }
          this.dataSource = new MatTableDataSource<Element>(element_data);
          this.dataSource.sort = this.sort;
          this.updateBalanceSubscribe.unsubscribe();
          this.updateBalanceSubscribe = null;
        }
      }, 100)
    });
  }

  ngOnInit() {
  }

  doubleToPercent(double) {
    return (double * 100) + " %"
  }

  ngOnDestroy() {
    if (this.tmpInterval) clearInterval(this.tmpInterval);
    if (this.subscribeList) this.comService.unsubscribeList(this.subscribeList);
    if(this.updateBalanceSubscribe) this.updateBalanceSubscribe.unsubscribe();
    if (this.updateIntervalList) {
      for (let i = 0; i < this.updateIntervalList.length; i++) {
        clearInterval(this.updateIntervalList[i]);
      }
    }
  }

  getBankName(code){

    return this.comService.getBankName(code);
  }

  depositAddress(coinName) {
    let tmpSubscribe = this.cApiService.getDepositAddress().subscribe(res => {

      let dialogRef = this.dialog.open(DepositAlertComponent, {
        width: 'auto',
        data: { coinName: coinName, walletAddress: res['walletAddress'][coinName], walletTag: res['walletAddress'][coinName + "_tag"] }
      });
      tmpSubscribe.unsubscribe();
    })
  }
}

export interface Element {
  coinName: string;
  avail: string;
  balance: string;
  deposit: boolean;
  makerFee: string;
  takerFee: string;
}

