import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

export function InputLogin({ value, setValue, text }) {
  return (<FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
    <InputLabel htmlFor="outlined-adornment-login" sx={{ color: "#0f7dc6" }}> {text} </InputLabel>
    <OutlinedInput
      sx={{
        boxShadow: '0 0 5px 5px rgba(29, 162, 216, 0.2)', color: "#0f7dc6"
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      id="outlined-adornment-login"
      type="text"

    />
  </FormControl>);
}
