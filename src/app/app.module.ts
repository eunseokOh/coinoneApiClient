//default module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//add module
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//service
import {CoinoneApiService} from './service/coinone-api.service'
import {CommonService} from './service/common.service'

//meterial module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { DepositAlertComponent } from './component/deposit-alert/deposit-alert.component';
import { FooterComponent } from './component/footer/footer.component';
import { TradeComponent } from './component/trade/trade.component';
import { TradeDetailComponent } from './component/trade-detail/trade-detail.component';

//provider
import { NgModel } from '@angular/forms';

@NgModule({
  entryComponents:[
    DepositAlertComponent
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    UserInfoComponent,
    DepositAlertComponent,
    FooterComponent,
    TradeComponent,
    TradeDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    ChartsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {path:'user', component : UserInfoComponent },
      {path:'trade', component : TradeComponent },
      {path:'trade-detail/:coin', component : TradeDetailComponent },
      {path:'**',redirectTo:'/trade'}
    ])
  ],
  providers: [CoinoneApiService,CommonService,NgModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
