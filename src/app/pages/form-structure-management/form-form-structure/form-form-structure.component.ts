import { AfterContentChecked, AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
    NbButtonGroupModule,
    NbButtonModule,
    NbCardModule,
    NbComponentStatus,
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
import { MessageType } from '@core/utils/messages.type';
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
        if (this.formGroup.valid && this.inputListComponent.multiSelectGroupValue.length > 0) {
            const inputs = this.inputListComponent.multiSelectGroupValue;
            const formStructureRequest: FormStructureDto = { ...this.formGroup.value, inputs, id: this.formStructure?.id } as FormStructureDto
            if (this.isUpdate) {
                this.formStructureService.update(formStructureRequest.id!, formStructureRequest).subscribe(() => {
                    this.showToastAndCloseDialog(MessageType.SUCCESS, 'success');
                });
            } else {
                this.formStructureService.save(formStructureRequest).subscribe(() => {
                    this.showToastAndCloseDialog(MessageType.SUCCESS, 'success');
                });
            }
        } else {
            this.showToastAndCloseDialog(MessageType.ERROR, 'danger');
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
