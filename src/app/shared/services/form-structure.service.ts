import { inject, Injectable } from "@angular/core";
import { environment } from '@env/environment.development';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { FormStructureDto } from "@core/dtos/form-structure.dto";


@Injectable({ providedIn: 'root' })
export class FormStructureService {
    private readonly API_URL = environment.apiBaseUrl + 'form-structures';
    private http: HttpClient = inject(HttpClient);

    getAll() {
        return this.http.get<{ data: FormStructureDto[] }>(this.API_URL).pipe(map(response => response.data));
    }

    getById(id: string) {
        return this.http.get<{
            data: FormStructureDto
        }>(`${this.API_URL}/${id}`).pipe(map(response => response.data));
    }

    save(formStructure: FormStructureDto) {
        return this.http.post<{
            data: FormStructureDto
        }>(this.API_URL, formStructure).pipe(map(response => response.data));
    }

    update(id: string, formStructure: FormStructureDto) {
        return this.http.put<{
            data: FormStructureDto
        }>(`${this.API_URL}/${id}`, formStructure).pipe(map(response => response.data));
    }

    delete(id: string) {
        return this.http.delete<{ data: any }>(`${this.API_URL}/${id}`).pipe(map(response => response.data));
    }

}