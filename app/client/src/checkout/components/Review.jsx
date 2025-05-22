import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import getShifttime from '../utilities/getShifttime.jsx'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';  
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';



  
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
           <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign:'center' }} >
          Στοιχεία Εργαζομένου
        </Typography>
        <Grid container>
          {stoixeia.map((stoixeio) => (
            <Stack
              key={stoixeio.name}
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: '100%', mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {stoixeio.name}
              </Typography>
              <Typography variant="body2">
                {stoixeio.detail}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </CardContent>
    </Card>
          
        </div>
         <div>
           <TableContainer  sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ p: 2, textAlign: 'center', textDecoration: 'underline' }}>
  Αποτελέσματα
</Typography>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell>Ερώτηση</TableCell>
            <TableCell>Απάντηση</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {erotapantiseis.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" sx={{ color: 'text.secondary' }}>
                {row.name}
              </TableCell>
              <TableCell>{row.detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
        
   
      </Stack>
  
  );
}
