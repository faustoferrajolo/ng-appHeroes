import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {


  heroes: HeroeModel[] = [];
  loading = false;


  constructor( private heroesService: HeroesService) { }

  ngOnInit(){

    this.loading = true;
    this.heroesService.getHeroes()
                      .subscribe( resp => {
                        this.heroes = resp;
                        this.loading = false;
                       })

  }

  deleteHeroe( heroe: HeroeModel, index: number ){

    Swal.fire({
      title: 'Está seguro',
      text: `Está seguro qyue desea borrar a ${ heroe.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,

    }).then( resp => {
      if ( resp.value ){
        this.heroes.splice(index, 1);
        this.heroesService.deleteHero( heroe.id ).subscribe();
      }
    })



  }





}
