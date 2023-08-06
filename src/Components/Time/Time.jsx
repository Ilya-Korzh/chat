import style from "./Time.module.css"
export const Time = ({ time }) => {

  const timestamp = Number(time);
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedHours = hours;
  let period = 'AM';

  if (formattedHours >= 12) {
    formattedHours -= 12;
    period = 'PM';
  }

  if (formattedHours === 0) {
    formattedHours = 12;
  }

  return (<span className={style.time}>{formattedHours + ':' + minutes.toString().padStart(2, '0') + ' ' + period}</span>);
};
