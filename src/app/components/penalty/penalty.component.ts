import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrl: './penalty.component.css'
})
export class PenaltyComponent implements OnInit {

  @Output() sentPenalty = new EventEmitter<any>();
  @Input() taxAmountFromParentToPenalty: any;

  value = 200.00;

  penaltyFormGroup = new FormGroup({
    valuePenalty: new FormControl()
  })

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taxAmountFromParentToPenalty']) {
      if (!((Number)(parseFloat(String(this.taxAmountFromParentToPenalty)).toFixed(2)) >= 0)) {
        this.penaltyFormGroup.get('valuePenalty')?.setValue(null);
      } else {
        this.penaltyFormGroup.get('valuePenalty')?.setValue(parseFloat(String(this.value)).toFixed(2));
      }
      this.sendPenalty();
    }
  }

  formmat() {
    if (this.penaltyFormGroup.get('valuePenalty')?.value) {
      const input = this.value;
      const decimalInput = (input);
      const InputFormmat = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(Number(decimalInput));
      this.penaltyFormGroup.get('valuePenalty')?.setValue(InputFormmat, { emitEvent: false });
    } else {
      this.penaltyFormGroup.get('valuePenalty')?.setValue('', { emitEvent: false });
    }
  }

  setToRaw(): void {
    if (this.penaltyFormGroup.get('valuePenalty')?.value) {
      const InputFormmat = this.penaltyFormGroup.get('valuePenalty')?.value;
      const rawData = InputFormmat.replace(/,/g, '');
      this.penaltyFormGroup.get('valuePenalty')?.setValue(rawData, { emitEvent: false });
    } else {
      this.penaltyFormGroup.get('valuePenalty')?.setValue('', { emitEvent: false });
    }
  }

  sendPenalty() {
    this.sentPenalty.emit(this.value);
  }

}
