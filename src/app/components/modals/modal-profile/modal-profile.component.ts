import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadImgService } from 'src/app/services/uploads/upload-img.service';

@Component({
  selector: 'lbl-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss'],
})
export class ModalProfileComponent implements OnInit {
  public updateForm!: FormGroup;
  @Input() profileData: any;
  @Input() modalUpdateProfile!: boolean;
  @Output() modalUpdateEvent = new EventEmitter<boolean>();
  loading: boolean = false;
  file!: File;

  constructor(
    private uploadImgService: UploadImgService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.authService.form;
  }

  onChange(event: any) {
    this.file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const imageUrl = event.target!.result as string;

      const previewImage = document.getElementById(
        'previewImage'
      ) as HTMLImageElement;
      if (previewImage !== null) {
        previewImage.src = imageUrl;
      }
    };

    reader.readAsDataURL(this.file);
    this.onUpload();
    this.authService.isLoggedIn();
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
