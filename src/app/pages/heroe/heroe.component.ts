import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();


  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ){

      this.heroesService.getHeroe( id )
                        .subscribe(( resp: HeroeModel ) => {

                          this.heroe = resp;
                          this.heroe.id = id;

                        });
     }
  }


  guardar( form: NgForm ){

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    });

    if ( form.invalid ){
      // console.log("Formulario inválido");
      Toast.fire({
        icon: 'error',
        title: "Formulario inválido"
      });
      return;
    }
    // console.log(form);
    // console.log(this.heroe);

    Swal.fire({
      icon: 'info',
      title: 'Guardando',
      text: 'Espere por favor...',
      timer: 3000,
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ){
      peticion = this.heroesService.updateHero( this.heroe );
      // .subscribe( resp => {
      //   console.log(resp);
      //   Toast.fire({
      //     icon: 'success',
      //     title: 'Updated!'
      //   });

      // });
    }else{
      peticion = this.heroesService.createHero( this.heroe );
      //                 .subscribe( resp => {
      //                   console.log(resp);
      //                 });

      // Toast.fire({
      //   icon: 'success',
      //   title: 'Created!'
      // });
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      })
    })

  }

}
