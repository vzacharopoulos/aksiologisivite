import * as React from 'react';
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

export default function Erotiseis() {
  return (
    <Grid container spacing={3}>
      
      

<FormGrid size={{ xs: 12 }}>
  <FormLabel htmlFor="erotisi1" required>
    ειναι ο χωρος καθαρος?
  </FormLabel>
  <FormControl fullWidth required size="small">
    <Select
      id="erotisi1"
      name="erotisi1"
      defaultValue=""
      displayEmpty
      inputProps={{ 'aria-label': 'Address line 1' }}
    >
      <MenuItem value="" disabled>
        επελεξε?
      </MenuItem>
      <MenuItem value="καλα">καλα</MenuItem>
      <MenuItem value="μετρια">μετρια</MenuItem>
      <MenuItem value="κακα">κακα</MenuItem>
    </Select>
  </FormControl>
</FormGrid>
<FormGrid size={{ xs: 12 }}>
  <FormLabel htmlFor="erotisi2" required>
    υπαρχει καποια ζημια?
  </FormLabel>
  <FormControl fullWidth required size="small">
    <Select
      id="erotisi2"
      name="erotisi2"
      defaultValue=""
      displayEmpty
      inputProps={{ 'aria-label': 'Address line 1' }}
    >
      <MenuItem value="" disabled>
        επελεξε
      </MenuItem>
      <MenuItem value="οχι">οχι</MenuItem>
      <MenuItem value="ναι">ναι</MenuItem>
      
    </Select>
  </FormControl>
</FormGrid>

<FormGrid size={{ xs: 6, md: 20 }}>
        <FormLabel htmlFor="first-name" required>
          παρατηρησεις 
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="εισαγετε παρατηρηση"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      
    
    </Grid>
  );
}