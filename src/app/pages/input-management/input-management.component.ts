import {Component, inject} from '@angular/core';
import {InputService} from "@shared/services/input.service";
import {InputResponseDto} from "@core/dtos/input/input-response.dto";
import {NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbTagModule} from "@nebular/theme";
import {of} from "rxjs";

@Component({
  selector: 'form-builder-input-management',
  standalone: true,
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbTagModule,
    NbButtonModule,
    NbIconModule
  ],
  templateUrl: './input-management.component.html',
  styles: ``
})
export class InputManagementComponent {
  private inputService = inject(InputService);
  protected inputs: InputResponseDto[] = [];

  constructor() {
    this.inputService.getAll().subscribe(inputs => this.inputs = inputs);
  }

  protected readonly OfflineAudioCompletionEvent = OfflineAudioCompletionEvent;
  protected readonly of = of;
}
