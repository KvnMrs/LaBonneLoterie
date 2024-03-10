import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  private currentUser$: Subscription;
  private currentUser: User | null = null;
  announceCategories = Object.values(AnnounceCategories);
  createAnnounceForm: FormGroup;
  selectedImgs: Array<File | null> = [];
  announceData: IAnnounce;
  file: File | null = null;
  showErrorMessage = false;

  constructor(
    private announcesService: AnnouncesService,
    private uploadImgService: UploadImgService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initCreateAnnounceForm();
    this.currentUser$ = this.authService.userDataSubject.subscribe({
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
    if (this.createAnnounceForm.invalid || !this.currentUser || !this.selectedImgs[0]) {
      console.error('Error with form or user:')
      throw Error() 
    } else {
      try {
        const imgsAnnounceUrl: Array<string> = [];
        this.announceData  = this.createAnnounceForm.value;
        // Download urls of selected imgs.
        await Promise.all(
          this.selectedImgs.map(async (file) => {
            const urlImg = await this.uploadImgService.uploadAnnounceImg(file!);
            imgsAnnounceUrl.push(urlImg);
          })
        );
        this.announceData.imgsAnnounce = imgsAnnounceUrl 
        this.announceData.authorUid = this.currentUser.uid   
        this.announceData.endDate = new Date(this.announceData.endDate + 'T' + this.announceData.endHour)
        this.announcesService.emitAnnounceData(this.announceData); // emit announceData for summary page.
        this.router.navigate(['/recapitulatif-annonce']);
        this.showErrorMessage = false;
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  }

  ngOnDestroy(): void {
    this.currentUser$.unsubscribe();
  }
}
