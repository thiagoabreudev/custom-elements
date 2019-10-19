import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViacepService } from '../services/viacep.service';

@Component({
  selector: 'app-cs-modal-form',
  templateUrl: './cs-modal-form.component.html',
  styleUrls: ['./cs-modal-form.component.scss']
})
export class CsModalFormComponent implements OnInit {
  @Input() origins: any;
  @Input() dropdownList: any = [];
  form: FormGroup;
  selectedItems = [];
  dropdownSettings = {};
  requiredMessage = 'Este campo é obrigatório';

  constructor (private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private viaCepService: ViacepService) { }

  ngOnInit() {
    this.origins = this.origins.sort((a, b) => a.originName < b.originName ? -1 : 1);
    // Multselect
    this.selectedItems = [

    ];
    this.formatDescriptionModalities();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Selecione todos',
      unSelectAllText: 'Desmarque todos',
      searchPlaceholderText: 'Pesquisar...',
      noDataAvailablePlaceholderText: 'Não existe dados para pesquisar',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.form = this.formBuilder.group({
      originId: [null, Validators.required],
      name: [null, Validators.required],
      zipCode: [null, { validators: Validators.required, updateOn: 'blur' }],
      address: [null, Validators.required],
      addressNumber: [null, Validators.required],
      addressNeighborhood: [null, Validators.required],
      addressComplement: [null],
      addressCity: [null, Validators.required],
      addressState: [null, Validators.required],
      modalities: [this.selectedItems, Validators.required],
      phone1: [null],
      phone2: [null],
      email: [null],
      site: [null]
    });

    this.onChangeCep();

  }

  formatDescriptionModalities() {
    for (const item of this.dropdownList) {
      item.description = `${item.code}-${item.description}`;
    }
    this.dropdownList = this.dropdownList.sort((a, b) => a.description < b.description ? -1 : 1);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit() {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
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

  getClass(field) {
    if (this.form.get(field).invalid && (this.form.get(field).touched || this.form.get(field).dirty)) {
      return 'is-invalid';
    }
    return '';
  }

}
