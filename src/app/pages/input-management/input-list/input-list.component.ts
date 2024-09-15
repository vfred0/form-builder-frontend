import {Component, inject} from '@angular/core';
import {InputService} from "@shared/services/input.service";
import {InputResponseDto} from "@core/dtos/input/input-response.dto";
import {NbBadgeModule, NbCardModule, NbCheckboxModule, NbLayoutModule, NbTagModule} from "@nebular/theme";

@Component({
  selector: 'form-builder-input-list',
  standalone: true,
    imports: [
        NbLayoutModule,
        NbCardModule,
        NbCheckboxModule,
        NbBadgeModule,
        NbTagModule
    ],
  templateUrl: './input-list.component.html',
  styles: `
  .inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap:1rem;
  }
  
  `
})
export class InputListComponent {
   private inputService = inject(InputService);
    protected inputs: InputResponseDto[] = [];
    
    constructor() {
        this.inputService.getAll().subscribe(inputs => this.inputs = inputs);
    }
}
