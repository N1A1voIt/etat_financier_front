import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormTemplateComponent } from "../form-template/form-template.component";
import { InputComponent } from "../input/input.component";
import { GenServiceService } from '../../app/gen-service.service';
import { FormsModule } from '@angular/forms';
import { ModalArrayComponent } from "../modal-array/modal-array.component";

@Component({
  selector: 'app-uo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormTemplateComponent,
    InputComponent,
    FormsModule,
    ModalArrayComponent
],
  templateUrl: './uo-form.component.html',
  styleUrl: './uo-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UoFormComponent { 
  id:any;
  uoName:string = '';
  all:any
  showForm: any;
  isUpdate:boolean = false;
  constructor(private http:GenServiceService){}
  ngOnInit(): void {
    this.retrieveAll();

  }
  onSubmit(){
    let form = {
      idUniteMesure: this.id != undefined ? this.id.toString() : undefined,
      nomUniteMesure: this.uoName,
    };
    this.http.makeAction('POST','unite-mesure',undefined,form).subscribe({
      next:(data) => {
        this.retrieveAll();
      },error:(error) => {
        alert(error)
      }
    })
  }
  retrieveAll() {
    this.http.makeAction('GETALL','unite-mesure',undefined,undefined).subscribe({
      next: (data) => {
        this.all = data;
      },
      error: (error) => {
        alert(error);
      },
    });
  }
  getById(id: number) {
    return this.all.filter(
      (a: { idUniteMesure: number; nomUniteMesure: string;}) =>
        a.idUniteMesure == id
    );
  }
  update(id: number) {
    let row: any = this.getById(id);
    console.log(row[0])
    this.uoName = row[0].nomUniteMesure;
    this.id = id;
    this.showForm = false;
    this.isUpdate = true;
  }
  delete(id: number) {
    this.http.makeAction('DELETE','unite-mesure',id,undefined).subscribe({
      next: (data) => {
        console.log("Deleted with status code 200")
        // this.all = data;
        this.retrieveAll();
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
