import {ApplicationConfig, EnvironmentProviders, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {NbDialogModule, NbSidebarModule, NbThemeModule, NbToastrModule} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

const provideNebular = (): EnvironmentProviders[] => [importProvidersFrom(NbThemeModule.forRoot({name: 'cosmic'})), importProvidersFrom(NbEvaIconsModule), importProvidersFrom(NbDialogModule.forRoot()), importProvidersFrom(NbSidebarModule.forRoot()), importProvidersFrom(NbToastrModule.forRoot())]


export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), importProvidersFrom(HttpClientModule, BrowserAnimationsModule), ...provideNebular()],
};
