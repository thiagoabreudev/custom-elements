import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CsModalComponent } from './cs.modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CsModalFormComponent } from './cs-modal-form/cs-modal-form.component';

@NgModule({
  declarations: [
    CsModalComponent,
    CsModalFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  entryComponents: [
    CsModalComponent,
    CsModalFormComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const component = createCustomElement(CsModalComponent, {injector});
    customElements.define('cs-modal', component)
  }

  ngDoBootstrap() {}

}
