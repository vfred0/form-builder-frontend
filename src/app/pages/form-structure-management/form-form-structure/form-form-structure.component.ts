import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    NbButtonGroupModule,
    NbButtonModule,
    NbCardModule,
    NbDialogService,
    NbFormFieldModule,
    NbGlobalPhysicalPosition,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbToastrService
} from "@nebular/theme";
import {FormStructureRequestDto} from "@core/dtos/form-structure/form-structure-request.dto";
import {InputListComponent} from "@pages/input-management/input-list/input-list.component";

@Component({
    selector: 'form-builder-form-form-structure',
    standalone: true,
    imports: [NbLayoutModule, NbFormFieldModule, NbInputModule, ReactiveFormsModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbIconModule],
    templateUrl: './form-form-structure.component.html',
    styles: `
      .form {
        display: flex;
        flex-direction: column;
        gap: 2em;
      }
    `
})
export class FormFormStructureComponent {
    formGroup: FormGroup;
    @Output() actionButton: EventEmitter<FormStructureRequestDto>;
    protected dialogService = inject(NbDialogService);
    private toastService = inject(NbToastrService);

    constructor() {
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
        });
        this.actionButton = new EventEmitter<FormStructureRequestDto>();
    }

    onSaveFormStructure() {
        if (this.formGroup.valid) {
            this.actionButton.emit(this.formGroup.value);
            this.toastService.show('Form structure saved successfully', 'Success', {
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                status: 'success'
            });
        } else {
            this.toastService.show('Form structure not saved', 'Error', {
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                status: 'danger'
            });
        }
    }


    showInputsModal() {
        this.dialogService.open(InputListComponent, {hasBackdrop: true});
    }
}
