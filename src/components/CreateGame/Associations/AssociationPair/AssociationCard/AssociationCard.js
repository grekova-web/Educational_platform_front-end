import React, {useState} from 'react';
import s from './AssociationCard.module.css';

const AssociationCard = (props) => {
    let pairId = props.pairId;
    let imageId = props.imageId;
    const [imageSrc, setImageSrc] = useState(props.image !== '' ? props.image: undefined);

    return (
        <div>
            <input
                type="file"
                accept={'image/*'}
                id={`${pairId}_${imageId}`}
                className={'hide'}
                onChange={e => {
                    e.preventDefault();
                    props.setAssociation(e.target.files[0], pairId, imageId);
                    setImageSrc(URL.createObjectURL(e.target.files[0]));
                }}
            />
            {
                !imageSrc ?
                    <label htmlFor={`${pairId}_${imageId}`}
                           className={s.uploadPreview}>Добавьте изображение для создания пары</label> :
                    <div className={s.imagePreview} onClick={event => {
                        if (props.isNew) {
                            event.preventDefault();
                            props.setAssociation('', pairId, imageId);
                            setImageSrc(undefined);
                        }
                    }}>
                        <div className={props.isNew && s.cross}/>
                        <img className={s.image} src={imageSrc} alt="" style={{cursor: props.isNew ? 'pointer' : 'default'}}/>
                    </div>
            }
        </div>
    );
};

export default AssociationCard;