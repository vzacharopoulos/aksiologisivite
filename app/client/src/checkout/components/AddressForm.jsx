import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function  AddressForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  thesiErgasias,
  setThesiErgasias,
  handleThesiChange,
  Autofilloptions
  
}) {

  const [firstNameOptions, setFirstNameOptions] = React.useState([]);
  const [lastNameOptions, setLastNameOptions] = React.useState([]);
const [loadingNames, setLoadingNames] = React.useState(false);

React.useEffect(() => {
  if (thesiErgasias) {
    setLoadingNames(true);
    // Fetch first/last names for selected role:
    fetch(`query?thesi=${encodeURIComponent(thesiErgasias)}`)
      .then(res => res.json())
      .then(data => {
        // Extract first names list from response
        const firstNames = data.map(emp => emp.firstName);
        setFirstNameOptions(firstNames);
        const lastNames = data.map(emp => emp.lastName);
        setLastNameOptions(lastNames);
      })
      .catch(err => console.error("Failed to load employees:", err))
      .finally(() => setLoadingNames(false));
  } else {
    // No role selected, clear options
    setFirstNameOptions([]);
    setLastNameOptions([]);
  }
}, [thesiErgasias]);

  

  
  return (
    <Grid container spacing={4}>
    <Grid item xs={12} sm={6}
    sx={{
    width: {
      xs: '100%',   // full width on phones
      sm: '80%',    // 80% width on small devices
      md: '60%',    // 60% width on tablets
      lg: '50%',    // 50% width on desktops
    },
    mx: 'auto',    // center it horizontally
    mt: 2,         // optional top margin
  }}>
  <Autocomplete
  fullWidth
   size="medium"
    options={firstNameOptions}
    value={firstName}
    onChange={(event, newValue) => setFirstName(newValue ?? "")}
    freeSolo  /* allow free text in case name isn't in list */
    loading={loadingNames}
    renderInput={(params) => (
      <TextField 
        {...params} 
        label="Όνομα" 
        required 
      />
    )}
  />
</Grid>
<Grid item xs={12} sm={6}
sx={{
    width: {
      xs: '100%',   // full width on phones
      sm: '80%',    // 80% width on small devices
      md: '60%',    // 60% width on tablets
      lg: '50%',    // 50% width on desktops
    },
    mx: 'auto',    // center it horizontally
    mt: 2,         // optional top margin
  }}>
 <Autocomplete 
    options={lastNameOptions}
    value={lastName}
    onChange={(event, newValue) => setLastName(newValue ?? "")}
    freeSolo  /* allow free text in case name isn't in list */
    loading={loadingNames}
    renderInput={(params) => (
      <TextField 
      
        {...params} 
        label="Επίθετο" 
        required 
      />
    )}
  />
</Grid>

      
<Grid item xs={12} sm={6}
sx={{
    width: {
      xs: '100%',   // full width on phones
      sm: '80%',    // 80% width on small devices
      md: '60%',    // 60% width on tablets
      lg: '50%',    // 50% width on desktops
    },
    mx: '26%',    // center it horizontally
    mt: 2,         // optional top margin
  }}>
<FormGrid size={{ xs: 12 }}>
  <FormLabel htmlFor="thesiergasias" required>
    θέση εργασίας
  </FormLabel>
  <FormControl fullWidth required size="small">
    <Select
      id="thesiergasias"
      name="thesiergasias"
      defaultValue=""
      displayEmpty
      inputProps={{ 'aria-label': 'Address line 1' }}
       value={thesiErgasias}
          onChange={(e) => {const value = e.target.value;
            handleThesiChange(value);
             
            }}// or use conditionally: value === "πριονι" etc.
         
    >
      <MenuItem value="" disabled>
        διάλεξε θέση εργασίας
      </MenuItem>
      <MenuItem value="πριόνι">πριόνι</MenuItem>
      <MenuItem value="αφρός">αφρός</MenuItem>
      <MenuItem value="ρολλά">ρολλά</MenuItem>
      <MenuItem value="άλλο">άλλο</MenuItem>
    </Select>
  </FormControl>
</FormGrid>
      
    
    </Grid>
    </Grid>
  );
  
}
