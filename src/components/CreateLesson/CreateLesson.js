import React from "react";
import s from './CreateLesson.module.css';
import LessonTitle from "./LessonTitle/LessonTitle";
import ConstructorBlock from "./СonstructorBlock/СonstructorBlock";
import TagsListContainer from "../CreateFragment/TagsList/TagsListContainer";
import ThisTags from "../CreateFragment/ThisTags/ThisTags";
import LessonAnnotation from "./LessonAnnotation/LessonAnnotation";
import Preloader from "../../common/Preloader/Preloader";
import UploadFon from "./UloadFon/UploadFon";
import Tippy from "@tippyjs/react";


const CreateLesson = ({isFetching, annotation, ...props}) => {
	return (
		<div className={s.content}>
			<h1 className={'pageTitle'}>Создать урок</h1>
			<LessonTitle title={props.title} changeLessonTitle={props.changeLessonTitle} error={props.titleError}/>
			<UploadFon type={'lesson'} setFon={props.setFon} fon={props.fon}/>
			<LessonAnnotation annotation={annotation} changeAnnotation={props.changeAnnotation} error={props.annotationError}/>
			{isFetching
				? <Preloader size={200}/>
				: <>
					<ConstructorBlock fragments={props.lessonFragments} setFragments={props.setFragments} deleteFragment={props.deleteFragment}/>
					<p className={'inputError'}>{props.fragmentsError}</p>
					<ThisTags
						tags={props.tags}
						edit={true}
						returnTag={props.returnTag}
						deleteTag={props.deleteTag}
					/>
				</>
			}
			<div className={s.buttonsBlock}>
				<Tippy
					content={<TagsListContainer currentTags={props.tags} externalAddTag={props.addTag}/>}
					trigger='click'
					interactive={true}
					placement="right-start"
					className={s.tippy}
				>
					<button className={'btn'}>Добавить теги</button>
				</Tippy>
				{/*<button className={'btn'} onClick={() => setTags(!tags)}>Добавить теги</button>*/}
				<button className={'btn'} onClick={props.createLesson} disabled={isFetching}>Создать</button>
			</div>
			{/*{tags && <TagsListContainer currentTags={props.tags} externalAddTag={props.addTag}/>}*/}
		</div>
	);
}

export default CreateLesson;