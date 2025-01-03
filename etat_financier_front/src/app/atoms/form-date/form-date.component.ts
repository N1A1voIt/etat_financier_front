import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ModalArrayComponent } from "../../../reusable/modal-array/modal-array.component";
import { InputDSquareComponent } from "../input-d-square/input-d-square.component";
import { SubmitButtonComponent } from "../../../reusable/submit-button/submit-button.component"; 
@Component({
  selector: 'app-form-date',
  standalone: true,
  imports: [CalendarModule, FormsModule, ModalArrayComponent, InputDSquareComponent, SubmitButtonComponent,ReactiveFormsModule],
  templateUrl: './form-date.component.html',
  styleUrl: './form-date.component.css'
})
export class FormDateComponent {
    //@ts-ignore
    dateValue: Date;
    @Input() type:any;
    @Input() afficher:boolean = false;
    @Input() id:any;
    formGroup:FormGroup;
    constructor(fb:FormBuilder) {
      this.formGroup = fb.group({
        id:[""],
        date:[""]
      })
      this.formGroup.value.id = this.id;
    }
    onSubmit(){
      
    }
}
