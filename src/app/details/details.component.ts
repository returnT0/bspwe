import { Component } from '@angular/core';

interface File {
  name: string;
  type: string;
}

interface Directory {
  name: string;
  open: boolean;
  files: File[];
  directories?: Directory[];
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  directories: Directory[] = [];

  toggleDirectory(directory: Directory): void {
    directory.open = !directory.open;
  }

  editDirectory(directory: Directory): void {
    const newName = prompt('Enter new name for the directory:');
    if (newName) {
      directory.name = newName;
    }
  }

  deleteDirectory(directory: Directory): void {
    const confirmation = confirm('Are you sure you want to delete this directory?');
    if (confirmation) {
      this.removeDirectory(directory, this.directories);
    }
  }

  removeDirectory(directory: Directory, directories: Directory[]): void {
    const index = directories.indexOf(directory);
    if (index !== -1) {
      directories.splice(index, 1);
    } else {
      for (const subDirectory of directories) {
        if (subDirectory.directories) {
          this.removeDirectory(directory, subDirectory.directories);
        }
      }
    }
  }

  addDirectory(parentDirectory?: Directory): void {
    const name = prompt('Enter name for the new directory:');
    if (name) {
      const newDirectory: Directory = {
        name: name,
        open: false,
        files: [],
        directories: []
      };

      if (parentDirectory) {
        if (!parentDirectory.directories) {
          parentDirectory.directories = [];
        }
        parentDirectory.directories.push(newDirectory);
      } else {
        this.directories.push(newDirectory);
      }
    }
  }


  addFile(directory: Directory): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*, audio/*, video/*';
    fileInput.addEventListener('change', (event: any) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        for (const file of files) {
          const newFile: File = {
            name: file.name,
            type: file.type
          };
          directory.files.push(newFile);
        }
      }
    });
    fileInput.click();
  }

  deleteFile(directory: Directory, file: File): void {
    const confirmation = confirm('Are you sure you want to delete this file?');
    if (confirmation) {
      const index = directory.files.indexOf(file);
      if (index !== -1) {
        directory.files.splice(index, 1);
      }
    }
  }

  downloadFile(directory: Directory, file: File): void {
    // Logic to download the file
    console.log('Downloading file:', directory.name + '/' + file.name);
  }
}
