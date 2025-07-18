import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ordinaryFiling = true;
  isFirstPage = true;
  selectMonth: string = '';
  selectYear: string = '';

  taxCalForm = new FormGroup({
    saleAmount: new FormControl(),
    taxAmount: new FormControl()
  });
  taxAdditionCalForm = new FormGroup({
    penalty: new FormControl(),
    surcharge: new FormControl(),
    total: new FormControl()
  });

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

  years: { label: string, value: number }[] = [];

  yearMonthFormGroup = new FormGroup({
    month: new FormControl(''),
    year: new FormControl('')
  })


  ngOnInit(): void {
    this.taxCalForm.get('saleAmount')?.valueChanges.subscribe(() => {
      console.log(this.taxCalForm.get('saleAmount')?.value)
    });
  }

  fromYear(value: any) {
    this.selectYear = value;
  }
  fromMonth(value: any) {
    this.selectMonth = value;
  }
  fromRadio(value: boolean) {
    this.ordinaryFiling = value;
  }
  fromSaleAmount(value: any) {
    this.taxCalForm.get('saleAmount')?.setValue(value);
  }
  fromTaxAmount(value: any) {
    this.taxCalForm.get('taxAmount')?.setValue(value);
  }
  fromPenalty(value: any) {
    this.taxAdditionCalForm.get('penalty')?.setValue(value);
  }
  fromSurcharge(value: any) {
    this.taxAdditionCalForm.get('surcharge')?.setValue(value);
  }
  fromTotal(value: any) {
    this.taxAdditionCalForm.get('total')?.setValue(value);
  }

  nextToPage2(){
    this.isFirstPage = false
  }
  nextToPage1(){
    this.isFirstPage = true
  }

}
