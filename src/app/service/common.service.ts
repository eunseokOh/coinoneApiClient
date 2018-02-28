import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CommonService {
  private bankCodeList = [
    { code: "1", name: "한국" },
    { code: "2", name: "산업" },
    { code: "3", name: "기업" },
    { code: "4", name: "국민" },
    { code: "5", name: "ＫＥＢ하나" },
    { code: "6", name: "국민" },
    { code: "7", name: "수협은행" },
    { code: "8", name: "수출입" },
    { code: "9", name: "수협은행" },
    { code: "10", name: "농협은행" },
    { code: "11", name: "농협은행" },
    { code: "12", name: "농협중앙회" },
    { code: "13", name: "농협중앙회" },
    { code: "14", name: "농협중앙회" },
    { code: "15", name: "농협중앙회" },
    { code: "16", name: "농협은행" },
    { code: "17", name: "농협중앙회" },
    { code: "18", name: "농협중앙회" },
    { code: "19", name: "국민" },
    { code: "20", name: "우리" },
    { code: "21", name: "신한" },
    { code: "23", name: "ＳＣ제일" },
    { code: "25", name: "ＫＥＢ하나" },
    { code: "26", name: "신한" },
    { code: "27", name: "한국씨티" },
    { code: "28", name: "신한" },
    { code: "29", name: "국민" },
    { code: "31", name: "대구" },
    { code: "32", name: "부산" },
    { code: "33", name: "ＫＥＢ하나" },
    { code: "34", name: "광주" },
    { code: "35", name: "제주" },
    { code: "36", name: "한국씨티" },
    { code: "37", name: "전북" },
    { code: "39", name: "경남" },
    { code: "45", name: "새마을금고" },
    { code: "46", name: "새마을금고" },
    { code: "47", name: "신협" },
    { code: "48", name: "신협" },
    { code: "49", name: "신협" },
    { code: "50", name: "상호저축은행" },
    { code: "51", name: "Ｄ．Ｂ．Ｓ．" },
    { code: "52", name: "모간스탠리" },
    { code: "53", name: "한국씨티" },
    { code: "54", name: "ＨＳＢＣ" },
    { code: "55", name: "도이치은행" },
    { code: "56", name: "알비에스피엘씨" },
    { code: "57", name: "ＪＰ모간체이스" },
    { code: "58", name: "미즈호은행" },
    { code: "59", name: "미쓰비시도쿄ＵＦＪ은" },
    { code: "60", name: "Ｂ．Ｏ．Ａ" },
    { code: "61", name: "비엔피파리바" },
    { code: "62", name: "중국공상은행" },
    { code: "63", name: "중국은행" },
    { code: "64", name: "산림조합" },
    { code: "65", name: "대화은행" },
    { code: "71", name: "우체국" },
    { code: "72", name: "우체국" },
    { code: "73", name: "우체국" },
    { code: "74", name: "우체국" },
    { code: "75", name: "우체국" },
    { code: "76", name: "신용보증기금" },
    { code: "77", name: "기술보증기금" },
    { code: "78", name: "국민" },
    { code: "79", name: "국민" },
    { code: "80", name: "ＫＥＢ하나" },
    { code: "81", name: "ＫＥＢ하나" },
    { code: "82", name: "ＫＥＢ하나" },
    { code: "84", name: "우리" },
    { code: "85", name: "새마을금고" },
    { code: "86", name: "새마을금고" },
    { code: "87", name: "새마을금고" },
    { code: "88", name: "신한" },
    { code: "89", name: "케이뱅크" },
    { code: "90", name: "카카오뱅크" },
    { code: "99", name: "금융결제원" },
    { code: "209", name: "유안타증권" },
    { code: "218", name: "현대증권" },
    { code: "226", name: "ＫＢ투자증권" },
    { code: "227", name: "ＫＴＢ투자증권" },
    { code: "230", name: "미래에셋대우" },
    { code: "238", name: "미래에셋대우" },
    { code: "240", name: "삼성증권" },
    { code: "243", name: "한국투자증권" },
    { code: "247", name: "ＮＨ투자증권" },
    { code: "261", name: "교보증권" },
    { code: "262", name: "하이투자증권" },
    { code: "263", name: "ＨＭＣ투자증권" },
    { code: "264", name: "키움증권" },
    { code: "265", name: "이베스트투자증권" },
    { code: "266", name: "에스케이증권" },
    { code: "267", name: "대신증권" },
    { code: "268", name: "메리츠종합금융증권" },
    { code: "269", name: "한화투자증권" },
    { code: "270", name: "하나금융투자" },
    { code: "278", name: "신한금융투자" },
    { code: "279", name: "동부증권" },
    { code: "280", name: "유진투자증권" },
    { code: "287", name: "메리츠종합금융증권" },
    { code: "289", name: "ＮＨ투자증권" },
    { code: "290", name: "부국증권" },
    { code: "291", name: "신영증권" },
    { code: "292", name: "케이프투자증권" },
    { code: "294", name: "펀드온라인코리아" },
    { code: "431", name: "미래에셋생명" },
    { code: "452", name: "삼성생명" }
  ]

  private userInfo = null;
  constructor() { }

  unsubscribeList(subcribeList: Array<Subscription>) {
    subcribeList.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }


  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }

  getBankName(code) {
    for (let i = 0; i < this.bankCodeList.length; i++) {
      if (this.bankCodeList[i]["code"] == code) {

        return this.bankCodeList[i]["name"];
      }
    }

  }

  numberWithCommas(n) {
    var parts = n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
  }

  onlyInputNumbers(event) {

      let tmpVal: string = event.target.value;
     
      event.target.value = this.numberWithCommas(tmpVal.replace(/[^0-9]/g, ''));
      

  }


}
