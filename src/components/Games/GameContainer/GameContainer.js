import React from 'react'
import Pairs from "../Pairs/Pairs";
import Associations from "../Associations/Associations";
import AssociationsCreateContainer from "../../CreateGame/Associations/AssociationsCreateContainer";
import Sequences from "../Sequences/Sequences";
import SequenceCreateContainer from "../../CreateGame/Sequence/SequenceCreateContainer";
import Task from "../Task/Task";
import PuzzlesCreateContainer from "../../CreateGame/Puzzles/PuzzlesCreateContainer";
import Puzzle from "../Puzzle/Puzzle";

const gameTypes = {
	pairs: 'pairs',
	associations: 'matchmaking',
	sequences: 'sequences',
	puzzles: 'puzzles'
}

const GameContainer = ({isEdit, content, cardSize, inLesson, isLastFragmentInLesson, toNextFragment, ...props}) => {
	return (
		<>
			{!isEdit && <Task task={content.task.text} taskAudio={content.task.media}/>}
			<Game
				isEdit={isEdit}
				content={content}
				cardSize={cardSize}
				inLesson={inLesson}
				isLastFragmentInLesson={isLastFragmentInLesson}
				toNextFragment={toNextFragment}
				{...props}
			/>
		</>
	)
}

const Game = ({isEdit, content, cardSize, inLesson, isLastFragmentInLesson, toNextFragment, ...props}) => {
	switch (content.gameType) {
		case gameTypes.pairs:
			return (
				<>
					{!isEdit
						? <Pairs
							images={content.images}
							size={cardSize}
							inLesson={inLesson}
							isLastFragmentInLesson={isLastFragmentInLesson}
							toNextFragment={toNextFragment}
						/>
						: <SequenceCreateContainer isEdit={isEdit}/>
					}
				</>
			)

		case gameTypes.associations:
			return (
				<>
					{!isEdit
						? <Associations
							images={content.images}
							cardSize={cardSize}
							inLesson={inLesson}
							isLastFragmentInLesson={isLastFragmentInLesson}
							toNextFragment={toNextFragment}
						/>
						: <AssociationsCreateContainer setContent={props.setContent} isEdit={isEdit}/>
					}
				</>
			)

		case gameTypes.sequences:
			return (
				<>
					{!isEdit
						? <Sequences
							size={cardSize}
							images={content.images}
							inLesson={inLesson}
							isLastFragmentInLesson={isLastFragmentInLesson}
							toNextFragment={toNextFragment}
						/>
						: <SequenceCreateContainer isEdit={isEdit}/>
					}
				</>
			)
		case gameTypes.puzzles:
			return (
				<>
					{!isEdit
						? <Puzzle
							image={content.images[0].url}
							rows={content.images[0].rows}
							cols={content.images[0].cols}
							inLesson={inLesson}
							isLastFragmentInLesson={isLastFragmentInLesson}
							toNextFragment={toNextFragment}
						/>
						: <PuzzlesCreateContainer isEdit={isEdit}/>
					}
				</>
			)

		default:
			return <div>Ну и где тут игра?!?!?</div>
	}
}

export default GameContainer