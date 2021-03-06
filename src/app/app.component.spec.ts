import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from './store/reducers/tweets';
import { PubNubAngular } from 'pubnub-angular2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxUIModule } from '@swimlane/ngx-ui';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxChartsModule,
        NgxDatatableModule,
        NgxUIModule,
        StoreModule.forRoot({ tweets: reducer }),
        SocketIoModule.forRoot(config)
      ],
      providers: [PubNubAngular, Store],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
