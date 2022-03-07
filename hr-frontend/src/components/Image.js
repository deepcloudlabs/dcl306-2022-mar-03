function handleFileChange(event, props){
  const filename = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    props.handleFileChange(e.target.result);
  }
  reader.readAsDataURL(filename);
}

export default function Image(props) {
    return (
        <div className="input-group">
            <label className="input-group-text"
                   htmlFor={props.id}>{props.label}</label>
            <img id={props.id}
                 style={{height: '128px'}}
                 src={props.value}
                 className="img-thumbnail"/>
            <label className="btn btn-info">
                <input style={{'display': 'none'}}
                       onChange={(event) => handleFileChange(event,props)}
                       type="file"/>
                <span>File</span>
            </label>
        </div>
    );
}