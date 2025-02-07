export interface BaseDto {
  id?: string;
}

export interface PaginationDto {
  skip: number;
  limit: number;
  count: number;
}
