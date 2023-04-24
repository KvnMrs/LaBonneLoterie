import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AnnouncesService } from '../../services/announces/announces.service';
// Models
import { UploadImgService } from '../../services/uploads/upload-img.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.scss'],
})
export class AddAnnounceComponent implements OnInit {
  // variable triggers message, submit or error
  showSubmitMessage!: boolean;
  showErrorMessage!: boolean;
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file
  public formAnnounce!: UntypedFormGroup;

  constructor(
    public annoucesService: AnnouncesService,
    public router: Router,
    private uploadImgService: UploadImgService
  ) {}

  ngOnInit(): void {
    this.formAnnounce = this.annoucesService.form;
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  async onUpload() {
    if (!this.file) return;
    else {
      this.loading = !this.loading;
      return this.uploadImgService.uploadAnnounceImg(this.file);
    }
  }

  async onSubmit() {
    this.router.navigate(['/recapitulatif-annonce']);

    // const data = this.formAnnounce.value;
    // // IF a value missing, show error message
    // if (data.name == '' || data.description == '') {
    //   this.showErrorMessage = true;
    //   return;
    // }
    // ELSE validate the new announce & show submit message
    // else {
    //   const urlImg = await this.onUpload();
    //   data.img_url = urlImg;
    //   this.annoucesService.addAnnounce(data).then((res) => {
    //     this.formAnnounce.reset();
    //     this.router.navigate(['/recapitulatif-annonce']);
    //     this.showErrorMessage = false;
    //     this.showSubmitMessage = true;
    //   });
    //   this.loading = false;
    // }
  }
}
