import {profileAPI} from "../api/api";
const CHANGE_FIELD = 'CHANGE_FIELD';
const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM';
const SET_PROFILE = 'SET_PROFILE';
const SHOW_PASSWORD_FORM = 'SHOW_PASSWORD_FORM';
const SET_AVATAR = 'SET_AVATAR';

const initState = {
	showProfileForm: true,
	showPasswordForm: false,
	name: null,
	birthday: null,
	email: null,
	id: null,
	role: null,
	password: null,
	avatar: null
};


const profileReducer = (state = initState, action) => {
	switch (action.type) {
		case CHANGE_FIELD:
			return {
				...state,
				[action.field]: action.newValue
			};

		case SHOW_EDIT_FORM:
			return {
				...state,
				showProfileForm: !state.showProfileForm
			};

		case SHOW_PASSWORD_FORM:
			return {
				...state,
				showPasswordForm: !state.showPasswordForm
			};

		case SET_PROFILE:
			const date = action.birthday.split('.');
			return {
				...state,
				name: action.name,
				birthday: `${date[2]}-${date[1]}-${date[0]}`,
				email: action.email,
				id: action.id,
				role: action.role
			};

		case SET_AVATAR:
			return {
				...state,
				avatar: action.avatar
			};

		default:
			return state;
	}
};

export const changeField = (field, newValue) => {
	return {
		type: CHANGE_FIELD,
		field,
		newValue
	}
};

const setProfile = (name, birthday, email, id, role) => {
	return {
		type: SET_PROFILE,
		name,
		birthday,
		email,
		id,
		role
	};
};

const setAvatar = (avatar) => {
	return {
		type: SET_AVATAR,
		avatar
	};
};

export const showProfileForm = () => {
	return {
		type: SHOW_EDIT_FORM
	};
};
export const showPasswordForm = () => {
	return {
		type: SHOW_PASSWORD_FORM
	};
};

export const getProfile = (tokenType, token) => (dispatch) => {
	profileAPI.getProfile(tokenType, token)
		.then(res => {
			console.log(res);
			dispatch(setProfile(
				res.data.user.name,
				res.data.user.birthday,
				res.data.user.email,
				res.data.user.id,
				res.data.user.role));
		})
		.catch(err => console.log(err.response));
};

export const updateProfile = (tokenType, token, name, birthday) => (dispatch) => {
	profileAPI.updateProfile(tokenType, token, name, birthday)
		.then(res => {
			console.log(res);
			dispatch(setProfile(
				res.data.user.name,
				res.data.user.birthday,
				res.data.user.email,
				res.data.user.id,
				res.data.user.role));
		})
		.catch(err => console.log(err.response));
};

export const updateAvatar = (tokenType, token, avatar) => (dispatch) => {
	profileAPI.updateAvatar(tokenType, token, avatar)
		.then(res => {
			dispatch(setAvatar(res.data.avatar));
		})
};

export default profileReducer;