import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductRead } from '../../Models/product-read';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-all',
  imports: [CommonModule],
  templateUrl: './view-all.html',
  styleUrl: './view-all.css',
})
export class ViewAll {
  products: ProductRead[] = [];
  //initiate HttpClient using DI
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  ngOnInit() {
    this.http.get<ProductRead[]>('https://ecartapi-c9hcd2aze9bghmbv.centralus-01.azurewebsites.net/api/Product/GetAll').subscribe(response => {
      this.products = response
      console.log(this.products);
      this.cd.detectChanges(); //force reload
    }, error => {
      console.log(error)
    })
  }
  delete(id?: number) {
    console.log(id);
    this.http.delete('http://localhost:5156/api/Product/Delete/' + id).subscribe((response) => {
      console.log(response)
    }, (error) => console.log(error))
    location.reload(); //reload the page
  }
  edit(name?: string) {
    this.router.navigateByUrl('/edit/' + name);
  }
  addNew() {
    this.router.navigateByUrl('/add');
  }
}
