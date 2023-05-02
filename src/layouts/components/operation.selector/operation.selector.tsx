import "./operation.selector.scss";
import { CollapsibleComponent } from "../collapsible/collapsible.component";
import { OperationInterface, OperationView } from "../../../lib/interface/operation.interface";
import { findEndpoint, operationEntryValues } from "../../../lib/api/sources/sources";
import { registerServices } from "../../../lib/api/sources/register.services";


export const OperationSelector: React.FunctionComponent<any> = ({ operations }) => {

    const operationList: [OperationView] = operations.map((operation: OperationInterface) => {
        return {
            name: operation.type,
            id: operation.id,
            endpoint: findEndpoint(operation.type, "v1"),
            version: "v1",
            entryValues: operationEntryValues[operation.type],
            service: registerServices[operation.type]
        }
    });
    /*[
        
    ]*/
    return (
        <>
            {operationList.map((operation: OperationView) => {
                return <CollapsibleComponent {...operation} />
            })}
        </>
    );
};