import { Component, OnInit } from '@angular/core';
import { UploadImgService } from '../../services/uploads/upload-img.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
})
export class UploadImgComponent implements OnInit {
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File | undefined; // Variable to store file

  // Inject service
  constructor(private uploadImgService: UploadImgService) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.uploadImgService.upload(this.file);
  }
}
