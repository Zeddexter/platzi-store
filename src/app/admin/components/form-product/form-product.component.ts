import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {MyValidators} from './../../../utils/validators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProductsService} from './../../../core/services/products/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form:FormGroup;
  image$: Observable<any>;

  constructor(
    private formBuilder:FormBuilder,
    private ProductsService:ProductsService,
    private router:Router,
    private storage: AngularFireStorage
  ) { 
    this.builForm();
  }

  ngOnInit(): void {
  }

saveProduct(event:Event){
  event.preventDefault();
  if(this.form.valid){
    const product = this.form.value;
    this.ProductsService.createProduct(product)
    .subscribe((newProduct)=>{
      console.log(newProduct);
      this.router.navigate(['./admin/products']);
    });
  }
  // console.log(this.form.value);
}

uploadFile(event){
  const file = event.target.files[0];
  const dir = 'images';
  const fileRef = this.storage.ref(dir);
  const task = this.storage.upload(dir,file);
  task.snapshotChanges()
  .pipe(
    finalize(()=> {
      this.image$ = fileRef.getDownloadURL();
      this.image$.subscribe(url=>{
        console.log(url);
        this.form.get('image').setValue(url);
      });
    })
  )
  .subscribe();
}

  private builForm(){
    this.form = this.formBuilder.group({
      id:['',[Validators.required]],
      title:['',[Validators.required]],
      price:['',[Validators.required, MyValidators.isPriceValid]],
      image:'',
      description:['',[Validators.required]],
    });
  }
  get priceField(){
    return this.form.get('price');
  }
}
