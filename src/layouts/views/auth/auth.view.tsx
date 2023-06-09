
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import logo from '../../../arithmetic_logo.png'
import './auth.view.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { fetchUrl } from '../../../lib/api/sources/api.caller';
import { apiSources } from '../../../lib/api/sources/sources';
import { loginService } from '../../../lib/api/authentication.service';
import { ToastOptions, toast } from 'react-toastify';
import { TOAST_OPTIONS } from '../../../lib/toast.config/toast.config';
import { getToken, setToken } from '../../../lib/jwt/jwt.helper';
import { USER_NAME_REFRENCE } from '../../../lib/session.constants/session.constants';

const AuthenticationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'too Short!')
        .max(12, 'too Long!')
        .required('required'),
    password: Yup.string()
        .min(5, 'too Short!')
        .max(15, 'too Long!')
        .required('required')
        .matches(/[a-zA-Z]/, 'password can only contain Latin letters.'),
});

const errorParser = (error: any): String | any => {
    try {
        if (error) {
            for (const [key, value] of Object.entries(error)) {
                if (error.hasOwnProperty(key)) {
                    return `${key} is ${value}`;
                }
            }
        }
    } catch (error) {
        return error;
    }
    return null;
}

export const AuthenticationView = (props: any) => {
    const navigate = useNavigate();

    const login = async (username: string, password: string) => {
        try {
            const result = await loginService(username, password);
            if (result) {
                setToken(result.response);
                sessionStorage.setItem(USER_NAME_REFRENCE, username)
                toast('welcome back', TOAST_OPTIONS);
                navigate("/dashboard")
            }
        } catch (error) {
            toast.error('an internal error occurred', TOAST_OPTIONS);
        }
    }


    return <Formik
        initialValues={{
            username: '',
            password: '',
        }}
        validationSchema={AuthenticationSchema}
        onSubmit={values => {
            const { username, password } = values;
            login(username, password)
        }}
    >
        {({ errors, touched }) => (

            <section>
                <div className="session">
                    <div className="left">
                        <img src={logo} className="app-logo" alt="logo" />
                    </div>

                    <Form>
                        <h4><span>Arithmetic² API</span></h4>
                        <div>
                            <p>Welcome back! Log in to your account to start using arithmetic solutions</p>
                        </div>
                        <Field component={InputComponent} id="username" name="username" autoComplete='on' label='Username' placeholder='your username' />
                        {/*<InpuComponent id="username" name="username" autoComplete='on' label='Username' placeholder='your username' />*/}
                        <Field component={InputComponent} id="password" name="password" autoComplete='on' label='Password' placeholder='your password' type='password' />
                        <span className='discrete'>{errorParser(errors)}</span>
                        <ButtonComponent id="login_button" name="Enter" type="submit"></ButtonComponent>
                    </Form>
                </div>
            </section>
        )}
    </Formik>;
}