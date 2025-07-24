import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ordinaryFiling = true;
  isFirstPage = true;
  readyToNext = false;
  selectMonth: string = '';
  selectYear: string = '';
  isWrongVAT = true;

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

  jsonToShow: any = [];

  years: { label: string, value: number }[] = [];

  additionCalForm = new FormGroup({
    value: new FormControl("ontime")
  })


  fromYear(value: any) {
    this.selectYear = value;
    if ((this.taxCalForm.get('saleAmount')?.value == null) || (this.taxCalForm.get('taxAmount')?.value == null) || (this.selectMonth == '' ||  this.selectMonth == 'undefined' || this.selectMonth == null) || (this.selectYear == '')) {
      this.readyToNext = false
    } else {
      this.readyToNext = true
    }
  }
  fromMonth(value: string) {
    this.selectMonth = String(this.allMonth.find(m => m.value === value)?.label);
    if ((this.taxCalForm.get('saleAmount')?.value == null) || (this.taxCalForm.get('taxAmount')?.value == null) || (this.selectMonth == '' ||  this.selectMonth == 'undefined' || this.selectMonth == null) || (this.selectYear == '')) {
      this.readyToNext = false
    } else {
      this.readyToNext = true
    }
  }
  fromRadio(value: boolean) {
    this.ordinaryFiling = value;
  }
  fromSaleAmount(value: any) {
    this.taxCalForm.get('saleAmount')?.setValue(value);
    if ((this.taxCalForm.get('saleAmount')?.value == null) || (this.taxCalForm.get('taxAmount')?.value == null) || (this.selectMonth == '' ||  this.selectMonth == 'undefined' || this.selectMonth == null) || (this.selectYear == '')) {
        this.readyToNext = false
      } else {
        this.readyToNext = true
      }
  }
  fromTaxAmount(value: any) {
    this.taxCalForm.get('taxAmount')?.setValue(value);
    if ((this.taxCalForm.get('saleAmount')?.value == null) || (this.taxCalForm.get('taxAmount')?.value == null) || (this.selectMonth == '' ||  this.selectMonth == 'undefined' || this.selectMonth == null) || (this.selectYear == '')) {
        this.readyToNext = false
      } else {
        this.readyToNext = true
      }
  }
  fromPenalty(value: any) {
    this.taxAdditionCalForm.get('penalty')?.setValue(value);
  }
  fromSurcharge(value: any) {
    this.taxAdditionCalForm.get('surcharge')?.setValue(value);
    if ((this.taxCalForm.get('saleAmount')?.value == null) || (this.taxCalForm.get('taxAmount')?.value == null) || (this.selectMonth == '' ||  this.selectMonth == 'undefined' || this.selectMonth == null) || (this.selectYear == '')) {
        this.readyToNext = false
      } else {
        this.readyToNext = true
      }
  }
  fromTotal(value: any) {
    this.taxAdditionCalForm.get('total')?.setValue(value);
  }
  wrongVATfromTaxAmount(value: any) {
    this.isWrongVAT = (value);
  }

  nextToPage2() {
    this.isFirstPage = false
    if (this.ordinaryFiling) {
      this.jsonToShow = {
        ...this.taxCalForm.value
      }
    } else {
      this.jsonToShow = {
        ...this.taxCalForm.value,
        ...this.taxAdditionCalForm.value
      }
    }
  }

}
