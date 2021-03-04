interface IProps {
    starId: number;
}

function Star(props: IProps) {
    return <div id={props.starId.toString()} className="star" />;
}
export default Star;
