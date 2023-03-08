export interface iResult<T> {
    errors: string[];
    isSuccess: boolean;
    message: string;
    value: T;
}
