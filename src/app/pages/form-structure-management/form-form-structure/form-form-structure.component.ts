import { AfterContentChecked, AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
    NbButtonGroupModule,
    NbButtonModule,
    NbCardModule,
    NbDialogRef,
    NbDialogService,
    NbFormFieldModule,
    NbGlobalPhysicalPosition,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbToastrService
} from "@nebular/theme";
import { InputListComponent } from "@pages/input-management/input-list/input-list.component";
import { FormStructureService } from '@shared/services/form-structure.service';
import { FormStructureDto } from "@core/dtos/form-structure.dto";
import { InputDto } from '@core/dtos/input.dto';
@Component({
    selector: 'form-builder-form-form-structure',
    standalone: true,
    imports: [NbLayoutModule, NbFormFieldModule, NbInputModule, ReactiveFormsModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbIconModule, InputListComponent, NbButtonGroupModule],
    templateUrl: './form-form-structure.component.html',
    styles: `
      .form {
        display: flex;
        flex-direction: column;
        gap: 2em;
      }
    `
})
export class FormFormStructureComponent implements OnInit {
    @Input() formStructure!: FormStructureDto;
    formGroup: FormGroup;
    protected dialogService = inject(NbDialogService);
    private toastService = inject(NbToastrService);
    private refDialog = inject(NbDialogRef);
    private readonly formStructureService = inject(FormStructureService);
    protected inputs: InputDto[] = [];
    @ViewChild(InputListComponent) inputListComponent!: InputListComponent;
    isUpdate: boolean = false;

    constructor() {
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
        });
    }

    ngOnInit(): void {
        if (this.formStructure) {
            this.formGroup.patchValue(this.formStructure);
            this.inputs = this.formStructure.inputs;
            this.isUpdate = true;
        }

    }

    onSaveFormStructure() {
        if (this.formGroup.valid) {

            const inputs = this.inputListComponent.multiSelectGroupValue;

            const formStructureRequest: FormStructureDto = { ...this.formGroup.value, inputs, id: this.formStructure?.id } as FormStructureDto

            console.log(formStructureRequest);

            if (this.isUpdate) {
                this.formStructureService.update(formStructureRequest.id!, formStructureRequest).subscribe(() => {
                    this.toastService.show('Form structure updated successfully', 'Success', {
                        position: NbGlobalPhysicalPosition.TOP_RIGHT,
                        status: 'success'
                    });
                    this.refDialog.close();
                });
            } else {
                this.formStructureService.save(formStructureRequest).subscribe(() => {
                    this.toastService.show('Form structure saved successfully', 'Success', {
                        position: NbGlobalPhysicalPosition.TOP_RIGHT,
                        status: 'success'
                    });
                    this.refDialog.close();
                });
            }
        
        } else {
            this.toastService.show('Form structure not saved', 'Error', {
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                status: 'danger'
            });
        }
    }
}
