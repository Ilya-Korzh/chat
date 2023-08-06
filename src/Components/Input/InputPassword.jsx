import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export  function InputPassword({ password, setPassword }) {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (<FormControl sx={{ m: 1, width: '50ch', color:'red' }} variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password" sx={{color: "#0f7dc6" }}>Password</InputLabel>
    <OutlinedInput
      sx={{
        color: "#0f7dc6",
        boxShadow: '0 0 5px 5px rgba(29, 162, 216, 0.2)',
      }}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={<InputAdornment position="end">
        <IconButton
          sx={{color: "#0f7dc6" }}
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
        >
      {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        </InputAdornment>}
        label="Password"
        />
        </FormControl>);}
