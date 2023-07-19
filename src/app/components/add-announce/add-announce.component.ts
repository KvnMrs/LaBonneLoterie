import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AnnouncesService } from '../../services/announces/announces.service';
import { UploadImgService } from '../../services/uploads/upload-img.service';
// Models
import { IAnnounce } from 'src/app/models/annouce/annouce.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.scss'],
})
export class AddAnnounceComponent implements OnInit {
  showSubmitMessage!: boolean;
  showErrorMessage!: boolean;
  public selectedImgs: Array<File | null> = [];
  file!: File | null;
  createAnnounceForm!: FormGroup;

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
    this.initUpdateProfileForm();
  }

  initUpdateProfileForm() {
    this.createAnnounceForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      tags: new FormControl([''], Validators.required),
      description: new FormControl('', Validators.required),
      imgsAnnounce: new FormControl([], Validators.required),
      estimate: new FormControl(0, Validators.required),
      ticketPrice: new FormControl(0, Validators.required),
      minTickets: new FormControl(0, Validators.required),
      maxTickets: new FormControl(0, Validators.required),
      currentTickets: new FormControl(0, Validators.required),
    });
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
    this.uploadImgService.showImgBeforeUpload(this.file!);
  }

  // Show picture announce before upload.
  async onPrepareUploadImg(): Promise<void> {
    this.selectedImgs.push(this.file);
    this.file = null;
    this.createAnnounceForm.value.imgsAnnounce = '';
  }

  removeShortLink(index: number): void {
    if (index >= 0 && index < this.selectedImgs.length) {
      this.selectedImgs.splice(index, 1);
    }
  }

  async onSubmit() {
    let imgsAnnounceUrl: Array<string> = [];
    let announceData = this.createAnnounceForm.value as IAnnounce;
    if (announceData.title === '' || announceData.description === '') {
      this.showErrorMessage = true;
      return;
    } else {
      try {
        // Download url of selected imgs.
        await Promise.all(
          this.selectedImgs.map(async (file) => {
            const urlImg = await this.uploadImgService.uploadAnnounceImg(file!);
            imgsAnnounceUrl.push(urlImg);
          })
        );
        announceData = {
          ...announceData,
          imgsAnnounce: imgsAnnounceUrl,
        } as IAnnounce;
        await this.annoucesService.addAnnounce(announceData);
        this.createAnnounceForm.reset();
        this.router.navigate(['/recapitulatif-annonce']);
        this.showErrorMessage = false;
        this.showSubmitMessage = true;
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  }
}
