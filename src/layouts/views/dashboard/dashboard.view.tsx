import { useEffect, useState } from "react";
import { operationGetAllService } from "../../../lib/api/operation.service"
import { USER_NAME_REFRENCE } from "../../../lib/session.constants/session.constants";
import "./dashboard.view.scss"
import { OperationSelector } from "../../components/operation.selector/operation.selector";

export const DashBoardView: React.FunctionComponent<any> = ({ }) => {
    const [operation, setOperation] = useState<[any] | []>([]);
    const [user, setUser] = useState(sessionStorage.getItem(USER_NAME_REFRENCE));
    const [visibleDiv, setVisibleDiv] = useState<number | null>(0);

    const selectDashBoardOption = (id: number) => setVisibleDiv(id)
    const dashboardOptions = [
        { id: 0, name: "Use arithmetic operations 🔢", select: selectDashBoardOption },
        { id: 1, name: "See the records 📙", select: selectDashBoardOption },
        { id: 2, name: "Go to API Docs 📚", select: selectDashBoardOption }
    ];
    const dashBoardOptionsResolver = [
        {
            id: 0, render: <OperationSelector operations={operation} />
        }
    ];



    const loadOperations = async () => {
        const operations = await operationGetAllService();
        if (operations) {
            setOperation(operations.response);
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