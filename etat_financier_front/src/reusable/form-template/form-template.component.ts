import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-form-template',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent
],
  templateUrl: './form-template.component.html',
  styleUrl: './form-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTemplateComponent {
  @Input() shortDesc!:string;
  @Input() action!:string;
  @Input() bottomLink!:string;
  @Input() linkTo!:string;
}
