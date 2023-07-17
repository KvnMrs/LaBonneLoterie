import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  showSubmitMessage!: boolean;
  showErrorMessage!: boolean;
  public shortLinks: Array<string> = [];
  loading: boolean = false;
  file!: File;
  formAnnounce!: FormGroup;

  public categorys = [
    { id: 1, name: 'Vêtement' },
    { id: 2, name: 'Véhicule' },
    { id: 3, name: 'Multimédia' },
    { id: 4, name: 'Décoration' },
    { id: 5, name: 'Electomenager' },
    { id: 6, name: 'Jardin' },
  ];

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
      this.shortLinks.push(this.file.name);
      return this.uploadImgService.uploadAnnounceImg(this.file);
    }
  }

  async onSubmit() {
    const data = this.formAnnounce.value;
    // IF a value missing, show error message
    if (data.title === '' || data.description === '') {
      this.showErrorMessage = true;
      return;
    }
    // ELSE validate the new announce & show submit message
    else {
      const urlImg = await this.onUpload();
      data.img_url = urlImg;
      this.annoucesService.addAnnounce(data).then(() => {
        this.formAnnounce.reset();
        this.router.navigate(['/recapitulatif-annonce']);
        this.showErrorMessage = false;
        this.showSubmitMessage = true;
      });
      this.loading = false;
    }
  }
}
