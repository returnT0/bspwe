import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../serivce/auth.service";
import {CreateDomainDto, DomainService} from "../serivce/domain/domain.service";

@Component({
  selector: 'app-table',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  tableData: Domain[] = [];
  selectedRow: Domain | null = null;

  newRowForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private domainService: DomainService) {}

  ngOnInit(): void {
    this.domainService.getAll()
                      .subscribe({
                        next: value => this.tableData = value,
                        error: err =>  console.error(err)
                      })
  }

  addRow() {
    if (this.newRowForm.valid) {
      const dto: CreateDomainDto = {
        domainName: this.newRowForm.value.name
      };
      this.domainService.addDomain(dto)
                        .subscribe({
                          next: value => this.tableData = value,
                          error: err => console.error(err)
                        })
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
