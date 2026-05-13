import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductCreate } from '../../Models/product-create';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
  product: ProductCreate = {
    name: '',
    price: 0,
    stock: 0
  };
  private http = inject(HttpClient);
  private router = inject(Router);
  res: any;
  add() {
    console.log(this.product);
    this.http.post('https://ecartapi-c9hcd2aze9bghmbv.centralus-01.azurewebsites.net/api/Product/Add', this.product).subscribe((response) => {
      console.log(response);
    }, (err) => console.log(err));
    this.router.navigateByUrl('/view');
  }
}
