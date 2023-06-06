import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
import {ApiService} from "../Services/api.service";
import {MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent {


  freshnesslist=["brand new","second-hand","refurbished"]

  productForm!:FormGroup;
  actionbtn:string='save';
  heading:string='Add';

  constructor(@Inject(MAT_DIALOG_DATA) public editData:any,private formbuilder:FormBuilder,private api:ApiService,private dialogref:MatDialogRef<DialogueComponent>) {
  }

  ngOnInit() {
    this.productForm=this.formbuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comments:['',Validators.required],
      date:['',Validators.required],

    })

    if(this.editData){
      this.actionbtn='update';
      this.heading='Edit'
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProducts(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            Swal.fire("submitted succesfully ");
            console.log(this.productForm)
            this.productForm.reset();
            this.dialogref.close('save')
          },
          error:()=>{
            console.log(this.productForm);
            Swal.fire("cannot add products");
            this.productForm.reset();
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        Swal.fire('product updated successfully');
        this.productForm.reset();
        this.dialogref.close('update')
      },
      error:()=>{
        Swal.fire('error while updating data')
      }
    })
  }



}
