import {inject, Injectable} from "@angular/core";
import {environment} from '@env/environment.development';
import {HttpClient} from "@angular/common/http";
import {FormStructureResponseDto} from "@core/dtos/form-structure/form-structure-response.dto";
import {map} from "rxjs";
import {FormStructureInputRequest} from "@core/dtos/form-structure/form-structure-input.request";

@Injectable({providedIn: 'root'})
export class FormStructureService {
    private readonly API_URL = environment.apiBaseUrl + 'form-structures';
    private http: HttpClient = inject(HttpClient);

    getAll() {
        return this.http.get<{ data: FormStructureResponseDto[] }>(this.API_URL).pipe(map(response => response.data));
    }

    getById(id: string) {
        return this.http.get<{
            data: FormStructureResponseDto
        }>(`${this.API_URL}/${id}`).pipe(map(response => response.data));
    }

    save(formStructure: FormStructureResponseDto) {
        return this.http.post<{
            data: FormStructureResponseDto
        }>(this.API_URL, formStructure).pipe(map(response => response.data));
    }

    update(formStructure: FormStructureResponseDto, id: string) {
        return this.http.put<{
            data: FormStructureResponseDto
        }>(`${this.API_URL}/${id}`, formStructure).pipe(map(response => response.data));
    }

    delete(id: string) {
        return this.http.delete<{ data: any }>(`${this.API_URL}/${id}`).pipe(map(response => response.data));
    }

    setInputs(formStructure: FormStructureInputRequest) {
        return this.http.post<{
            data: any
        }>(`${this.API_URL}/${formStructure.formStructureId}/inputs`, formStructure.inputsId).pipe(map(response => response.data));
    }

}