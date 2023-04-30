export interface InternalResponseInterface {
    status?: number;
    error?: boolean;
    errorTrace?: string | null;
    response?: any;
}