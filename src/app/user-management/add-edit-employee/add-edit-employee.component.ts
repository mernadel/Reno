import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApisService } from 'src/app/apis.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  userGroups: string[] = ['Office', 'Managers', 'Head Office'];
  profileStatus: string[] = ['Active', 'Inactive', 'Locked'];

  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _apis: ApisService,
    private _dialoug: DialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this._formBuilder.group({
      id: '',
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userGroup: [''],
      assignProfile: [''],
      creationDate: [new Date()],
    });
  }

  submitForm() {
    if (this.data) {
      if (this.employeeForm.valid) {
        const formValueWithDate = {
          ...this.employeeForm.value,
          creationDate: new Date(),
        };

        this._apis
          .editSelectedItem(this.employeeForm.value)
          .subscribe((res) => {
            this.data = res;
            this._dialoug.close();
            window.location.reload();
          });
      }
    } else {
      if (this.employeeForm.valid) {
        const formValueWithDate = {
          ...this.employeeForm.value,
          creationDate: new Date(),
        };

        this._apis.newEmployee(formValueWithDate).subscribe(() => {
          this._dialoug.close();

          window.location.reload();
        });
      }
    }
  }

  resetFields() {
    this.employeeForm.reset();
  }
}
