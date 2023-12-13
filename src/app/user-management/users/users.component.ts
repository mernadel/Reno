import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApisService } from 'src/app/apis.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  employeesList: any[];
  //filter

  searchValue: string = '';
  userNameFilter: string = '';
  statusFilter: string = 'Any';
  dateFilter: Date;
  selectedItems: any;
  items: any;

  constructor(private _apis: ApisService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllEmployee();
    this.editSelectedItem();
  }
  getAllEmployee() {
    this._apis.getAllEmployee().subscribe((res) => {
      this.employeesList = res;
      this.dataSource = new MatTableDataSource(res);
      this.applyFilters();
    });
  }

  //table
  displayedColumns: string[] = [
    'select',
    'name',
    'username',
    'email',
    'group',
    'status',
    'created',
  ];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selectedItemCount = 0;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      if (this.dataSource) {
        this.selection.select(...this.dataSource.data);
      }
    }
    this.updateSelectedItemCount();
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    this.updateSelectedItemCount();
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  updateSelectedItemCount() {
    this.selectedItemCount = this.selection.selected.length;
  }
  //delete items
  deleteSelectedItems() {
    const selectedItems = this.selection.selected;

    if (selectedItems.length === 0) {
      return;
    }

    this._apis.deleteSelectedItems(selectedItems).subscribe(() => {
      window.location.reload();
    });
  }

  //edit items
  editSelectedItem() {
    const selectedItem = this.selection.selected[0];

    if (!selectedItem) {
      return;
    }

    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data: selectedItem,
    });
    let index = this.employeesList.findIndex(
      (obj) => obj.id === selectedItem.id
    );
    if (index !== -1) {
      this.employeesList[index] = selectedItem;
    }
    dialogRef.afterClosed().subscribe((result) => {
      let index = this.employeesList.findIndex(
        (obj) => obj.id === selectedItem.id
      );
      if (index !== -1) {
        this.employeesList[index] = selectedItem;
      }
    });
  }

  //filter
  applyFilters() {
    let filteredData = this.employeesList;

    // Filter by search value
    filteredData = filteredData.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value
            .toString()
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
      )
    );

    // Filter by user name
    if (this.userNameFilter) {
      filteredData = filteredData.filter(
        (item) =>
          item.userName &&
          item.userName
            .toLowerCase()
            .includes(this.userNameFilter.toLowerCase())
      );
    }

    // Filter by status
    if (this.statusFilter !== 'Any') {
      filteredData = filteredData.filter(
        (item) => item.userGroup === this.statusFilter
      );
    }

    // Filter by date
    if (this.dateFilter) {
      filteredData = filteredData.filter(
        (item) =>
          new Date(item.creationDate).toDateString() ===
          this.dateFilter.toDateString()
      );
    }

    this.dataSource = new MatTableDataSource(filteredData);
  }
}
