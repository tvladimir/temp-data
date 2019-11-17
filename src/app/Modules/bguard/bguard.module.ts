import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BguardRoutingModule } from './bguard-routing.module';
import { TestPageComponent } from './Pages/test-page/test-page.component';
import { MainBoxLogoComponent } from './Components/main-box-logo/main-box-logo.component';
import { InsertIdPageComponent } from './Pages/insert-id-page/insert-id-page.component';
import { BguardLayoutComponent } from './Layouts/bguard-layout/bguard-layout.component';
import { InsertSmsCodePageComponent } from './Pages/insert-sms-code-page/insert-sms-code-page.component';
import { InsertPhoneNumberPageComponent } from './Pages/insert-phone-number-page/insert-phone-number-page.component';
import { MainBoxLogoTabsComponent } from './Components/main-box-logo-tabs/main-box-logo-tabs.component';
import { IdentityTabsPageComponent } from './Pages/identity-tabs-page/identity-tabs-page.component';
import { InsertCustomerIdComponent } from './Components/insert-customer-id/insert-customer-id.component';
import { InsertPaymentNumbersComponent } from './Components/insert-payment-numbers/insert-payment-numbers.component';
import { SendSmsIdentityCodeComponent } from './Components/send-sms-identity-code/send-sms-identity-code.component';
import { InsertMailAndPhonePageComponent } from './Pages/insert-mail-and-phone-page/insert-mail-and-phone-page.component';
import { InsertCustomerNumberPageComponent } from './Pages/insert-customer-number-page/insert-customer-number-page.component';
import { MainBoxImageHeaderComponent } from './Components/main-box-image-header/main-box-image-header.component';
import { ThankYouPageComponent } from './Pages/thank-you-page/thank-you-page.component';
import { RegisteredPageComponent } from './Pages/registered-page/registered-page.component';
import { PromotionPageComponent } from './Pages/promotion-page/promotion-page.component';
import { ResendSmsRegisteredPageComponent } from './Pages/resend-sms-registered-page/resend-sms-registered-page.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BguardRoutingModule,
  ],
  declarations: [
    TestPageComponent,
    MainBoxLogoComponent,
    InsertIdPageComponent,
    BguardLayoutComponent,
    InsertSmsCodePageComponent,
    InsertPhoneNumberPageComponent,
    MainBoxLogoTabsComponent,
    IdentityTabsPageComponent,
    InsertCustomerIdComponent,
    InsertPaymentNumbersComponent,
    SendSmsIdentityCodeComponent,
    InsertMailAndPhonePageComponent,
    InsertCustomerNumberPageComponent,
    MainBoxImageHeaderComponent,
    ThankYouPageComponent,
    ResendSmsRegisteredPageComponent,
    RegisteredPageComponent,
    PromotionPageComponent,
    ErrorPageComponent
  ],
})
export class BguardModule { }
