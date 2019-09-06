import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViacepService } from '../services/viacep.service';

@Component({
  selector: 'app-cs-modal-form',
  templateUrl: './cs-modal-form.component.html',
  styleUrls: ['./cs-modal-form.component.scss']
})
export class CsModalFormComponent implements OnInit {
  @Input() origins: any;
  form: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private viaCepService: ViacepService) { }

  ngOnInit() {
    // Multselect
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.form = this.formBuilder.group({
      originId: [null],
      name: [null],
      zipCode: [null, { updateOn: 'blur' }],
      address: [null],
      addressNumber: [null],
      addressNeighborhood: [null],
      addressComplement: [null],
      addressCity: [null],
      addressState: [null],
      modalities: [this.selectedItems]
    });
    this.onChangeCep();

  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit() {
    this.activeModal.close(this.form.value);
  }

  onChangeCep() {
    this.form.get('zipCode').valueChanges.subscribe((zipCode: string) => {
      this.viaCepService.getAddress(zipCode).subscribe((address: any) => {
        this.form.get('address').setValue(address.logradouro);
        this.form.get('addressNeighborhood').setValue(address.bairro);
        this.form.get('addressCity').setValue(address.localidade);
        this.form.get('addressState').setValue(address.uf);
      });
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

}
