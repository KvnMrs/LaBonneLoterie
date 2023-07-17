import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { IUser } from 'src/app/models/user/user.model';
import { UploadImgService } from 'src/app/services/uploads/upload-img.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'lbl-modal-update-profile',
  templateUrl: './modal-update-profile.component.html',
  styleUrls: ['./modal-update-profile.component.scss'],
})
export class ModalUpdateProfileComponent implements OnInit {
  public updateProfileForm!: FormGroup;
  @Input() profileData!: DocumentData;
  @Input() modalUpdateProfile!: boolean;
  @Output() modalUpdateEvent = new EventEmitter<DocumentData>();
  loading: boolean = false;
  file!: File;

  constructor(
    private uploadImgService: UploadImgService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initUpdateProfileForm();
  }

  initUpdateProfileForm() {
    this.updateProfileForm = new FormGroup({
      email: new FormControl(this.profileData['email'], [
        Validators.required,
        Validators.email,
      ]),
      firstname: new FormControl(
        this.profileData['firstname'],
        Validators.required
      ),
      lastname: new FormControl(
        this.profileData['lastname'],
        Validators.required
      ),
      city: new FormControl(this.profileData['city'], Validators.required),
      phone: new FormControl(this.profileData['phone'], Validators.required),
    });
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
  }

  async onUpload() {
    if (!this.file) return;
    else {
      this.loading = !this.loading;
      await this.uploadImgService.uploadProfileImg(
        this.file,
        this.profileData as IUser
      );
      // return this.modalUpdateFunction();
    }
  }

  async onUpdateUserProfile() {
    const uid = this.profileData['uid'];
    const memberSince = this.profileData['memberSince'];
    const dataToUpdate = { uid, ...this.updateProfileForm.value };
    await this.userService.upadteUserProfile(dataToUpdate);
    this.userService
      .getUserByID(uid)
      .then(
        (data) => (
          (this.profileData = { memberSince, ...(data as DocumentData) }),
          this.modalUpdateEvent.emit(this.profileData as DocumentData)
        )
      );
  }
}
