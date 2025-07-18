import { Component, EventEmitter, input, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrl: './total-amount.component.css'
})
export class TotalAmountComponent {
  @Output() sentTotal = new EventEmitter<any>();
  @Input() taxAmountToTotal: any;
  @Input() penaltyToTotal: any;
  @Input() surchargeToTotal: any;

  totalValue: any;

  totalFormGroup = new FormGroup({
    valueTotal: new FormControl()
  })

  ngOnInit(): void {
    this.totalFormGroup.get('valueTotal')?.setValue('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taxAmountToTotal']) {
      if (!((Number)(parseFloat(String(this.taxAmountToTotal)).toFixed(2)) >= 0)) {
        this.totalFormGroup.get('valueTotal')?.setValue(null);
      } else {
        this.totalFormGroup.get('valueTotal')?.setValue(parseFloat(String((((Number)(this.penaltyToTotal)) + ((Number)(this.taxAmountToTotal)) + ((Number)(this.surchargeToTotal))))).toFixed(2));
        this.totalValue = this.totalFormGroup.get('valueTotal')?.value;
      }
      console.log("bbbbbbb: ",this.taxAmountToTotal);
      this.sendPenalty()
    }
    if (changes['penaltyToTotal']) {
      if (!((Number)(parseFloat(String(this.penaltyToTotal)).toFixed(2)) >= 0)) {
        this.totalFormGroup.get('valueTotal')?.setValue(null);
      } else {
        this.totalFormGroup.get('valueTotal')?.setValue(parseFloat(String((((Number)(this.penaltyToTotal)) + ((Number)(this.taxAmountToTotal)) + ((Number)(this.surchargeToTotal))))).toFixed(2));
        this.totalValue = this.totalFormGroup.get('valueTotal')?.value;
      }
      console.log("aaaaaa: ",this.penaltyToTotal)
      this.sendPenalty()
    }
    if (changes['surchargeToTotal']) {
      if (!((Number)(parseFloat(String(this.surchargeToTotal)).toFixed(2)) >= 0)) {
        this.totalFormGroup.get('valueTotal')?.setValue(null);
      } else {
        this.totalFormGroup.get('valueTotal')?.setValue(parseFloat(String((((Number)(this.penaltyToTotal)) + ((Number)(this.taxAmountToTotal)) + ((Number)(this.surchargeToTotal))))).toFixed(2));
        this.totalValue = this.totalFormGroup.get('valueTotal')?.value;
      }
      console.log("ccccccc: ",this.surchargeToTotal)
      this.sendPenalty()
    }
  }

  formmat() {
    if ((!isNaN(parseFloat(this.penaltyToTotal))) || (!isNaN(parseFloat(this.taxAmountToTotal))) || (!isNaN(parseFloat(this.surchargeToTotal)))) {
      const input = this.totalFormGroup.get('valueTotal')?.value;
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(input);
      this.totalFormGroup.get('valueTotal')?.setValue(formatted, { emitEvent: false });
    } else {
      this.totalFormGroup.get('valueTotal')?.setValue('', { emitEvent: false });
    }
  }

  setToRaw(): void {
    if (this.totalFormGroup.get('valueTotal')?.value) {
      const value = parseFloat(this.totalFormGroup.get('valueTotal')?.value.replace(/,/g, ''));
      if (!isNaN(value)) {
        this.totalValue = value;
        this.totalFormGroup.get('valueTotal')?.setValue(value, { emitEvent: false });
      }
    } else {
      this.totalValue = null;
      this.totalFormGroup.get('valueTotal')?.setValue(null, { emitEvent: false });
    }
  }

  sendPenalty() {
    this.sentTotal.emit(this.totalValue);
  }



}
