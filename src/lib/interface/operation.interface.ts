export interface OperationInterface {
    id: string;
    type: string;
    cost: number;
}

export interface OperationView {
    name: string;
    id: string;
    endpoint: string;
    version: string;
    entryValues: any;
    service: any;
  }