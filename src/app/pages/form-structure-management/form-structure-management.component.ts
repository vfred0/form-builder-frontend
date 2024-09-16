import {Component, inject} from '@angular/core';
import {FormStructureService} from "@shared/services/form-structure.service";
import {
    NbButtonModule,
    NbCardModule,
    NbDialogService,
    NbGlobalPhysicalPosition,
    NbIconModule,
    NbLayoutModule,
    NbListModule,
    NbTagModule,
    NbToastrService
} from "@nebular/theme";
import {NgStyle} from "@angular/common";
import {
    FormFormStructureComponent
} from "@pages/form-structure-management/form-form-structure/form-form-structure.component";
import { FormStructureDto } from '@core/dtos/form-structure.dto';

@Component({
    selector: 'form-builder-form-structure-management',
    standalone: true,
    imports: [NbLayoutModule, NbCardModule, NbTagModule, NbListModule, NgStyle, NbButtonModule, NbIconModule],
    templateUrl: './form-structure-management.component.html',
    styles: ``
})
export class FormStructureManagementComponent {

    protected formStructures: FormStructureDto[] = [];
    protected dialogService = inject(NbDialogService);
    private readonly formStructureService = inject(FormStructureService);
    private readonly toastService = inject(NbToastrService);

    constructor() {
        this.formStructureService.getAll().subscribe(formStructures => this.formStructures = formStructures);
    }

    showFormStructureModal() {
        this.dialogService.open(FormFormStructureComponent, { hasBackdrop: false, closeOnBackdropClick: false })
            .onClose.subscribe(() => {
                this.formStructureService.getAll().subscribe(formStructures => this.formStructures = formStructures);
            });
    }

    deleteFormStructure(id: string) {
        this.formStructureService.delete(id).subscribe(() => {
            this.formStructures = this.formStructures.filter(formStructure => formStructure.id !== id);
        });

        this.toastService.show('Form structure deleted successfully', 'Success', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'success'
        });
    }

    showEditFormStructureModal(formStructure: FormStructureDto) {
        this.dialogService.open(FormFormStructureComponent, { hasBackdrop: false, closeOnBackdropClick: false, context: { formStructure } });
    }
}

