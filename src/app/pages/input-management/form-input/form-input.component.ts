import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDto } from '@core/dtos/input.dto';
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbComponentStatus, NbDialogRef, NbDialogService, NbFormFieldModule, NbGlobalPhysicalPosition, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbToastrService, NbToggleModule } from '@nebular/theme';
import { InputService } from '@shared/services/input.service';
import { InputListComponent } from '../input-list/input-list.component';
import { MessageType } from '@core/utils/messages.type';
import { DataType } from '@core/models/data-type.type';

@Component({
  selector: 'form-builder-form-input',
  standalone: true,
  imports: [NbLayoutModule, NbFormFieldModule, NbInputModule, ReactiveFormsModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbIconModule, InputListComponent, NbButtonGroupModule, NbSelectModule, NbToggleModule], templateUrl: './form-input.component.html',
  styles: `
  .form {
        display: flex;
        flex-direction: column;
        gap: 2em;
      }`
})
export class FormInputComponent implements OnInit {
  protected inputDtos: InputDto[] = [];
  protected dialogService = inject(NbDialogService);
  private readonly inputService = inject(InputService);
  private readonly toastService = inject(NbToastrService);
  private refDialog = inject(NbDialogRef);
  formGroup!: FormGroup;
  isUpdate: boolean = false;
  inputDto!: InputDto;
  dataTypeOptions: DataType[] = Object.values(DataType);

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      dataType: new FormControl('string', [Validators.required]),
      required: new FormControl(false),
    });
  }

  ngOnInit(): void {
    if (this.inputDto) {
      this.formGroup.patchValue(this.inputDto);
      this.isUpdate = true;
    }
  }

  onSaveInput() {
    if (this.formGroup.valid) {
      if (this.isUpdate) {
        this.inputService.update({ ...this.formGroup.value, value: "", id: this.inputDto.id } as InputDto, this.inputDto.id!).subscribe(() => {
          this.showToastAndCloseDialog(MessageType.SUCCESS, 'success');
        });
      } else {
        const inputDto = { ...this.formGroup.value, value: "", id: self.crypto.randomUUID() } as InputDto;
        this.inputService.save(inputDto).subscribe(() => {
          this.showToastAndCloseDialog(MessageType.SUCCESS, 'success');
        });
      }
    }
  }

  showToastAndCloseDialog(message: MessageType, status: NbComponentStatus) {
    this.toastService.show(message, 'Success', {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status
    });
    this.refDialog.close();
  }

}