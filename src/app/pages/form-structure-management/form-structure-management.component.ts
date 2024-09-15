import {Component, inject} from '@angular/core';
import {FormStructureService} from "@shared/services/form-structure.service";
import {
    NbButtonModule,
    NbCardModule,
    NbDialogService,
    NbIconModule,
    NbLayoutModule,
    NbListModule,
    NbTagModule
} from "@nebular/theme";
import {FormStructureResponseDto} from "@core/dtos/form-structure/form-structure-response.dto";
import {NgStyle} from "@angular/common";
import {
    FormFormStructureComponent
} from "@pages/form-structure-management/form-form-structure/form-form-structure.component";

@Component({
    selector: 'form-builder-form-structure-management',
    standalone: true,
    imports: [NbLayoutModule, NbCardModule, NbTagModule, NbListModule, NgStyle, NbButtonModule, NbIconModule],
    templateUrl: './form-structure-management.component.html',
    styles: ``
})
export class FormStructureManagementComponent {
    protected formStructures: FormStructureResponseDto[] = [];
    protected dialogService = inject(NbDialogService);
    private readonly formStructureService = inject(FormStructureService);

    constructor() {
        this.formStructureService.getAll().subscribe(formStructures => this.formStructures = formStructures);
    }

    showFormStructureModal() {
        this.dialogService.open(FormFormStructureComponent, { hasBackdrop : true});
    }
}

