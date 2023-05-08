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
        sortable: true,
    },
    {
        name: 'Result',
        selector: (row: any) => row.operationResponse,
        sortable: true,
    },
    {
        name: 'Cost',
        selector: (row: any) => row.amount,
        sortable: true,
    },
    {
        name: "Date",
        selector: (row: any) => row.date,
        format: (row: any) => row.date.substr(0, 10),
        sortable: true,
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