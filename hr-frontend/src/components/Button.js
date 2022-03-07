export default function Button(props){
    return(
       <button className={'btn '.concat(props.className)}
               id={props.id}
               value={props.label}
               onClick={props.onClick}
       >{props.label}</button>
    );
}