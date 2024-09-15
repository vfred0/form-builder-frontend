import {InputResponseDto} from "@core/dtos/input/input-response.dto";

export interface FormStructureResponseDto {
    name: string;
    description: string;
    inputs: InputResponseDto[];
}
