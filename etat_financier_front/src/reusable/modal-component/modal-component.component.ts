import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-modal-component',
    standalone: true,
    imports: [NgIf],
    templateUrl: './modal-component.component.html',
    styleUrl: './modal-component.component.css',
})
export class ModalComponentComponent {
    @Input() showForm!: boolean;
    @Input() nom!:string;
}
