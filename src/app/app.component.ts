import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbTabsetModule,
    NbToggleModule
} from "@nebular/theme";

@Component({
    selector: 'form-builder-root',
    standalone: true,
    imports: [RouterOutlet, NbCardModule, NbTabsetModule, NbLayoutModule, NbActionsModule, NbMenuModule, NbSidebarModule, NbToggleModule, NbButtonModule],
    template: `
        <nb-layout>
            <nb-layout-header>
                <h1>Form Builder</h1>
            </nb-layout-header>

            <nb-layout-column>
                <nb-tabset>
                    <nb-tab tabTitle="Gestionar estructura de formularios">
                        Gestionar estructura de fomrularios
                    </nb-tab>
                    <nb-tab tabTitle="Gestionar inputs">
                        Gestionar inputs
                    </nb-tab>
                </nb-tabset>
            </nb-layout-column>
        </nb-layout>
    `,
    styles: [],
})


export class AppComponent {
    title = 'form-builder-frontend';
}
