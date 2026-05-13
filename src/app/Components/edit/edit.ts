import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductUpdate } from '../../Models/product-update';
import { ChangeDetectorRef } from '@angular/core';
import { ProductRead } from '../../Models/product-read';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  id?: number = 0;
  stock: number = 0;
  productUpdate: ProductUpdate = {}
  product: ProductRead = {};
  name: string = '';
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    //read route parameter value
    this.activatedRoute.params.subscribe(param => this.name = param['name']);
    console.log(this.name);
    this.http.get<ProductUpdate>('https://ecartapi-c9hcd2aze9bghmbv.centralus-01.azurewebsites.net/api/Product/Search/' + this.name).subscribe(response => {
      this.product = response
      console.log(this.product);
      this.cd.detectChanges(); //force reload
    }, (err) => console.log(err))
  }
  edit() {
    this.productUpdate = {
      name: this.product.name,
      stock: this.stock,
      price: this.product.price
    }
    this.id = this.product.id;
    this.http.patch('https://ecartapi-c9hcd2aze9bghmbv.centralus-01.azurewebsites.net/api/Product/Edit?id=' + this.id, this.productUpdate).subscribe((response) => {
      console.log(response)
    })
  }
  delete() {
    this.http.delete('https://ecartapi-c9hcd2aze9bghmbv.centralus-01.azurewebsites.net/api/Product/Delete/' + this.id).subscribe((response) => {
      console.log(response)
    }, (error) => console.log(error))
  }

}
