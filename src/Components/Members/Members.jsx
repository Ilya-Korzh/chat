import style from "./Membeers.module.css"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export const Members = ({ members,setMembers }) => {

  const deleteMember = ({ memberLogin }) => {
    const updatedMembers = { ...members };
    delete updatedMembers[memberLogin];
    setMembers(updatedMembers);
  };
  return (
    <div className={style.wrapperMembers}>
      {Object.keys(members).map(memberLogin => (
        <div key={memberLogin} className={style.wrapperMemberLogin}>
          <div  > {memberLogin} </div>
        <DeleteOutlineIcon

      onClick={(event) => {
        deleteMember({ memberLogin });
      }}
    />
        </div>
      ))}
    </div>
  );
};
