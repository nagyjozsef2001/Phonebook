import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  enteredText:string=''; //containcs the text entered in the input field

  @Output()
  searchTextChanged: EventEmitter<string>= new EventEmitter<string>();

  @Output() 
  searchSelected: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged(){ //emitting a signal with the input text
    this.searchTextChanged.emit(this.enteredText);
  }

  onSearchChange(radioInput: string){ //emiting the signal for the corresponding type of search
    this.searchSelected.emit(radioInput);
  }
}

