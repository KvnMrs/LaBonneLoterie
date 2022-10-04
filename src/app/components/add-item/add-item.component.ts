import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AnnouncesService } from '../../services/announces/announces.service';
// Models
import { IAnnounce } from '../../models/annouce/annouce.model'
import { Console } from 'console';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  // variable triggers message, submit or error
  showSubmitMessage!: boolean;
  showErrorMessage!: boolean;
  public formAnnounce! : FormGroup;

  constructor(public annoucesService : AnnouncesService, router : Router) { }

  ngOnInit(): void {
    this.formAnnounce = this.annoucesService.form;
  }

  onSubmit() {
    // checking form value(s)
    const data = this.formAnnounce.value;
    console.log("data ---> ", data)

    // IF a value missing, show error message
    if( data.name == "" || data.description == '') {
       this.showErrorMessage = true
       return
    }
    // ELSE validate the new announce & show submit message
    else
    this.annoucesService.addAnnounce(data)
    .then(res => {
      this.showErrorMessage = false
      this.showSubmitMessage = true
    })
  }


}
