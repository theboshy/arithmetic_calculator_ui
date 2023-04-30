import { ButtonComponent } from "../../components/button/button.component"
import { useNavigate } from "react-router-dom";
import logo from '../../../arithmetic_logo.png'
import './main.view.scss'

export const MainView = (props: any) => {
    const navigate = useNavigate();

    return <section className="wrapper">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            fast and efficient arithmetic solutions to improve your math performance.
        </p>
        <section>
            <ButtonComponent id="register_button" name="Start Using" callback={() => navigate("/authentication")}/>
            <ButtonComponent id="api_reference_button" name="Api Reference" callback={() => navigate("/api/reference")}/>
        </section>
    </section>;
}
