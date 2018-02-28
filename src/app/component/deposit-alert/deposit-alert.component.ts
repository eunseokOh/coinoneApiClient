import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-deposit-alert',
  templateUrl: './deposit-alert.component.html',
  styleUrls: ['./deposit-alert.component.css']
})
export class DepositAlertComponent implements OnInit {
  private coinName;
  private walletAddress;
  private walletTag;
  constructor(public dialogRef: MatDialogRef<DepositAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.coinName = data.coinName;
      this.walletAddress = data.walletAddress;
      this.walletTag = data.walletTag;
    }

  ngOnInit() {
  }

  copyAddress(){
      var copyText = <HTMLInputElement>document.getElementById("wallet");
      copyText.select();
      document.execCommand("copy");
  }

}
