import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'app-chatwrap',
  templateUrl: './chatwrap.component.html',
  styleUrls: ['./chatwrap.component.css']
})
export class ChatwrapComponent implements OnInit {

  @ViewChild('sidediv') sidediv: ElementRef;

  isOpen: any;
  isLogged: boolean;

  constructor(private dashService: DashService) {
    this.isLogged = this.dashService.isLogged();
   }

  ngOnInit() {
  }

  chatdiv(divClass: HTMLInputElement) {
    console.log(this.sidediv.nativeElement.classList);
    this.isOpen = this.sidediv.nativeElement.classList;
    // this.sidediv.nativeElement.classList.add('black');
    if (this.isOpen.value === 'slide-in') {
      this.sidediv.nativeElement.setAttribute('class', 'slide-out');
    }else {
      this.sidediv.nativeElement.setAttribute('class', 'slide-in');
    }
    // this.sidediv.nativeElement.setAttribute('class', this.isOpen ? 'slide-out' : 'slide-in');
  }

}
