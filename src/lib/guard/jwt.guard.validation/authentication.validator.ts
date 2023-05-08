import { ValidatorFunction } from "../validator.interface";
import { getToken } from "../../jwt/jwt.helper";

export class AuthenticationFunction implements ValidatorFunction {
    public evaluationFn(): boolean {
        if(!getToken() || getToken() === null){
            return false;
        }
        return true;
    }

}