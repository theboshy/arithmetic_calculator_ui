
import { ButtonComponent } from '../../components/button/button.component';
import { InpuComponent } from '../../components/input/input.component';
import logo from '../../../arithmetic_logo.png'
import './auth.view.scss';

export const AuthenticationView = (props: any) => {
    return <section>
        <div className="session">
            <div className="left">
                <img src={logo} className="app-logo" alt="logo" />
            </div>
            <form action="" autoComplete="off">
                <h4><span>Arithmetic² API</span></h4>
                <div>
                    <p>Welcome back! Log in to your account to start using arithmetic solutions</p>
                </div>
                <InpuComponent id="username" name="username" autoComplete='on' label='Username' placeholder='your username' />
                <InpuComponent id="password" name="password" autoComplete='on' label='Password' placeholder='your password' type='password' />
                <ButtonComponent id="login_button" name="Enter"></ButtonComponent>
            </form>
        </div>
    </section>;
}