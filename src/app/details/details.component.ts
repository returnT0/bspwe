import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  id: number;
  name: string;
}

interface MediaFile {
  id: number;
  name: string;
  file: File | null;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  itemId: number;
  users: User[] = [];
  mediaFiles: MediaFile[] = [];
  newUser: User = { id: 0, name: '' };
  newMediaFile: MediaFile = { id: 0, name: '', file: null };
  selectedUser: User | null = null;
  selectedMediaFile: MediaFile | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.itemId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = Number(params['id']);
      // Fetch users and media files for the itemId from the API or any other data source
      this.fetchUsers();
      this.fetchMediaFiles();
    });
  }

  fetchUsers() {
    // Replace with actual API call to fetch users for the itemId
    // Example code to simulate fetching users
    this.users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' }
    ];
  }

  fetchMediaFiles() {
    // Replace with actual API call to fetch media files for the itemId
    // Example code to simulate fetching media files
    this.mediaFiles = [
      { id: 1, name: 'File 1', file: null },
      { id: 2, name: 'File 2', file: null },
      { id: 3, name: 'File 3', file: null }
    ];
  }

  addUser() {
    if (this.newUser.name.trim() === '') {
      return; // Prevent adding a user with a blank name
    }

    const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    this.users.push({ id: newId, name: this.newUser.name });
    this.newUser = { id: 0, name: '' };
  }

  deleteUser(userId: number) {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      if (this.selectedUser && this.selectedUser.id === userId) {
        this.selectedUser = null;
      }
    }
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
  }

  saveUser() {
    if (this.selectedUser) {
      const index = this.users.findIndex(user => user.id === this.selectedUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser };
        this.selectedUser = null;
      }
    }
  }

  cancelUserEdit() {
    this.selectedUser = null;
  }

  addMediaFile() {
    if (this.newMediaFile.name.trim() === '' || this.newMediaFile.file === null) {
      return; // Prevent adding a media file with a blank name or without a file
    }

    const newId = this.mediaFiles.length > 0 ? this.mediaFiles[this.mediaFiles.length - 1].id + 1 : 1;
    this.mediaFiles.push({ id: newId, name: this.newMediaFile.name, file: this.newMediaFile.file });
    this.newMediaFile = { id: 0, name: '', file: null };
  }

  deleteMediaFile(fileId: number) {
    const index = this.mediaFiles.findIndex(file => file.id === fileId);
    if (index !== -1) {
      this.mediaFiles.splice(index, 1);
      if (this.selectedMediaFile && this.selectedMediaFile.id === fileId) {
        this.selectedMediaFile = null;
      }
    }
  }

  editMediaFile(file: MediaFile) {
    this.selectedMediaFile = { ...file };
  }

  saveMediaFile() {
    if (this.selectedMediaFile) {
      const index = this.mediaFiles.findIndex(file => file.id === this.selectedMediaFile!.id);
      if (index !== -1) {
        this.mediaFiles[index] = { ...this.selectedMediaFile };
        this.selectedMediaFile = null;
      }
    }
  }

  cancelMediaFileEdit() {
    this.selectedMediaFile = null;
  }

  handleFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.newMediaFile.file = fileList[0];
    }
  }
}
