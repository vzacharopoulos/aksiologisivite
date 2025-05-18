import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Erotiseis({questions, answers, setAnswers }) {
  
  

  return (
    <Grid container rowSpacing={3} columnSpacing={40}>
      {questions.map((q) => (
        <FormGrid key={q.id} item xs={12}>
          <FormLabel htmlFor={q.id} required={q.type !== 'text'}>
            {q.label}
          </FormLabel>

          {q.type === 'text' ? (
            <TextField
            id={q.id}
            name={q.id}
            value={answers[q.id]}
            placeholder={q.placeholder}
            onChange={(e) =>
            setAnswers({ ...answers, [q.id]: e.target.value })
            }
            fullWidth
            variant="filled"
            size="small"
            multiline
            rows={5}
            sx={{ width: '70ch' }}           
/>

          ) : (
            <FormControl fullWidth required size="small">
              <Select
                id={q.id}
                name={q.id}
                value={answers[q.id]}
                displayEmpty
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
                inputProps={{ 'aria-label': q.label }}
              >
                <MenuItem value="" disabled>
                  {q.placeholder}
                </MenuItem>
                {q.options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </FormGrid>
      ))}
    </Grid>
  );
}