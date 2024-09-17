import {Component, inject} from '@angular/core';
import { InputService } from "@shared/services/input.service";
import { NbButtonModule, NbCardModule, NbDialogService, NbGlobalPhysicalPosition, NbIconModule, NbLayoutModule, NbTagModule, NbToastrService } from "@nebular/theme";
import { InputDto } from '@core/dtos/input.dto';
import { FormInputComponent } from './form-input/form-input.component';
import { MessageType } from '@core/utils/messages.type';

@Component({
  selector: 'form-builder-input-management',
  standalone: true,
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbTagModule,
    NbButtonModule,
    NbIconModule,
  ],
  templateUrl: './input-management.component.html',
  styles: ``
})
export class InputManagementComponent {

  private inputService = inject(InputService);
  protected inputs: InputDto[] = [];
  protected dialogService = inject(NbDialogService);
  private readonly toastService = inject(NbToastrService);

  constructor() {
    this.inputService.getAll().subscribe(inputs => this.inputs = inputs);
  }

  deleteInput(id: string) {
    this.inputService.delete(id).subscribe(() => {
      this.toastService.show(MessageType.SUCCESS, 'Success', {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        status: 'success'
      });
      this.inputService.getAll().subscribe(inputs => this.inputs = inputs);
    });
  }

  showInputFormDialog(inputDto?: InputDto) {
    this.dialogService.open(FormInputComponent, { hasBackdrop: false, closeOnBackdropClick: false, context: { inputDto } })
      .onClose.subscribe(() => {
        this.inputService.getAll().subscribe(inputs => this.inputs = inputs);
      });
  }
}
