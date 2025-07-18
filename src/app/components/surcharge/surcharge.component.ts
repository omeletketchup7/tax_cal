import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-surcharge',
  templateUrl: './surcharge.component.html',
  styleUrl: './surcharge.component.css'
})
export class SurchargeComponent {
  @Output() sentSurcharge = new EventEmitter<any>();
  @Input() taxAmountFromParentToSurcharge: any;

  surchargeFormGroup = new FormGroup({
    valueSurcharge: new FormControl()
  })

  ngOnInit(): void {
    if (!((Number)(parseFloat(String(this.taxAmountFromParentToSurcharge)).toFixed(2)) >= 0)) {
      this.surchargeFormGroup.get('valueSurcharge')?.setValue(null);
    } else {
      this.surchargeFormGroup.get('valueSurcharge')?.setValue(parseFloat(String(this.taxAmountFromParentToSurcharge)).toFixed(2));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taxAmountFromParentToSurcharge']) {
      if (!((Number)(parseFloat(String(this.taxAmountFromParentToSurcharge)).toFixed(2)) >= 0)) {
        this.surchargeFormGroup.get('valueSurcharge')?.setValue(null);
      } else {
        this.surchargeFormGroup.get('valueSurcharge')?.setValue(parseFloat(String((this.taxAmountFromParentToSurcharge * 0.1))).toFixed(2));
      }
      this.sendPenalty();
    }
  }

  formmat() {
    const input = parseFloat(this.taxAmountFromParentToSurcharge);
    if (!isNaN(input)) {
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(input);
      this.surchargeFormGroup.get('valueSurcharge')?.setValue(formatted, { emitEvent: false });
    } else {
      this.surchargeFormGroup.get('valueSurcharge')?.setValue('', { emitEvent: false });
    }
  }

  setToRaw(): void {
    if (this.surchargeFormGroup.get('valueSurcharge')?.value) {
      const value = parseFloat(this.surchargeFormGroup.get('valueSurcharge')?.value.replace(/,/g, ''));
      if (!isNaN(value)) {
        this.taxAmountFromParentToSurcharge = value;
        this.surchargeFormGroup.get('valueSurcharge')?.setValue(value, { emitEvent: false });
      }
    } else {
      this.taxAmountFromParentToSurcharge = null;
      this.surchargeFormGroup.get('valueSurcharge')?.setValue(null, { emitEvent: false });
    }
  }

  sendPenalty() {
    this.sentSurcharge.emit(this.taxAmountFromParentToSurcharge * 0.1);
  }



}
