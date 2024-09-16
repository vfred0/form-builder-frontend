import { InputDto } from "./input.dto";

export interface FormStructureDto {
    id?: string;
    name: string;
    description: string;
    inputs: InputDto[];
    
}
