import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelector = new EventEmitter<string>();

  collapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.featureSelector.emit(feature);
  }
}
