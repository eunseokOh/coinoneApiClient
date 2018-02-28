import { Injectable } from '@angular/core';
import { Response, URLSearchParams, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';

import { HttpClient,HttpParams } from '@angular/common/http'
@Injectable()
export class CoinoneApiService {
  private DEFAULT_URL: string = "<your server ip address>"
  private feeRate = null;

  constructor(private _http: HttpClient) { }

  setFeeRate(fee){
    this.feeRate = fee;
  }

  getFeeRate(){
    return this.feeRate;
  }
  getCoinList() {
    let queryString = "coinlist/";
    return this._http.get<any>(this.DEFAULT_URL + queryString).map((res: Response) => {
      return res['coinList'];
    })
  }

  getBalance(){
    let queryString = "balance/";
    return this._http.get<any>(this.DEFAULT_URL + queryString).map((res: Response) => {
      return res;
    })
  }

  getUserInfo(){
    let queryString = "userinfo/";
    return this._http.get<any>(this.DEFAULT_URL + queryString).map((res: Response) => {
      return res;
    })
  }

  getDepositAddress(){
    let queryString = "deposit/";
    return this._http.get<any>(this.DEFAULT_URL + queryString).map((res: Response) => {
      return res;
    })
  }

  getTickerAll(){
    let url="https://api.coinone.co.kr/ticker/?format=json&currency=all";
    return this._http.get<any>(url).map((res: Response) => {
      return res;
    })
  }

  getOderBook(coinName){
    let url ="https://api.coinone.co.kr/orderbook/?format=json&currency="+coinName

    return this._http.get<any>(url).map((res: Response) => {
      return res;
    })
  }

  getRecentCompleteOrders(coinName, period="hour"){
    let url ="https://api.coinone.co.kr/trades/?format=json&currency="+coinName+"&period="+period

    return this._http.get<any>(url).map((res: Response) => {
      return res;
    })
  }


  limitSell(price, qty, currency){
    let queryString = "limitsell/";
    return this._http.get<any>(this.DEFAULT_URL + queryString+currency+"/"+price+"/"+qty+"/").map((res: Response) => {
      return res;
    })
  }

  limitBuy(price, qty, currency){
    let queryString = "limitbuy/";
    return this._http.get<any>(this.DEFAULT_URL + queryString+currency+"/"+price+"/"+qty+"/").map((res: Response) => {
      return res;
    })
  }
}
