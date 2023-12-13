import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  constructor(private _dialoug: MatDialog) {}
  openDialoug() {
    this._dialoug.open(AddEditEmployeeComponent);
  }
}
