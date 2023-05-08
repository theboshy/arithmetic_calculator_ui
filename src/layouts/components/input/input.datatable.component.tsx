import './input.component.scss'

export const InputDatatableComponent: React.FunctionComponent<any> = ({ id, name, label, type, placeholder, onChange }) => {
    //const input = document.querySelector(`input[id='${id}']`);
    return <>
        <div className="floating-label">
            <input placeholder={placeholder} type={type} name={name} id={id} onChange={onChange} />
            <label htmlFor={id} >{label}:</label>
        </div>
    </>
}