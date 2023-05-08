import React, { useEffect, useState } from "react";
import { operationGetAllService } from "../../../lib/api/operation.service"
import { USER_NAME_REFRENCE } from "../../../lib/session.constants/session.constants";
import "./dashboard.view.scss"
import { OperationSelector } from "../../components/operation.selector/operation.selector";
import { DataTableComponent } from "../../components/datatable/data.table.component";
import { dataTableColumns } from "../../../lib/interface/user.record.interface";
import { userRecordGetAllService } from "../../../lib/api/user.record.service";

export const DashBoardView: React.FunctionComponent<any> = () => {
    const [operation, setOperation] = useState<[any] | []>([]);
    const [user] = useState(sessionStorage.getItem(USER_NAME_REFRENCE));
    const [visibleDiv, setVisibleDiv] = useState<number | null>(0);
    const [columns] = useState(dataTableColumns);

    const selectDashBoardOption = (id: number) => setVisibleDiv(id)
    const dashboardOptions = [
        { id: 0, name: "Use arithmetic operations 🔢", select: selectDashBoardOption },
        { id: 1, name: "See the records 📙", select: selectDashBoardOption },
        { id: 2, name: "Go to API Docs 📚", select: selectDashBoardOption }
    ];
    const dashBoardOptionsResolver = [
        {
            id: 0, render: <OperationSelector operations={operation} />
        },
        {
            id: 1, render: <DataTableComponent
                columns={columns}
            />
        }, {
            id: 2,
            render: <a href="https://github.com/theboshy/arithmetic_calculator_api/blob/main/README.md" target="_blank">
                Click To open the api documentation
            </a>
        }
    ];

    const loadOperations = async () => {
        const operations = await operationGetAllService();
        if (operations) {
            setOperation(operations.response.items);
        } else {
            //handle error
        }
    }

    useEffect(() => {
        loadOperations();
    }, []);

    const renderOperations = () => {
        if (operation && operation.length !== 0) {
            return <>
                <div className="grid-container">
                    <h2>{`welcome back! ${user}`}</h2>
                    <div className="container">
                        {dashboardOptions.map((option) => {
                            return <div key={option.name} className="card" onClick={() => option.select(option.id)}>
                                <div className={`card-top ${visibleDiv === option.id ? 'selected-card' : ''}`}>
                                    <div className="container-header">
                                        <div className="container-header-left">
                                            <p>{option.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="option-resolver">
                        {dashBoardOptionsResolver.at(visibleDiv!)?.render}
                    </div>
                </div>
            </>;
        } else {
            return <></>
        }
    }
    return renderOperations();
}