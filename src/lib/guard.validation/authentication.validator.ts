import { useNavigate } from "react-router-dom";
import { ValidatorFunction } from "./validator.interface";

export class AuthenticationFunction implements ValidatorFunction {
    public evaluationFn(): boolean {
        return true;
    }

}