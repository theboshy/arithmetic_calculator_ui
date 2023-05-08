import { useState } from "react";
import "./collapsible.component.scss"
import { OperationView } from "../../../lib/interface/operation.interface";
import { ButtonComponent } from "../button/button.component";
import uuid from 'node-uuid'

export const CollapsibleComponent: React.FunctionComponent<any> = ({ name, endpoint, version, entryValues, service, id }: OperationView) => {
    const [isOpen, setIsOpen] = useState(false);
    const [variablesStore, setVariablesStore] = useState<Record<string, number>>({});
    const [serviceResult, setServiceResult] = useState("")

    const addVariable = (name: string, value: any) => {
        variablesStore[name] = value;
        setVariablesStore(variablesStore)
    }

    const resolveService = async () => {
        addVariable("operationId", id)
        const result = await service(variablesStore);
        if (result) {
            setServiceResult(result.response)
        }
    }

    return <>
        <div className="collapsible">
            <div className="container-description capsule-white">
                <h2 className="collapsible-title" onClick={() => setIsOpen(!isOpen)}>{name}</h2>

            </div>

            <div className={`collapsible-body ${isOpen ? 'show' : ''}`}>
                <div className="container-description">
                    <div className="item">
                        <div className="table">
                            <div className="row">
                                {entryValues && entryValues.length > 0 ? entryValues.map((variable: any) =>
                                    <div className="cell" key={uuid.v4()}>
                                        <input type="text" placeholder={variable.name} onChange={(e: any) => addVariable(variable.variable, e.target.value)} />
                                    </div>
                                ) : <></>}
                            </div>
                            <div className="row">
                                <div className="cell">
                                    <ButtonComponent name="Send" callbackFn={() => resolveService()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item">
                            <span>Result:</span>
                        </div>
                        <span>{serviceResult}</span>
                    </div>
                </div>
            </div>
        </div>
    </>;
};