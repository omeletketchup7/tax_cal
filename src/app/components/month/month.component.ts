import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrl: './month.component.css'
})
export class MonthComponent implements OnInit {

  @Output() sentMonth = new EventEmitter<any>();
  @Input() year: any;

  monthToSelect: any = [];
  allMonth = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ];

  monthFormGroup = new FormGroup({
    month: new FormControl(null)
  })


  ngOnInit(): void {
    this.monthToSelect = [...this.allMonth];
    this.monthFormGroup.get('month')?.valueChanges.subscribe(() => {
      this.sendMonth();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year']) {
      this.monthToSelect = [];
      const thisYear = new Date().getFullYear();
      const thisMonth = new Date().getMonth();
      this.monthFormGroup.get('month')?.setValue(null);
      if ( thisYear == this.year){
        this.monthToSelect = this.allMonth.slice(0, thisMonth);
      }else {
        this.monthToSelect = [...this.allMonth];
      }
    }
  }

  sendMonth() {
    this.sentMonth.emit(this.monthFormGroup.get('month')?.value);
  }
}
