import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AnnouncesService } from '../../services/announces/announces.service';
// Models
import { UploadImgService } from '../../services/uploads/upload-img.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  // variable triggers message, submit or error
  showSubmitMessage!: boolean;
  showErrorMessage!: boolean;
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File | undefined; // Variable to store file
  public formAnnounce!: FormGroup;

  constructor(
    public annoucesService: AnnouncesService,
    router: Router,
    private uploadImgService: UploadImgService
  ) {}

  ngOnInit(): void {
    this.formAnnounce = this.annoucesService.form;
  }

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

  onSubmit() {
    // checking form value(s)
    const data = this.formAnnounce.value;
    console.log('data ---> ', data);

    // IF a value missing, show error message
    if (data.name == '' || data.description == '') {
      this.showErrorMessage = true;
      return;
    }
    // ELSE validate the new announce & show submit message
    else {
      this.onUpload();
      this.annoucesService.addAnnounce(data).then((res) => {
        this.showErrorMessage = false;
        this.showSubmitMessage = true;
      });
      this.loading = false;
    }
  }
}
