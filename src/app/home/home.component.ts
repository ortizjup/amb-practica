import { Component, OnInit, ViewChild } from '@angular/core';
import { AutoServicioService } from '../servicios/auto-servicio.service';
import { Iauto } from '../modelos/iauto';
import { Subscription } from 'rxjs';
import { EditarAlumnoPopUpComponent } from '../editar-alumno-pop-up/editar-alumno-pop-up.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private suscription: Subscription = new Subscription();
  
  @ViewChild(EditarAlumnoPopUpComponent) editarAlumnoComponent!: EditarAlumnoPopUpComponent;
  
  items!: Iauto[];
  show = false;

  constructor(private autoService: AutoServicioService) {}

  ngOnInit(): void {
    this.loadGrid();
  }

  loadGrid() : void {
    this.suscription.add(this.autoService.getAutos().subscribe({
      next: (resultado) => { this.items = resultado },
      error: (r) => (r.status)
    }));
  }

  edit(auto: Iauto) {
    this.editarAlumnoComponent.setup(auto);
  }

  delete(id: number) : void {
    this.suscription.add(this.autoService.deleteAuto(id).subscribe({
      next: () => this.loadGrid(),
      error: (r) => (r.status)
    }));
  }

  save(auto: Iauto) {
      this.show = !this.show;
      if(auto.id){
        this.suscription.add(this.autoService.updateAuto(auto).subscribe({
          next: () => this.loadGrid(),
          error: (r) => (r.status) 
        })); 
      }else{
        this.suscription.add(this.autoService.addAuto(auto).subscribe({
          next: () => this.loadGrid(),
          error: (r) => (r.status)
        }));
      }
  }

  showComponent(){
    this.show = !this.show;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
