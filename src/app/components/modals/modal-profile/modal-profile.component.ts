import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadImgService } from 'src/app/services/uploads/upload-img.service';

@Component({
  selector: 'lbl-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss'],
})
export class ModalProfileComponent implements OnInit {
  @Input() profileData: any;
  @Input() modalUpdateProfile!: boolean;
  @Output() modalUpdateEvent = new EventEmitter<boolean>();
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file

  constructor(private uploadImgService: UploadImgService) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
    this.onUpload();
  }

  async onUpload() {
    if (!this.file) return;
    else {
      this.loading = !this.loading;
      await this.uploadImgService.uploadProfileImg(this.file, this.profileData);
      return this.modalUpdateFunction();
    }
  }

  modalUpdateFunction() {
    this.modalUpdateEvent.emit(this.modalUpdateProfile);
  }
}
