import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  ngOnInit(): void {
    if(this.label == "") this.label = "Valider"
  }
  @Input() label:any;
}
