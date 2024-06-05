import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: Pokemon | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeapiService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokeapiService.getPokemonDetails(name).subscribe(data => {
        this.pokemon = data;
      });
    }
  }

  getTypeClass(pokemon: Pokemon | null): string {
    if (!pokemon || !pokemon.types.length) {
      return '';
    }
    const primaryType = pokemon.types[0].type.name.toLowerCase();
    return primaryType;
  }
}

