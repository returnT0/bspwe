import {Component, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from "../serivce/auth.service";
import {CreateDomainDto, DomainService} from "../serivce/domain/domain.service";

function domainNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  const isValid = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.+(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/.test(value);
  return isValid ? null : { domainName: { valid: false }};
}

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  @Output()
  tableData: Domain[] = [];

  selectedRow: Domain | null = null;

  newRowForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, domainNameValidator])
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private domainService: DomainService) {}

  ngOnInit(): void {
    this.domainService.getAll()
      .pipe(switchMap(value => this.tableData = value))
      .subscribe();
  }

  isDomainNameInvalid() {
    const domainNameField = this.newRowForm.get('name');
    return domainNameField?.invalid && (domainNameField?.touched || domainNameField?.dirty);
  }

  addRow() {
    if (this.newRowForm.valid) {
      const dto: CreateDomainDto = {
        domainName: this.newRowForm.value.name
      };
      this.domainService.addDomain(dto)
        .pipe(switchMap(value => this.tableData = value))
        .subscribe();
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
