import {inject, Injectable} from "@angular/core";
import {environment} from "@env/environment.development";
import { HttpClient } from "@angular/common/http";
import {map} from "rxjs";
import { InputDto } from "@core/dtos/input.dto";

@Injectable({providedIn: 'root'})
export class InputService {
    private readonly API_URL = environment.apiBaseUrl + 'inputs';
    private http: HttpClient = inject(HttpClient);

    getAll() {
        return this.http.get<{ data: InputDto[] }>(this.API_URL).pipe(map(response => response.data));
    }

    save(input: InputDto) {
        return this.http.post<void>(this.API_URL, input);
    }

    update(input: InputDto, id: string) {
        return this.http.put<void>(`${this.API_URL}/${id}`, input);
    }

    delete(id: string) {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
    

}
    
    