import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  date: Date;
  panelOpenState = false;
  // Persons: { name: string; avatar?: string }[] = [
  //   { name: 'Nader Amer', avatar: 'avatar1' },
  // ];

  constructor() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
