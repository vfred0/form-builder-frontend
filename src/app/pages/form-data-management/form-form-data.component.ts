import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormStructureDto } from '@core/dtos/form-structure.dto';
import { MessageType } from '@core/utils/messages.type';
import { NbButtonModule, NbCardModule, NbComponentStatus, NbDialogRef, NbDialogService, NbGlobalPhysicalPosition, NbIconModule, NbInputModule, NbLayoutModule, NbTagModule, NbToastrService } from '@nebular/theme';
import { FormStructureService } from '@shared/services/form-structure.service';
import { InputService } from '@shared/services/input.service';

@Component({
  selector: 'form-builder-form-form-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbLayoutModule,
    NbInputModule,
    NbTagModule
  ],
  templateUrl: './form-form-data.component.html',
  styles: ``
})
export class FormFormDataComponent implements OnInit {
  @Input() formStructure!: FormStructureDto;
  formGroup!: FormGroup;
  private readonly formStructureService = inject(FormStructureService);
  protected dialogService = inject(NbDialogService);
  private toastService = inject(NbToastrService);
  private refDialog = inject(NbDialogRef);
  isUpdate: boolean = false;

  constructor() {
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    if (this.formStructure) {
      this.isUpdate = true;
      this.formStructure.inputs.forEach(input => {
        this.formGroup.addControl(input.name, new FormControl(input.value || (input.required ? null : undefined)));
      });
      
    }

  }

  onSaveFormStructure() {
    if (this.formGroup.valid) {
      this.formStructure.inputs.forEach(input => {
        input.value = this.formGroup.get(input.name)?.value;
      });

      this.formStructureService.update(this.formStructure.id!, this.formStructure).subscribe(response => {
        this.showToastAndCloseDialog(MessageType.SUCCESS, 'success');
        this.refDialog.close();
      });

    } else {
    }
    this.refDialog.close();
  }
  showToastAndCloseDialog(message: MessageType, status: NbComponentStatus) {
    this.toastService.show(message, 'Success', {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status
    });
    this.refDialog.close();
  }


}
