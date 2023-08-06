import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)`
  label {
    color: #0f7dc6;
  }
  margin-bottom: 20px;

  .MuiInputBase-input {
    color: #0f7dc6; 
  }
`;

export function Input({ placeHolder,keyPress, value, setValue, text }) {
  return (
    <StyledTextField
      label={text}
      variant="outlined"
      value={value}
      onKeyPress={keyPress}
      onChange={(e) => setValue(e.target.value)}
      id="outlined-adornment-login"
      type="text"
      autoComplete="off"
      size="small"
      placeholder={placeHolder}
      sx={{
        boxShadow: '0 0 5px 5px rgba(29, 162, 216, 0.2)',
        mt: '10px',
        borderRadius: '5px',
      }}
    />
  );
}

export default Input;
