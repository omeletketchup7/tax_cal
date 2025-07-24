import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tax-amount',
  templateUrl: './tax-amount.component.html',
  styleUrl: './tax-amount.component.css'
})
export class TaxAmountComponent {

  @Input() taxAmountFromParent: any;
  @Output() sentTaxAmount = new EventEmitter<any>();
  @Output() sentWrongVAT = new EventEmitter<any>();

  taxAmountRAW: any;
  isWrongVAT = true;

  taxAmountFormGroup = new FormGroup({
    taxAmount: new FormControl()
  })

  ngOnInit(): void {
    this.taxAmountFormGroup.get('taxAmount')?.valueChanges.subscribe((value) => {
      if ((((Number(value)) - 20.00) > (this.taxAmountFromParent * 0.07)) || (((Number(value)) + 20.00) < (this.taxAmountFromParent * 0.07))) {
        this.isWrongVAT = false;
        this.sendWrongVAT()
      } else {
        this.isWrongVAT = true;
        this.sendWrongVAT()
      }
      if (!(value == '')) {
        this.taxAmountRAW = parseFloat(value).toFixed(2);
        this.sendTaxAmount(parseFloat(value).toFixed(2));
      } else if (Number.isNaN(value)) {
        this.taxAmountRAW = null;
        this.sendTaxAmount(null);
      } else {
        this.taxAmountRAW = null;
        this.sendTaxAmount(null);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taxAmountFromParent']) {
      if (this.taxAmountFromParent == null) {
        this.taxAmountFormGroup.get('taxAmount')?.setValue(null);
      } else if (isNaN(this.taxAmountFromParent)) {
        this.taxAmountFormGroup.get('taxAmount')?.setValue(null);
      } else {
        this.taxAmountFormGroup.get('taxAmount')?.setValue((this.taxAmountFromParent * 0.07).toFixed(2), { emitEvent: false });
        this.taxAmountRAW = (this.taxAmountFromParent * 0.07).toFixed(2);
      }
      if (!(this.taxAmountFormGroup.get('taxAmount')?.value == '')) {
        this.taxAmountRAW = parseFloat(this.taxAmountFormGroup.get('taxAmount')?.value).toFixed(2);
        this.sendTaxAmount(parseFloat(this.taxAmountFormGroup.get('taxAmount')?.value).toFixed(2));
      } else if (Number.isNaN(this.taxAmountFormGroup.get('taxAmount')?.value)) {

      } else {
        this.taxAmountRAW = null;
        this.sendTaxAmount(null);
      }
    }
  }

  sendTaxAmount(value: any) {
    this.sentTaxAmount.emit(value);
  }
  sendWrongVAT() {
    this.sentWrongVAT.emit(this.isWrongVAT);
  }

  formmat() {
    const input = parseFloat(this.taxAmountRAW);
    if (!isNaN(input)) {
      const InputFormmat = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(Number(input));
      this.taxAmountFormGroup.get('taxAmount')?.setValue(InputFormmat, { emitEvent: false });
    } else {
      this.taxAmountFormGroup.get('taxAmount')?.setValue('', { emitEvent: false });
    }
  }

  setToRaw(): void {
    const InputFormmat = this.taxAmountFormGroup.get('taxAmount')?.value;
    const rawData = InputFormmat.replace(/,/g, '');
    if (this.taxAmountFormGroup.get('taxAmount')?.value == "") {
      this.taxAmountRAW = null;
    } else {
      this.taxAmountFormGroup.get('taxAmount')?.setValue(rawData, { emitEvent: false });
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

    this.taxAmountRAW = value;
    this.taxAmountFormGroup.get('taxAmount')?.setValue(value, { emitEvent: false });
  }
}
