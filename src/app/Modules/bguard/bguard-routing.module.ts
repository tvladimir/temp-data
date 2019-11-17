import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BguardLayoutComponent } from './Layouts/bguard-layout/bguard-layout.component';
import { InsertIdPageComponent } from './Pages/insert-id-page/insert-id-page.component';
import { InsertPhoneNumberPageComponent } from './Pages/insert-phone-number-page/insert-phone-number-page.component';
import { InsertSmsCodePageComponent } from './Pages/insert-sms-code-page/insert-sms-code-page.component';
import { IdentityTabsPageComponent } from './Pages/identity-tabs-page/identity-tabs-page.component';
import { InsertMailAndPhonePageComponent } from './Pages/insert-mail-and-phone-page/insert-mail-and-phone-page.component';
import { InsertCustomerNumberPageComponent } from './Pages/insert-customer-number-page/insert-customer-number-page.component';
import { ThankYouPageComponent } from './Pages/thank-you-page/thank-you-page.component';
import { RegisteredPageComponent } from './Pages/registered-page/registered-page.component';
import { ResendSmsRegisteredPageComponent } from './Pages/resend-sms-registered-page/resend-sms-registered-page.component';
import { PromotionPageComponent } from './Pages/promotion-page/promotion-page.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';

const routes: Routes = [
  {path: '', component: BguardLayoutComponent, children: [
    {path: '', component: InsertIdPageComponent, pathMatch: 'full'},
    {path: 'insertPhone', component: InsertPhoneNumberPageComponent, pathMatch: 'full'},
    {path: 'insertCustomerNumber', component: InsertCustomerNumberPageComponent, pathMatch: 'full'},
    {path: 'insertSmsCode', component: InsertSmsCodePageComponent, pathMatch: 'full'},
    {path: 'insertMailAndPhone', component: InsertMailAndPhonePageComponent, pathMatch: 'full'},
    {path: 'identity', component: IdentityTabsPageComponent, pathMatch: 'full'},
    {path: 'thankYou', component: ThankYouPageComponent, pathMatch: 'full'},
    {path: 'Registered', component: RegisteredPageComponent, pathMatch: 'full'},
    {path: 'ResendSmsRegistered', component: ResendSmsRegisteredPageComponent, pathMatch: 'full'},
    {path: 'promotion', component: PromotionPageComponent, pathMatch: 'full'},
    {path: 'error', component: ErrorPageComponent, pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BguardRoutingModule { }
