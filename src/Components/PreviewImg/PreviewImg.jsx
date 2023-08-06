import style from './PreviewImg.module.css';
import { URLWithoutGQL } from '../../constants';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export const PreviewImg = ({ arrImg, setArrImg }) => {
  const delImg = (idImg) => {
    const filterArrImg = [...arrImg].filter(objImg => objImg._id !== idImg);
    setArrImg(prevState => prevState = filterArrImg);
  };
  return (<>
      {arrImg?.length ? (
        <div className={style.imgsWrapper}>
          {arrImg.map(({ url, _id }) => (
            <div
              className={style.imgWrapper}
              key={_id}
            >
              <CloseIcon
                className={style.CloseIcon}
                onClick={() => delImg(_id)}
              />
              <img
                alt={_id}
                className={style.imgPreview}
                src={`${URLWithoutGQL}/${url}`}
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};


