import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from '../components/AddressForm';
import Info from '../components/Info';
import InfoMobile from '../components/InfoMobile';
import Erotiseis from '../components/Erotiseis.jsx';
import Review from '../components/Review';
import SitemarkIcon from '../components/SitemarkIcon';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import GetShift from '../utilities/getShift.jsx'

import { useEffect } from 'react';



export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [answers, setAnswers] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
 
 const [thesiErgasias, setThesiErgasias] = React.useState("");
 const steps = ['στοιχεια εργαζομενου', 'ερωτηματολογιο', 'επιβεβαιωση'];
 var currentShift=GetShift()
 const submitForm = async () => {
   const labeledQuestions = questions.reduce((acc, q, idx) => {
    acc[`question${idx + 1}`] = q.label;
    return acc;
  }, {} );
// => [ { label: "Foo" }, { label: "Bar" }, … ]
  const payload = {
    firstName,
    lastName,
    thesiErgasias,
    currentShift,
    ...labeledQuestions,
    ...answers,
  
  };
   
  
    const response = await fetch(' 	https://webhook.site/b39db0b5-bace-4d39-a96a-e1018a103fbb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
      const text = await response.text(); // ⬅️ Try reading as plain text first
      console.log('Raw response:', text);
   try{
    if (!response.ok) {
      throw new Error('Failed to submit');
    }

   
    
    alert('Your form was submitted!');
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong.');
  }
};
 // when the user picks a job, also build the questions array
 const handleThesiChange = (value) => {
   setThesiErgasias(value);
   let qs = [];
   if (value === "πριονι") {
     qs = [
       { id: 'erotisi1', label: 'είναι ο χώρος καθαρός στο πριόνι;', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
        { id: 'erotisi2', label: 'είναι ο χώρος καθαρός στο τυλιχτικο;', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
        { id: 'erotisi3', label: 'είναι ο χώρος καθαρός στον πακεταδορο;', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'erotisi4', label: 'υπάρχει κάποια ζημία;', type:'select', options:['οχι','ναι'], placeholder:'επελεξε' },
       { id: 'erotisi5', label: 'υπάρχουν πολυουρεθάνες ή άλλα χημικά στο δάπεδο?', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'erotisi6', label: 'θεωρείτε πως υπάρχει κατι απο την προηγούμενη βάρδια που σας δημιουργησε προβλημα?', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'paratiriseis', label: 'παρατηρήσεις', type:'text', placeholder:'εισαγετε παρατηρηση' },
     ];
   } else if (value === "αφρος") {
     qs = [
       { id: 'erotisi1', label: 'εἶναι ὁ χώρος καθαρός;', type:'select', options:['καλα','μετρια','κακα'], placeholder:'επελεξε' },
       { id: 'erotisi2', label: 'υπάρχει ζημία στα χημικά;', type:'select', options:['οχι','ναι'], placeholder:'επελεξε' },
       { id: 'paratiriseis', label: 'παρατηρήσεις', type:'text', placeholder:'εισαγετε παρατηρηση' },
     ];
   } else if (value === "ρολλα") {
     qs = [
       { id: 'erotisi1', label: 'εἶναι ὁ χώρος καθαρός;', type:'select', options:['καλα','μετρια','κακα'], placeholder:'επελεξε' },
       { id: 'erotisi2', label: 'υπάρχει ζημία στα ρολλά;', type:'select', options:['οχι','ναι'], placeholder:'επελεξε?' },
       { id: 'paratiriseis', label: 'παρατηρήσεις', type:'text', placeholder:'εισαγετε παρατηρηση' },
     ];
   }
   setAnswers(qs.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {}));
   setQuestions(qs);
 };

 


function getStepContent(step) {
  switch (step) {
    case 0:
      return (
      <AddressForm
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      thesiErgasias={thesiErgasias}
      setThesiErgasias={handleThesiChange}
      
    />);
    /*make a useffect and for set prioni*/
    case 1: {
      
 if (questions.length > 0) {
         return <Erotiseis questions={questions}  answers={answers} setAnswers={setAnswers} />;
        }
     else {
      return (
        <Grid item xs={12}>
          <p>⚠️ Σφάλμα: δεν επιλέχθηκε σωστή θέση εργασίας.</p>
        </Grid>
      );
    
  
    }  
  
}
    
    case 2:
      return <Review 
      firstName={firstName}
      lastName={lastName}
      thesiErgasias={thesiErgasias}
      questions={questions}
      answers={answers}
      />;
      
          
      
    default:
      throw new Error('Unknown step');
  }
}
  const handleNext = () => {
    if (
      (!firstName.trim()|| !lastName.trim() ||!thesiErgasias.trim())  &&
      activeStep === 0)
     {
      alert("Συμπλήρωσε όλα τα πεδία πριν συνεχίσεις."); 
    }
else{
    setActiveStep(activeStep + 1);
}
  };  
  
  const handleBack = () => {
    setActiveStep(activeStep - 1)};

  const handleStart = ()=> {
      setActiveStep(activeStep -3)
    };
    const handleSubmit = () => {
  submitForm();       // Send to API
  setActiveStep(3);   // Show confirmation or navigate if needed
};
    
    
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid
        container
        sx={{
          height: {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <SitemarkIcon />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Info totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? '$144.97' : '$134.98'}
                </Typography>
              </div>
              <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">οι απαντησεις σας καταχωρηθηκαν</Typography>
                
                <Button
                  variant="contained"
                  sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                  onClick={handleStart}
                > 
                  επιστροφη στην αρχικη
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      προηγουμενο
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      προηγουμενο
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'καταχωρηση απαντησεων' : 'επομενο'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
