import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs/internal/observable/from';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JsonCrudApp';
  post:any = [];
  editValue:any = [];
  actionBtn = 'Save';

  @ViewChild('postForm')postForm!: NgForm; 

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getAllProduct();
  }

  onSubmit(postForm: NgForm) {
      if(postForm.valid){
        this.api.postProduct(postForm.value).subscribe(
          {next:(res)=>{
          alert("Prodect Added successfully");
          this.actionBtn;
          postForm.reset();
          this.getAllProduct();
        },error:()=>{
          alert("errror while adding the product")
        }
      })
      }}

  updateProduct() {
    this.api.putProduct(this.postForm.value, this.post.id).subscribe({
      next:(res)=>{
        alert("product updated");
        this.postForm.reset();
      }
    })
  }

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

    editProduct(data: any, id:number) {
      this.actionBtn = 'Update';

      // for populating data
      this.postForm.form.setValue(data);
       console.log(data);
    }

    deleteProduct(id: number) {
      this.api.deleteProduct(id).subscribe({next:(res)=>{
        console.log(res);
        alert("Prodect Deleted successfully");
        // for auto refresh api
        this.getAllProduct();    
      },error:()=>{
        alert("Error while deleting the product!!")
      }
    })
    }

}
