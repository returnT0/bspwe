import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../serivce/auth.service";
import {FileService, FileUploadDto} from "../serivce/ftp-element/file.service";
import {map, switchMap} from "rxjs";

export interface FolderElement {
  name: string;
  type: 'file' | 'folder';
  children?: FolderElement[];
  content?: File;
  isRenaming?: boolean;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  rootFolder: FolderElement =
    {
      name: 'root',
      type: 'folder',
      children: []
  };

  newFolderName: string = '';
  newName: string = '';
  currentFolder: FolderElement | null = this.rootFolder;
  currentPath: string[] = [];
  domainId?: number;

  downloadFileObject?: Blob;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.domainId = this.route.snapshot.params['id'];

    this.fileService.listDirectory('', this.domainId)
                    .pipe(map((value: FolderElement) => {
                      this.currentFolder = value;
                    })).subscribe()
  }

  navigateToFolder(folder: FolderElement): void {
    if (folder.type === 'folder') {
      this.currentPath.push(folder.name);
      this.currentFolder = folder;
    }
  }

  navigateUp(): void {
    if (this.currentPath.length > 0 && this.currentFolder) {
      this.currentPath.pop();
      this.currentFolder = this.getParentFolder(this.currentPath);
    }
  }

  getParentFolder(path: string[]): FolderElement | null {
    let currentFolder = this.rootFolder;
    for (const folderName of path) {
      const folder = currentFolder.children?.find(file => file.name === folderName);
      if (folder && folder.type === 'folder' && folder.children) {
        currentFolder = folder;
      } else {
        return null; // Invalid path
      }
    }
    return currentFolder;
  }

  addFolder(): void {
    if (this.currentFolder && this.newFolderName) {
      const isDuplicate = this.currentFolder.children?.some(child => child.name === this.newFolderName);
      if (!isDuplicate) {
        const newFolder: FolderElement = {
          name: this.newFolderName,
          type: 'folder',
          children: []
        };
        if (!this.currentFolder.children) {
          this.currentFolder.children = [];
        }
        this.currentFolder.children.push(newFolder);
        this.newFolderName = ''; // Clear the input field after adding the folder
        this.fileService.createDirectory(this.newFolderName, this.currentPath.join('/'), this.domainId)
                        .subscribe();
      } else {
        // Handle duplicate folder name error
        alert('A folder with the same name already exists.');
      }
    }
  }

  deleteFile(file: FolderElement): void {
    // this.fileService.deleteFile(file.name, this.currentFolder)
    if (this.currentFolder && this.currentFolder.children) {
      const index = this.currentFolder.children.findIndex(child => child.name === file.name && child.type === file.type);
      if (index !== -1) {
        this.currentFolder.children.splice(index, 1);
      }
      this.fileService.deleteFile(file.name, this.currentPath.join('/'), this.domainId);
    }
  }

  startRenaming(file: FolderElement): void {
    file.isRenaming = true;
    this.newName = file.name;
  }

  finishRenaming(file: FolderElement): void {
    if (this.newName.trim() && file.name !== this.newName) {
      const isDuplicate = this.currentFolder?.children?.some(child => child.name === this.newName);
      if (!isDuplicate) {
        file.name = this.newName;
      } else {
        // Handle duplicate file/folder name error
        alert('A file/folder with the same name already exists.');
      }
    }
    file.isRenaming = false;
  }

  downloadFile(file: FolderElement): void {
    this.fileService.downloadFile(file.name, this.currentPath.join('/'), this.domainId)
                    .pipe(map(data => {
                      if (file.type === 'file' && file.content) {
                        const url = window.URL.createObjectURL(data);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = file.name;
                        link.click();
                        window.URL.revokeObjectURL(url);
                      }
                    }));
  }

  getFileIconClass(file: FolderElement): string {
    return file.type === 'folder' ? 'folder-icon' : 'file-icon';
  }

  onFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file && this.currentFolder) {
      const isDuplicate = this.currentFolder.children?.some(child => child.name === file.name);
      if (!isDuplicate) {
        const newFile: FolderElement = {
          name: file.name,
          type: 'file',
          content: file
        };
        if (!this.currentFolder.children) {
          this.currentFolder.children = [];
        }
        const formData: FormData = new FormData();
        formData.append('file', file);

        const dto: FileUploadDto = {
          fileName: file.name,
          path: this.currentPath.join('/'),
          domainId: this.domainId,
          data: formData
        }
        this.fileService.uploadFile(dto).subscribe();
        this.currentFolder.children.push(newFile);
      } else {
        // Handle duplicate file name error
        alert('A file with the same name already exists.');
      }
    }
  }

  isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  private loadChildren() {
    this.fileService.listDirectory(this.currentPath.join('/'), this.domainId);
  }

}
