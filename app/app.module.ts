import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CountdownModule, CountdownGlobalConfig, CountdownConfig } from 'ngx-countdown';
import { NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ForrestComponent } from './forrest/forrest.component';
import { LakeComponent } from './lake/lake.component';
import { HomeComponent } from './home/home.component';
import { CaveComponent } from './cave/cave.component';

export function countdownConfigFactory(): CountdownConfig {
  return {};
}

@NgModule({
  declarations: [
    AppComponent,
    ForrestComponent,
    LakeComponent,
    CaveComponent,
    HomeComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
    }),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    CountdownModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule
  ],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
