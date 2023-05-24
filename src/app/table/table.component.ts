import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../serivce/auth.service";
import {DomainService} from "./domain.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  tableData: Domain[] = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'}
  ];

  newRowForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  selectedRow: Domain | null = null;

  constructor(
    private router: Router,
    private domainService: DomainService,
    private authService: AuthService) {}

  selectRow(row: Domain) {
    this.domainService.changeDomainName(row.name);
    this.router.navigate(['/users', row.id]);
  }

  addRow() {
    if (this.newRowForm.valid) {
      const newId = this.tableData.length > 0 ? this.tableData[this.tableData.length - 1].id + 1 : 1;
      this.tableData.push({ id: newId, name: this.newRowForm.value.name });
      this.newRowForm.reset();
    }
  }

  deleteRow(row: Domain) {
    const index = this.tableData.findIndex(item => item.id === row.id);
    if (index !== -1) {
      this.tableData.splice(index, 1);
      if (this.selectedRow === row) {
        this.selectedRow = null;
      }
    }
  }

  isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

}

export interface Domain {
  id: number;
  name: string;
}
