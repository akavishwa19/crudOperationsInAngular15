import { Component } from '@angular/core';
import {DialogueComponent} from "./dialogue/dialogue.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudEnjoy';

  constructor(private dialog:MatDialog) {
  }


  openDialog() {
    this.dialog.open(DialogueComponent, {
      width:'30%',
      height:'80%'
    });
  }
}
