import './input.component.scss'

export const InputComponent: React.FunctionComponent<any> = ({ field, id, name, label, type, placeholder, autoComplete = "off", large = false, readOnly = false }) => {
    //const input = document.querySelector(`input[id='${id}']`);
    return <>
        <div className="floating-label">
            <input {...field} placeholder={placeholder} type={type} name={name} id={id} autoComplete={autoComplete} />
            <label htmlFor={id} >{label}:</label>
        </div>
    </>
}