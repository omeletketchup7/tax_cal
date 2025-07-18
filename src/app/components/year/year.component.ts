import { Component,  EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrl: './year.component.css'
})
export class YearComponent implements OnInit {

  @Output() sentYear = new EventEmitter<any>();

  years: { label: string, value: number }[] = [];

  yearFormGroup = new FormGroup ({
    year: new FormControl(null)
  })

  ngOnInit(): void {
    const thisYear = new Date().getFullYear();
    const startYear = 2020;
    for (let year = thisYear; year >= startYear; year--) {
      this.years.push({ label:`${year}`,value:year });
    }
    this.yearFormGroup.get('year')?.valueChanges.subscribe(() => {
      this.sendYear();
    });
  }

  sendYear() {
    this.sentYear.emit(this.yearFormGroup.get('year')?.value);
  }

}
