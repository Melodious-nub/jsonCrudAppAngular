import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JsonCrudApp';
  post:any = []

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getAllProduct();
  }

  onSubmit(postForm: any) {
    if(postForm.valid){
      this.api.postProduct(postForm.value).subscribe(
        {next:(res)=>{
        alert("Prodect Added successfully");
        postForm.reset();
      },error:()=>{
        alert("errror while adding the product")
      }
    })
    }}

    getAllProduct(){
      this.api.getProduct().subscribe(
        {next:(res)=>{
          console.log(res);
        this.post = res;
      },error:()=>{
        alert("errror while fetching the product")
      }
    })
    }

}
