import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {DomainService} from "../table/domain.service";

// import {AuthUserDto} from "../profile/profile.component";

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  itemId: number;
  itemName: string;
  tableData: User[] = [
    {id: 1, name: 'User 1'},
    {id: 2, name: 'User 2'},
    {id: 3, name: 'User 3'}
  ];

  newRowForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  selectedRow: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private domainService: DomainService
  ) {
    this.itemId = 0;
    this.itemName = '';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = Number(params['id']);
      // Fetch users and media files for the itemId from the API or any other data source
    });

    // this.domainService.currentDomainName.subscribe(domainName => this.itemName = domainName);
  }

  addRow() {
    if (this.newRowForm.valid) {
      const newId = this.tableData.length > 0 ? this.tableData[this.tableData.length - 1].id + 1 : 1;
      this.tableData.push({id: newId, name: this.newRowForm.value.name});
      this.newRowForm.reset();
    }
  }

  deleteRow(row: User) {
    const index = this.tableData.findIndex(item => item.id === row.id);
    if (index !== -1) {
      this.tableData.splice(index, 1);
      if (this.selectedRow === row) {
        this.selectedRow = null;
      }
    }
  }

  editRow(row: User) {
    this.selectedRow = {...row};
  }

  saveRow() {
    if (this.selectedRow) {
      const index = this.tableData.findIndex(item => item.id === this.selectedRow!.id);
      if (index !== -1) {
        this.tableData[index] = {...this.selectedRow};
        this.selectedRow = null;
      }
    }
  }

  cancelEdit() {
    this.selectedRow = null;
  }
}
