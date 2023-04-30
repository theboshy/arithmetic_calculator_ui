
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import logo from '../../../arithmetic_logo.png'
import './auth.view.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AuthenticationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
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
    return <Formik
        initialValues={{
            username: '',
            password: '',
        }}
        validationSchema={AuthenticationSchema}
        onSubmit={values => {
            navigate("/authentication")
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