import {Component, OnInit,ViewChild} from '@angular/core';
import {DialogueComponent} from "./dialogue/dialogue.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "./Services/api.service";
import Swal from "sweetalert2";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','comments','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getAllProducts();
  }

  title = 'crudEnjoy';
  constructor(private dialog:MatDialog,private api:ApiService) {
  }
  openDialog() {
    this.dialog.open(DialogueComponent, {
      width:'30%',
      height:'80%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts()
      }
    })
  }

  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        Swal.fire('error while fetching')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(DialogueComponent,{
      width:'30%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts()
      }
    })
  }

  deletetheProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        Swal.fire('deleted successfully');
        this.getAllProducts()
      },
      error:()=>{
        Swal.fire('error while deleting');
      }
    })
  }

}
