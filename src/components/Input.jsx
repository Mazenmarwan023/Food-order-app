export default function Input({label,id,...props}){
    return(
        <div className="control">
            <label htmlFor={id} className="contol-label">{label}</label>  {/* htmlFor="name" connects the label to the input with id="name".  */}
            <input id={id} className="control-input" required {...props} />
        </div>
    )
}