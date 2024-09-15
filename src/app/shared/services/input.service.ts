import {inject, Injectable} from "@angular/core";
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";
import {InputResponseDto} from "@core/dtos/input/input-response.dto";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class InputService {
    private readonly API_URL = environment.apiBaseUrl + 'inputs';
    private http: HttpClient = inject(HttpClient);

    getAll() {
        return this.http.get<{ data: InputResponseDto[] }>(this.API_URL).pipe(map(response => response.data));
    }

    getById(id: string) {
        return this.http.get<{ data: InputResponseDto }>(`${this.API_URL}/${id}`).pipe(map(response => response.data));
    }

    save(input: InputResponseDto) {
        return this.http.post<{ data: InputResponseDto }>(this.API_URL, input).pipe(map(response => response.data));
    }

    update(input: InputResponseDto, id: number) {
        return this.http.put<{ data: InputResponseDto }>(`${this.API_URL}/${id}`, input).pipe(map(response => response.data));
    }

    delete(id: string) {
        return this.http.delete<{ data: any }>(`${this.API_URL}/${id}`).pipe(map(response => response.data));
    }
    

}
    
    