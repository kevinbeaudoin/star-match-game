// components
import PlayAgain from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import StarDisplay from "./StarDisplay";

import { NumberStatus } from "./models";

// logic
import utils from "../logic/utils";
import useGameState from "../logic/useGameState";

interface IProps {
    startNewGame: () => void;
}

function Game(props: IProps) {
    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState,
    } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus =
        availableNums.length === 0
            ? "won"
            : secondsLeft === 0
            ? "lost"
            : "active";

    const numberStatus = (number: number) => {
        if (!availableNums.includes(number)) {
            return "used";
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? "wrong" : "candidate";
        }
        return "available";
    };

    const onNumberClick = (number: number, currentStatus: NumberStatus) => {
        if (gameStatus !== "active" || currentStatus === "used") {
            return;
        }

        const newCandidateNums =
            currentStatus === "available"
                ? candidateNums.concat(number)
                : candidateNums.filter((cn) => cn !== number);

        setGameState(newCandidateNums);
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== "active" ? (
                        <PlayAgain
                            onClick={props.startNewGame}
                            gameStatus={gameStatus}
                        />
                    ) : (
                        <StarDisplay count={stars} />
                    )}
                </div>
                <div className="right">
                    {utils.range(1, 9).map((numberId) => (
                        <PlayNumber
                            key={numberId}
                            status={numberStatus(numberId)}
                            numberId={numberId}
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
}

export default Game;
