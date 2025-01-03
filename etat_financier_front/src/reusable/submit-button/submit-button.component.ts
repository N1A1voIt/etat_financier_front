import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent implements OnInit{
  ngOnInit(): void {
    if(this.label == "") this.label = "Valider"
  }
  @Input() label:any;
}
