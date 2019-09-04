import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cs-modal-form',
  templateUrl: './cs-modal-form.component.html',
  styleUrls: ['./cs-modal-form.component.scss']
})
export class CsModalFormComponent implements OnInit {
  @Input() origins: any;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      originId: [null],
      name: [null],
      zipCode: [null],
      address: [null],
      addressNumber: [null],
      addressNeighborhood: [null],
      addressComplement: [null],
      addressCity: [null],
      addressState: [null]
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit() {
    this.activeModal.close(this.form.value);
  }

}
