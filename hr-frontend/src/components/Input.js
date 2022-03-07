export default function Input(props) {
    return (
        <div className="input-group">
            <label className="input-group-text"
                   htmlFor={props.id}>{props.label}</label>
            <input id={props.id}
                   type="text"
                   name={props.id}
                   value={props.value}
                   onChange={props.handleChange}
                   className="form-control"></input>
        </div>
    );
};