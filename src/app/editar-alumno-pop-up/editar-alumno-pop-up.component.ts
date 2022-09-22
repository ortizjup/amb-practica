import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Iauto } from '../modelos/iauto';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-alumno-pop-up',
  templateUrl: './editar-alumno-pop-up.component.html',
  styleUrls: ['./editar-alumno-pop-up.component.css']
})

export class EditarAlumnoPopUpComponent implements OnInit {
  @Output()
  save: EventEmitter<Iauto> = new EventEmitter<Iauto>();

  auto = {} as Iauto;
  private subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {}

  setup(auto: Iauto) : void {
    console.log(auto);
    Object.assign(this.auto, auto);
  }

  saveAuto(f: NgForm){
    if(f.valid){
      this.save.emit(this.auto);
      Object.assign(this.auto, {});
      f.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
}
