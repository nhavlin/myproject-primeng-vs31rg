import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import { LawComponent } from './law/05-ui/law/law.component';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OrganizationChartModule,
    ToastModule,
    PanelModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AutoCompleteModule
  ],
  declarations: [AppComponent, LawComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
