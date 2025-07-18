import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sale-amount',
  templateUrl: './sale-amount.component.html',
  styleUrl: './sale-amount.component.css'
})
export class SaleAmountComponent implements OnInit {

  @Output() sentSaleAmount = new EventEmitter<any>();

  saleAmountRAW: any;

  saleAmountFormGroup = new FormGroup({
    saleAmount: new FormControl()
  })

  ngOnInit(): void {
    this.saleAmountFormGroup.get('saleAmount')?.valueChanges.subscribe((value) => {
      if (!(value == '')) {
        this.saleAmountRAW = parseFloat(value).toFixed(2);
        this.sendSaleAmount(parseFloat(value).toFixed(2));
      } else {
        this.saleAmountRAW = null;
        this.sendSaleAmount(null);
      }
    });
  }

  sendSaleAmount(value: any) {
    this.sentSaleAmount.emit(value);
  }

  formmat() {
    const input = this.saleAmountRAW;
    const decimalInput = (input);
    const InputFormmat = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(decimalInput));
    if ((!(this.saleAmountRAW == null)) &&  (!(this.saleAmountFormGroup.get('saleAmount')?.value == ""))) {
      this.saleAmountFormGroup.get('saleAmount')?.setValue(InputFormmat, { emitEvent: false });
    } else {
      this.saleAmountFormGroup.get('saleAmount')?.setValue('', { emitEvent: false });
    }
  }

  setToRaw(): void {
    const InputFormmat = this.saleAmountFormGroup.get('saleAmount')?.value;
    const rawData = InputFormmat.replace(/,/g, '');
    if (this.saleAmountFormGroup.get('saleAmount')?.value == "") {
      this.saleAmountRAW = null;
    } else {
      this.saleAmountFormGroup.get('saleAmount')?.setValue(this.saleAmountRAW, { emitEvent: false });
    }
  }

  input(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1];
    }

    this.saleAmountRAW = value;
    this.saleAmountFormGroup.get('saleAmount')?.setValue(value, { emitEvent: false });
  }
}
