import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// Services
import { AnouncesService } from '../../services/anounces.service';
import { annouceModel } from '../../models/annouce/annouce.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(private anouceService : AnouncesService, router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    const nameAnounce = form.value["anounce-name"];
    const categoryAnounce = form.value["announce-category"];
    const descriptionAnounce = form.value["announce-description"];
    const priceAnounce = form.value["announce-price"];
    const myNewAnnounce : annouceModel  = {
      name: nameAnounce,
      category: categoryAnounce,
      description: descriptionAnounce,
      price: priceAnounce,
    }
    this.anouceService.addItem(myNewAnnounce)

  }

}
