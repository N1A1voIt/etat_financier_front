import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'n-input',
    standalone: true,
    imports: [FormsModule, NgIf, NgClass],
    templateUrl: './n-input.component.html',
    styleUrl: './n-input.component.css',
})
export class NInputComponent {
    @Input() name: string | null = null;
    @Input() placeholder!: string;
    @Input() type!: string;
    @Input() error!: string;
}
