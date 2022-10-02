import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AnnouncesService } from '../../services/announces/announces.service';
// Models
import { annouceModel } from '../../models/annouce/annouce.model'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(private annoucesService : AnnouncesService, router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    const nameAnounce = form.value["anounce-name"];
    const categoryAnounce = form.value["announce-category"];
    const descriptionAnounce = form.value["announce-description"];
    const priceAnounce = form.value["announce-price"];
    const myNewAnnounce : annouceModel  = {
      id : this.annoucesService.myAnnouces.length + 1,
      name: nameAnounce,
      category: categoryAnounce,
      description: descriptionAnounce,
      price: priceAnounce,
    }
    this.annoucesService.addItem(myNewAnnounce)

  }

}
