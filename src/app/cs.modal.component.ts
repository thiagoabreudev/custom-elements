import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CsModalFormComponent } from './cs-modal-form/cs-modal-form.component';
import { ViacepService } from './services/viacep.service';


@Component({
  selector: 'cs-modal',
  templateUrl: './cs.modal.component.html',
  styleUrls: ['./cs.modal.component.scss']
})
export class CsModalComponent implements OnInit {
  @Input() closeResult: string;
  @Input() origins: any;
  @Output() result = new EventEmitter<any>();

  constructor(private modalService: NgbModal, private viaCepService: ViacepService) { }
  convertStringToObj(obj = []) {
    if (typeof obj === 'object') {
      return obj;
    }
    return JSON.parse(obj);
  }

  ngOnInit(): void { }

  open() {
    this.origins = this.convertStringToObj(this.origins);
    const modalRef = this.modalService.open(CsModalFormComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    modalRef.componentInstance.origins = this.origins;
    modalRef
      .result.then((result) => {
        this.result.emit(result)
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
