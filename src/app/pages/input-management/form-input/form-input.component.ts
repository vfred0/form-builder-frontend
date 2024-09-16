import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDto } from '@core/dtos/input.dto';
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbDialogService, NbFormFieldModule, NbGlobalPhysicalPosition, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbToastrService, NbToggleModule } from '@nebular/theme';
import { InputService } from '@shared/services/input.service';
import { InputListComponent } from '../input-list/input-list.component';

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
  formGroup!: FormGroup;
  isUpdate: boolean = false;
  inputDto!: InputDto;
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
    console.log(this.formGroup.value);

    if (this.formGroup.valid) {
      if (this.isUpdate) {
        this.inputService.update(this.formGroup.value as InputDto, this.inputDto.id!).subscribe(() => {
          this.toastService.show('Input updated successfully', 'Success', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'success'
          });
        });
      } else {
        this.inputService.save(this.formGroup.value as InputDto).subscribe(() => {
          this.toastService.show('Input created successfully', 'Success', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'success'
          });
        });
      }
    }

  }

}
