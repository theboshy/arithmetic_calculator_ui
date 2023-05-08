import "./selector.component.scss"

export const SelectorComponent: React.FunctionComponent<any> = ({ items, name, id = "select", select }) => {
    const handleSelectedOption = (event: any) => {
        if (event.target.value && select) {
            select(event.target.value);
        }
    }
    return <>
        <div className="select-wrapper">
            <div className="select">
                <select id={id} onChange={handleSelectedOption}>
                    {
                        items.map((selectableItem: any) => {
                            return <option key={selectableItem.id} value={selectableItem.id}>{selectableItem.name}</option>
                        })
                    }
                </select>
                <div className="select-arrow"></div>
            </div>
        </div>
    </>;
}
