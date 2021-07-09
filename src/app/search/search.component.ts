import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() zipcode: string = '';
  validSearch = false;
  errorMessage = '';

  zipChange(): void {
    if (/^\d{5}(-\d{4})?$/.test(this.zipcode)) {
      this.validSearch = true;
    } else {
        this.validSearch = false;
    }
  }

  errorSearch(): void {
    this.errorMessage = 'Enter a 5 digit US zipcode to proceed.';
  }
}
