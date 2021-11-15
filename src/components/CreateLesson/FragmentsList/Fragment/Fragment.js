import React from "react";
import s from './Fragment.module.css'
import {fragmentTypeImg} from "../../../../common/fragmentsPreview";

const Fragment = (props) => {
    const fragmentIsChecked = props.isFragmentChosen(props.fragment.id);
    return (
        <div style={{position: "relative"}}>
            {fragmentIsChecked && <div className={s.number}>{props.getFragmentNumber(props.fragment.id)}</div>}
            <div className={s.fragmentBlock}>
                <img src={fragmentTypeImg[props.fragment.type]} alt="type" className={s.fragmentType}/>
                <div className={s.title}>
                    {props.fragment.title}
                </div>
                <input className={s.checkbox}
                       type="checkbox"
                       checked={fragmentIsChecked}
                       onChange={() => {
                           if (fragmentIsChecked) {
                               props.deleteFragment(props.fragment.id)
                           } else {
                               props.addFragment(props.fragment)
                           }
                       }}
                />
            </div>
        </div>
    )
}

export default Fragment;