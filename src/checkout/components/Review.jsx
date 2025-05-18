import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import getShifttime from '../utilities/getShifttime.jsx'




  
export default function Review({firstName,lastName,thesiErgasias}) {
  const payments = [
  { name: 'Ονομα:', detail: firstName  },
  { name: 'Επίθετο:', detail: lastName},
  { name: 'Θέση εργασίας:', detail:thesiErgasias  },
  { name: 'βαρδια:', detail:getShifttime()  },
  ];
  return (
    <Stack spacing={2}>
    
        <div>
          <Typography variant="subtitle2" gutterBottom>
            στοιχεια Εργαζομενου
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
  
  );
}
