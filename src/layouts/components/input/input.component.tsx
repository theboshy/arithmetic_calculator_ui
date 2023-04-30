import './input.component.scss'

export const InpuComponent = ({id = "", name = "", label = "", type = "text", placeholder = "", autoComplete = ""}) => {
    return <section>
        <div className="floating-label">
            <input placeholder={placeholder} type={type} name={name} id={id} autoComplete={autoComplete} required={true} />
            <label htmlFor={id} >{label}:</label>
        </div>
    </section>
}