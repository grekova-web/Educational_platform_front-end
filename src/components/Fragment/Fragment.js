import React, {useState} from "react";
import s from './Fragment.module.css'
import TextEditor from "../TextEditor/TextEditor";
import htmlToDraft from 'html-to-draftjs';
import {ContentState, convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import {fragmentTypes} from "../../common/fragmentTypes";
import ThisTags from "../CreateFragment/ThisTags/ThisTags";
import TagsListContainer from "../CreateFragment/TagsList/TagsListContainer";
import {NavLink} from "react-router-dom";
import avatarPlaceholder from "../../assets/img/profile/teacherProfile.svg";
import ButtonsBlock from "../Lesson/ButtonsBlock/ButtonsBlock";
import HeaderWithBackButton from "../../common/HeaderWithBackButton/HeaderWithBackButton";
import ImageFragment from "./ImageFragment/ImageFragment";
import VideoFragment from "./VideoFragment/VideoFragment";
import UploadFon from "../CreateLesson/UloadFon/UploadFon";
import DeleteErrorModal from "./DeleteErrorModal/DeleteErrorModal";
import GameContainer from "../Games/GameContainer/GameContainer";
import AgeLimits from "../CreateFragment/AgeLimits/AgeLimits";

const Fragment = ({deleteError, ...props}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const editToggle = () => {
		props.toggleIsEdit();
		if (props.type === fragmentTypes.article) {
			convertToDraft();
		}
	}

	const setContent = (editorState) => {
		props.setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditorState(editorState);
	}

	const convertToDraft = () => {
		const contentBlock = htmlToDraft(props.content);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
		setEditorState(EditorState.createWithContent(contentState));
	}

	return (
		<div className={s.fragmentWrapper}>
			{!props.isEdit
				? <HeaderWithBackButton title={props.title}/>
				: <input
					type="text"
					name={'fragmentTitle'}
					className={`lightInput ${s.fragmentTitle}`}
					value={props.title}
					onChange={event => props.setTitle(event.target.value)}
				/>
			}

			{props.isEdit && props.type === fragmentTypes.game &&
				<div className={s.annotation}>
					<h3>Описание задания</h3>
					<textarea className={`textarea`}
					          value={props.task}
					          onChange={e => props.setTask(e.target.value)}/>
				</div>
			}

			{props.isEdit && props.type !== fragmentTypes.image &&
				<UploadFon setFon={props.setFon} fon={props.fon} type={'fragment'}/>
			}

			<div
				className={!(props.isEdit && (props.type === fragmentTypes.article || props.gameType === 'graphic_dictation'))
					? s.fragmentBlock
					: s.editBlock
				}>
				{props.type === fragmentTypes.article &&
					<>
						{!props.isEdit
							? <div dangerouslySetInnerHTML={{__html: props.content}} style={{marginBottom: '40px'}}/>
							: <TextEditor editorState={editorState} setEditorState={setContent}/>
						}
					</>
				}

				{props.type === fragmentTypes.video &&
					<VideoFragment
						video={props.content}
						setVideo={props.setContent}
						isEdit={props.isEdit}
					/>
				}

				{props.type === fragmentTypes.image &&
					<ImageFragment
						image={props.content}
						annotation={props.annotation}
						isEdit={props.isEdit}
						setImage={props.setContent}
						setAnnotation={props.setAnnotation}
					/>
				}

				{props.type === fragmentTypes.game &&
					<GameContainer
						content={props.content}
						isEdit={props.isEdit}
						cardSize={200}
						oldLinks={props.oldLinks}
						deleteImage={props.deleteImage}
						setContent={props.setContent}
					/>
				}

				{!props.isEdit &&
					<div className={s.author}>
						<NavLink className={s.creatorName} to={`/profile/${props.creatorId}`}>{props.creator}</NavLink>
						<img className={`avatar ${s.creatorAvatar}`} src={props.creatorAvatar || avatarPlaceholder}
						     alt="avatar"/>
					</div>
				}
			</div>
			{props.isEdit &&
				<div style={{marginBottom: "20px"}}>
					<AgeLimits ageLimitId={props.ageLimitId} setAgeLimit={props.setAgeLimit}/>
				</div>
			}
			<ThisTags
				tags={props.tags}
				edit={props.isEdit}
				deleteTag={props.deleteTag}
				returnTag={props.returnTag}
			/>
			{props.isEdit
				?
				<>
					<div className={s.buttonsBlock}>
						<TagsListContainer externalAddTag={props.addTag} currentTags={props.tags}>
							<button className={'btn'}>Добавить теги</button>
						</TagsListContainer>
						<button className={'btn'} onClick={props.editFragment}>Сохранить изменения</button>
					</div>
				</>
				: <ButtonsBlock
					id={props.id}
					creatorId={props.creatorId}
					favorite={props.favorite}
					favoriteFetching={props.favoriteFetching}
					deleteThis={props.deleteFragment}
					toggleFavorite={props.changeFavorite}
					toggleIsEdit={editToggle}
				/>
			}
			{deleteError &&
				<DeleteErrorModal
					isOpen={props.deleteErrorModal}
					error={deleteError}
					closeModal={props.closeDeleteErrorModal}
				/>
			}
		</div>
	)
}


export default Fragment;