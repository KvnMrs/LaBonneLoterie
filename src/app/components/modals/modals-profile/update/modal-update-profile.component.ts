import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { IUser } from 'src/app/models/user/user.model';
import { UploadImgService } from 'src/app/services/upload/upload-img.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'lbl-modal-update-profile',
  templateUrl: './modal-update-profile.component.html',
  styleUrls: ['./modal-update-profile.component.scss'],
})
export class ModalUpdateProfileComponent implements OnInit {
  public updateProfileForm!: FormGroup;
  @Input() userData: IUser | null = null;
  @Output() modalUpdateEvent = new EventEmitter<IUser>();
  loading: boolean = false;
  file: File | null = null;

  constructor(
    private uploadImgService: UploadImgService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initUpdateProfileForm();
  }

  initUpdateProfileForm() {
    this.updateProfileForm = new FormGroup({
      email: new FormControl(this.userData?.email, [
        Validators.required,
        Validators.email,
      ]),
      firstname: new FormControl(this.userData?.firstname, Validators.required),
      lastname: new FormControl(this.userData?.lastname, Validators.required),
      city: new FormControl(this.userData?.city, Validators.required),
      phone: new FormControl(this.userData?.phone, Validators.required),
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    if (!this.file) return console.error('this.file', this.file);
    const reader = new FileReader();
    reader.onload = function (event) {
      if (!event.target) return console.error('event.target', event.target);
      const imageUrl = event.target.result as string;
      const previewImage = document.getElementById(
        'previewImage'
      ) as HTMLImageElement;
      if (previewImage !== null) {
        previewImage.src = imageUrl;
      }
    };
    reader.readAsDataURL(this.file);
  }

  async onUpload() {
    if (!this.file) return;
    else {
      this.loading = !this.loading;
      const createImgURL = await this.uploadImgService.uploadProfileImg(
        this.file
      );
      this.file = null;
      return createImgURL;
    }
  }

  async onUpdateUserProfile(): Promise<void> {
    if (!this.userData) return console.error('this.userData', this.userData);
    const uid = this.userData.uid;
    const profileImgURL = await this.onUpload();
    if (profileImgURL) {
      this.userData.imgProfile = profileImgURL;
    }
    const dataToUpdate = {
      ...this.userData,
      ...this.updateProfileForm.value,
    };
    await this.userService.upadteUserProfile(dataToUpdate);
    if (!uid) return console.error('uid:', uid);
    await this.userService
      .getUserByID(uid)
      .then(
        (data) => (
          (this.userData = data),
          this.modalUpdateEvent.emit(this.userData as IUser),
          this.updateProfileForm.reset()
        )
      );
  }
}
