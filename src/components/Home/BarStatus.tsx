interface IProps {
    state : string;
}

const BarStatus = ({state}:IProps) => {
    return(
       <span className="bar" data-type={state}></span>
    )
}

export default BarStatus