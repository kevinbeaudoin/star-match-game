import { colors } from "./theme";

import { NumberStatus } from "./models";

interface IProps {
    status: NumberStatus;
    numberId: number;
    onClick: (id: number, status: NumberStatus) => void;
}

function PlayNumber(props: IProps) {
    return (
        <button
            className="number"
            style={{ background: colors[props.status] }}
            onClick={() => props.onClick(props.numberId, props.status)}
        >
            {props.numberId}
        </button>
    );
}

export default PlayNumber;
