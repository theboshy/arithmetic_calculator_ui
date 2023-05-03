export interface RecordInterface {
    id: string;
    operationId: string;
    userId: string;
    amount: number;
    userBalance: number;
    operationResponse: any;
    date: string;
    last: boolean;
    tableName: string;
}

export const dataTableColumns = [
    {
        name: 'Operation',
        selector: (row: any) => row.operationId,
    },
    {
        name: 'Result',
        selector: (row: any) => row.operationResponse,
    },
    {
        name: 'Cost',
        selector: (row: any) => row.amount,
    },
    {
        name: "Date",
        selector: (row: any) => row.date,
        format: (row: any) => row.date.substr(0, 10)
    }
]

/**
 * 
 * id: string;
    operationId: string;
    userId: string;
    amount: number;
    userBalance: number;
    operationResponse: any;
    date: string;
    last: boolean;
    tableName: string;
 */