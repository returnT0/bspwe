import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface TableRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  tableData: TableRow[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  p: number = 1;

  newRowForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  selectedRow: TableRow | null = null;

  constructor(private router: Router) {}

  addRow() {
    if (this.newRowForm.valid) {
      const newId = this.tableData.length > 0 ? this.tableData[this.tableData.length - 1].id + 1 : 1;
      this.tableData.push({ id: newId, name: this.newRowForm.value.name });
      this.newRowForm.reset();
    }
  }

  deleteRow(row: TableRow) {
    const index = this.tableData.findIndex(item => item.id === row.id);
    if (index !== -1) {
      this.tableData.splice(index, 1);
      if (this.selectedRow === row) {
        this.selectedRow = null;
      }
    }
  }

  editRow(row: TableRow) {
    this.selectedRow = { ...row };
  }

  saveRow() {
    if (this.selectedRow) {
      const index = this.tableData.findIndex(item => item.id === this.selectedRow!.id);
      if (index !== -1) {
        this.tableData[index] = { ...this.selectedRow };
        this.selectedRow = null;
      }
    }
  }

  cancelEdit() {
    this.selectedRow = null;
  }

  openRow(row: TableRow) {
    this.router.navigate(['/element', row.id]);
  }
}
