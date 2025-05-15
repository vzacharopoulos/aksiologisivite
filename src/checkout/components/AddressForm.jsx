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
  setThesiErgasias
}) {

  

  const handleSubmit = () => {
    console.log("First Name:", setFirstName());
  };
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          ονομα 
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="John"
          autoComplete="first name"
          required
          size="small"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          επιθετο
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          placeholder="Snow"
          autoComplete="last name"
          required
          size="small"
           value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormGrid>
      

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
          onChange={(e) => setThesiErgasias(e.target.value)}
    >
      <MenuItem value="" disabled>
        διαλεξε θεση εργασιας
      </MenuItem>
      <MenuItem value="πριονι">πριονι</MenuItem>
      <MenuItem value="αφρος">αφρος</MenuItem>
      <MenuItem value="ρολλα">ρολλα</MenuItem>
    </Select>
  </FormControl>
</FormGrid>
      
    
    </Grid>
  );
  
}
