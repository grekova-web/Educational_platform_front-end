import React from "react";
import s from './FragmentTitle.module.css';
import {connect} from "react-redux";
import {changeFragmentTitle} from "../../../redux/createFragmentReducer";


const rightWords = (fragment) => {
	switch (fragment) {
		case 'article':
			return 'вашей статьи';
		case 'test':
			return 'вашего теста';
		case 'video':
			return 'вашего видеоролика';

		default:
			return '';
	}
}

const FragmentTitle = (props) => {
	return (
		<div className={s.fragmentTitleBlock}>
			<div className={s.preTitle}>Название {rightWords(props.fragmentType)}</div>
			<input
				type="text"
				name={'fragmentTitle'}
				className={s.fragmentTitle}
				value={props.title}
				onChange={e => props.changeFragmentTitle(e.target.value)}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	fragmentType: state.createFragment.fragmentType,
	title: state.createFragment.title
});

export default connect(mapStateToProps, {changeFragmentTitle})(FragmentTitle);