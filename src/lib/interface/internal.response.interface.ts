export interface InternalResponseInterface {
    status?: number;
    error?: boolean;
    errorTrace?: string | null;
    response?: any;
}

export interface InternalResponsePaginatedInterface {
    status?: number;
    error?: boolean;
    errorTrace?: string;
    response?: PaginatedResultInterface;
}

interface PaginatedResultInterface {
    items: any[];
    lastEvaluatedKey: any;
}