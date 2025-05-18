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

export default function Erotiseis1({ answers, setAnswers }) {
  // metadata for each question
  const questions = [
    {
      id: 'erotisi1',
      label: 'εἶναι ὁ χώρος καθαρός;',
      type: 'select',
      options: ['καλα', 'μετρια', 'κακα'],
      placeholder: 'επελεξε?'
    },
    {
      id: 'erotisi2',
      label: 'υπάρχει κάποια ζημία στο πριόνι;',
      type: 'select',
      options: ['οχι', 'ναι'],
      placeholder: 'επελεξε?'
    },
    {
      id: 'paratiriseis',
      label: 'παρατηρήσεις',
      type: 'text',
      placeholder: 'εισαγετε παρατηρηση'
    }
  ];

  return (
    <Grid container spacing={3}>
      {questions.map((q) => (
        <FormGrid key={q.id} item xs={12}>
          <FormLabel htmlFor={q.id} required>
            {q.label}
          </FormLabel>

          {q.type === 'text' ? (
            <OutlinedInput
              id={q.id}
              name={q.id}
              value={answers[q.id]}
              placeholder={q.placeholder}
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
              fullWidth
              size="small"
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