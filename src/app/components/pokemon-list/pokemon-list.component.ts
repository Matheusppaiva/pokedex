import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  displayedPokemonList: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.pokeapiService.getPokemonList().subscribe(data => {
      this.pokemonList = data;
      this.displayedPokemonList = this.pokemonList.slice(0, this.paginator?.pageSize || 20);
      this.dataSource = new MatTableDataSource(this.pokemonList);
    });
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedPokemonList = this.pokemonList.slice(startIndex, endIndex);
  }

  applyFilter(event: any): void {
    const value = (event?.target as HTMLInputElement | null)?.value;
    this.dataSource.filter = (value || '').trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  getPokemonId(url: string): number {
    const segments = url.split('/');
    return parseInt(segments[segments.length - 2]);
  }
}
