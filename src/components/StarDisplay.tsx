import utils from "../logic/utils";
import Star from "./Star";

interface IProps {
    count: number;
}

function StarDisplay(props: IProps) {
    return (
        <>
            {utils.range(1, props.count).map((starId) => (
                <Star key={starId} starId={starId} />
            ))}
        </>
    );
}

export default StarDisplay;
