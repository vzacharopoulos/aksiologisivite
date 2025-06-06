import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import getShifttime from '../utilities/getShifttime.jsx'




  
export default function Review({
  firstName,
  lastName,
  thesiErgasias,
  questions = [],    
  answers = {},      
}) {
  const stoixeia = [
  { name: 'όνομα:', detail: firstName  },
  { name: 'Επίθετο:', detail: lastName},
  { name: 'Θέση εργασίας:', detail:thesiErgasias  },
  { name: 'βάρδια:', detail:getShifttime()  },
  ]
   
   const erotapantiseis = [
  
    ...questions.map((q) => ({
      name: q.label,
      detail: answers[q.id] ?? '–',
    })),


  ];
  return (
    <Stack spacing={2}>
    
        <div>
          <Typography variant="h6" gutterBottom>
            Στοιχεία Εργαζομένου
          </Typography>
          <Grid container>
            {stoixeia.map((stoixeio) => (
              <React.Fragment key={stoixeia.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {stoixeio.name}
                  </Typography>
                  <Typography variant="body2">{stoixeio.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
            
          </Grid>
          
        </div>
         <div>
          <Typography variant="subtitle1" gutterBottom>
            Απαντήσεις
          </Typography>
          <Grid container>
            {erotapantiseis.map((erotapantisi) => (
              <React.Fragment key={erotapantisi.name}>
                <Stack
                  direction="row"
                  spacing={2}
                  useFlexGap
                  sx={{ width: '100%', mb: 2 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {erotapantisi.name}
                  </Typography>
                  <Typography variant="body2" >{erotapantisi.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
            
          </Grid>
          
        </div>
        
   
      </Stack>
  
  );
}
