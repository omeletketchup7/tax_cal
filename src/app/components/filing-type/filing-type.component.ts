import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-filing-type',
  templateUrl: './filing-type.component.html',
  styleUrl: './filing-type.component.css'
})
export class FilingTypeComponent implements OnInit {

  @Output() radioSent = new EventEmitter<boolean>();

  ordinaryFiling = true;

  ngOnInit(): void {
  }

  radioChange(value: boolean) {
    this.ordinaryFiling = value;
    this.sendValue();
  }


  sendValue() {
    this.radioSent.emit(this.ordinaryFiling);
  }
}