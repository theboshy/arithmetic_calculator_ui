import { ReactElement } from "react";

type GuardedProperties = {
    evaluationFn(): boolean;
    errorChildren: ReactElement<any, any> | null;
    children: ReactElement<any, any> | null;
}

export const ProtectedRoute: React.FunctionComponent<GuardedProperties> = ({ evaluationFn, errorChildren, children }) => {
    if(evaluationFn()) {
        return children;
    }
    return errorChildren;
};