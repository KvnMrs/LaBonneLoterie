import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AnnouncesService } from '../../../services/announce/announces.service';
import { UploadImgService } from '../../../services/upload/upload-img.service';
import { AuthService } from 'src/app/services/auth/auth.service';
// Models
import { User } from 'firebase/auth';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | null = null;
  public createAnnounceForm!: FormGroup;
  public selectedImgs: Array<File | null> = [];
  public announceData: null = null;
  public file: File | null = null;
  public showErrorMessage = false;
  private currentUser: User | null = null;

  public categorys = [
    { id: 1, name: 'Vêtement' },
    { id: 2, name: 'Véhicule' },
    { id: 3, name: 'Multimédia' },
    { id: 4, name: 'Décoration' },
    { id: 5, name: 'Electroménager' },
    { id: 6, name: 'Jardin' },
    { id: 7, name: 'Sport' },
    { id: 8, name: 'Loisir' },
  ];

  constructor(
    private annoucesService: AnnouncesService,
    private uploadImgService: UploadImgService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initCreateAnnounceForm();
    this.authService.userDataSubject.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Erreur récupération utilisateur.', error);
      },
    });
  }

  initCreateAnnounceForm() {
    this.createAnnounceForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      tags: new FormControl([], Validators.required),
      description: new FormControl('', Validators.required),
      imgsAnnounce: new FormControl([], Validators.required),
      estimate: new FormControl(0, Validators.required),
      ticketPrice: new FormControl(0, Validators.required),
      minTickets: new FormControl(0, Validators.required),
      maxTickets: new FormControl(0, Validators.required),
      currentTickets: new FormControl(0, Validators.required),
      endAt: new FormControl(new Date(), Validators.required),
      endHour: new FormControl(0, Validators.required),
    });
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
    this.uploadImgService.showImgBeforeUpload(this.file!);
  }

  // Show picture announce before its upload.
  async onPrepareUploadImg(): Promise<void> {
    this.selectedImgs.push(this.file);
    this.file = null;
    this.createAnnounceForm.value.imgsAnnounce = '';
    this.fileInput!.nativeElement.value = null;
  }

  removeShortLink(index: number): void {
    if (index >= 0 && index < this.selectedImgs.length) {
      this.selectedImgs.splice(index, 1);
    }
  }

  getTimeStampFromSelectedTime(time: string) {
    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      const timestamp = date.getTime();
      return timestamp;
    } else {
      return null;
    }
  }

  async onSubmit() {
    let imgsAnnounceUrl: Array<string> = [];
    let announceData = this.createAnnounceForm.value;
    announceData.endHour = this.getTimeStampFromSelectedTime(
      announceData.endHour
    );
    if (!announceData) return;
    if (announceData.title === '' || announceData.description === '') {
      this.showErrorMessage = true;
      return;
    } else {
      try {
        // Download urls of selected imgs.
        await Promise.all(
          this.selectedImgs.map(async (file) => {
            const urlImg = await this.uploadImgService.uploadAnnounceImg(file!);
            imgsAnnounceUrl.push(urlImg);
          })
        );

        if (!this.currentUser) throw Error;
        // Define new values from the futur new announce document
        announceData = {
          ...announceData,
          imgsAnnounce: imgsAnnounceUrl,
          authorUid: this.currentUser.uid,
        };
        this.annoucesService.emitAnnounceData(announceData); // emit announceData for summary page.
        // this.createAnnounceForm.reset();
        this.router.navigate(['/recapitulatif-annonce']);
        this.showErrorMessage = false;
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  }
}
