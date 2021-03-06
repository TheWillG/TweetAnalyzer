import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxUIModule, ButtonModule } from '@swimlane/ngx-ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reducer } from './store/reducers/tweets';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ tweets: reducer }),
    NgxChartsModule,
    NgxUIModule,
    ButtonModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
