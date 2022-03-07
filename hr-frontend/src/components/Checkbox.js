export default function Checkbox(props){
   return (
       <div className="input-group">
           <div className="form-check">
               <label className="form-check-label"
                      htmlFor={props.id}>{props.label}
               <input id={props.id}
                      type="checkbox"
                      checked={props.value}
                      name={props.id}
                      onChange={props.handleChange}
                      className="form-check-input"></input>
               </label>

           </div>
       </div>
   );
}