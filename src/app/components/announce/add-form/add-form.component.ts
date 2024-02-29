import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AnnouncesService } from '../../../services/announce/announces.service';
import { UploadImgService } from '../../../services/upload/upload-img.service';
import { AuthService } from 'src/app/services/auth/auth.service';
// Models
import { User } from 'firebase/auth';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnounceCategories } from 'src/app/shared/libs/enums/announces.enum';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | null = null;
  public announceCategories = Object.values(AnnounceCategories);
  public createAnnounceForm!: FormGroup;
  public selectedImgs: Array<File | null> = [];
  public announceData: null = null;
  public file: File | null = null;
  public showErrorMessage = false;
  private currentUser: User | null = null;


  constructor(
    private announcesService: AnnouncesService,
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
      endDate: new FormControl(new Date(), Validators.required),
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

  async onSubmit() {
    if (this.createAnnounceForm.invalid || !this.currentUser) {
      console.error('Error with form or user:')
      throw Error() 
    } else {
      try {
        const imgsAnnounceUrl: Array<string> = [];
        const announceData : IAnnounce  = this.createAnnounceForm.value;
        // Download urls of selected imgs.
        await Promise.all(
          this.selectedImgs.map(async (file) => {
            const urlImg = await this.uploadImgService.uploadAnnounceImg(file!);
            imgsAnnounceUrl.push(urlImg);
          })
        );
        if (!this.currentUser) throw Error;
        // Define new values from the futur new announce document
        announceData.imgsAnnounce = imgsAnnounceUrl 
        announceData.authorUid = this.currentUser.uid 
        this.announcesService.emitAnnounceData(announceData); // emit announceData for summary page.
        this.router.navigate(['/recapitulatif-annonce']);
        this.showErrorMessage = false;
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  }

  ngOnDestroy(): void {
    this.authService.userDataSubject.unsubscribe();
  }
}
