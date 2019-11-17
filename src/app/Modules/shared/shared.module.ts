import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatTabsModule, MatCheckboxModule } from '@angular/material';

import { MainBoxComponent } from './Components/main-box/main-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BezeqLoaderComponent } from './Components/bezeq-loader/bezeq-loader.component';
import { InputValidatorDirective } from './Directives/input-validator/input-validator.directive';
import { Nl2pbrPipe } from './pipes/Nl2pbr/nl2pbr.pipe';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  declarations: [
    MainBoxComponent,
    BezeqLoaderComponent,
    InputValidatorDirective,
    Nl2pbrPipe,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MainBoxComponent,
    BezeqLoaderComponent,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    Nl2pbrPipe
  ]
})
export class SharedModule { }
