import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { InputService } from "@shared/services/input.service";
import { NbBadgeModule, NbButtonGroupModule, NbCardModule, NbCheckboxModule, NbLayoutModule, NbTagModule } from "@nebular/theme";
import { InputDto } from '@core/dtos/input.dto';

@Component({
  selector: 'form-builder-input-list',
  standalone: true,
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbBadgeModule,
    NbTagModule,
    NbButtonGroupModule
  ],
  templateUrl: './input-list.component.html',
  styles: `
  .inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap:1rem;
  }
  
  `
})
export class InputListComponent implements OnInit {
  private inputService = inject(InputService);
  protected inputs: InputDto[] = [];
  multiSelectGroupValue: InputDto[] = [];
  @Input() values: InputDto[] = [];

  constructor(private cd: ChangeDetectorRef) {
    this.inputService.getAll().subscribe(inputs => this.inputs = inputs);
  }
  ngOnInit(): void {
    this.updateSelectedInputs(this.values);
  }

  updateMultiSelectGroupValue(value: InputDto[]): void {
    this.multiSelectGroupValue = value
    this.cd.markForCheck();
  }

  updateSelectedInputs(inputs: InputDto[]) {
    this.multiSelectGroupValue = inputs.map(input => ({
      id: input.id,
      name: input.name,
      dataType: input.dataType,
      required: input.required,
    }));
    this.cd.markForCheck();
  }

  isPressed(input: InputDto): boolean {
    return this.multiSelectGroupValue.some(value => value.name === input.name);
  }
}
