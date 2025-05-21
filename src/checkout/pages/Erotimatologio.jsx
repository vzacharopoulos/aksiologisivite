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





export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [answers, setAnswers] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [date, setDate] = React.useState();
  const [submitFormSuccess, setSubmitFormSuccess] = React.useState(false);

 const [thesiErgasias, setThesiErgasias] = React.useState("");
 const [fieldErrors, setFieldErrors] = React.useState({
  firstName: false,
  lastName: false,
  thesiErgasias: false,
});
 const steps = ['στοιχεία εργαζομένου', 'ερωτηματολόγιο', 'επιβεβαίωση'];
 var currentShift=GetShift()
 const submitForm = async () => {;
const labeledQuestions = questions.map(q => ({
      id:    q.id,
      label: q.label,
      /*answer: answers[q.id]*/   // grab the value they selected/typed
    }))
  const today      = new Date();
  const sqlDate = today.toISOString().slice(0, 10);  // "YYYY-MM-DD"
    
  const payload = {
    firstName,
    lastName,
    thesiErgasias,
    sqlDate,
    currentShift,
    labeledQuestions,
    answersArray: Object.entries(answers).map(
    ([questionId, answer]) => ({ questionId, answer })
  )
   
  
  }
    console.log('Payload being sent:', payload);

    const response = await fetch('/submit', {
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
      throw new Error('Failed to submite');
      
    }
    
   
    
    alert('Your form was submitted!');
    setSubmitFormSuccess(true)
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong.');
  }
};
 // when the user picks a job, also build the questions array
 const handleThesiChange = (value) => {
   setThesiErgasias(value);
   let qs = [];
   if (value === "πριόνι") {
     qs = [
       { id: 'erotisiprioni1', label: 'είναι ο χώρος καθαρός στο πριόνι;', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'erotisiprioni2', label: 'είναι ο χώρος καθαρός στο τυλιχτικο;', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'erotisiprioni33', label: 'είναι ο χώρος καθαρός στον πακεταδορο;', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'erotisiprioni4', label: 'υπάρχει κάποια ζημία;', type:'select', options:['οχι','ναι'], placeholder:'επελεξε' },
       { id: 'erotisiprioni5', label: 'υπάρχουν πολυουρεθάνες ή άλλα χημικά στο δάπεδο?', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'erotisiprioni6', label: 'θεωρείτε πως υπάρχει κατι απο την προηγούμενη βάρδια που σας δημιουργησε προβλημα?', type:'select', options:['ναι','οχι'], placeholder:'επελεξε' },
       { id: 'paratiriseisprioni1', label: 'παρατηρήσεις', type:'text', placeholder:'εισαγετε παρατηρηση' },
     ];
   } else if (value === "αφρός") {
     qs = [
       { id: 'erotisiafros1', label: 'είναι ὁ χώρος καθαρός στο χώρο ευθύνης σας;', type:'select', options:['καλά','μέτρια','κακά'], placeholder:'επελεξε' },
       { id: 'erotisiafros2', label: 'υπάρχει επάρκεια στις α ύλες', type:'select', options:['οχι','ναι'], placeholder:'επελεξε' },
       { id: 'erotisiafros3', label: 'είναι ο χώρος των δεξαμενών καθαρός;', type:'select', options:['οχι','ναι'], placeholder:'επελεξε' },
       { id: 'paratiriseisafros1', label: 'παρατηρήσεις', type:'text', placeholder:'εισαγετε παρατηρηση' },
     ];
   } else if (value === "ρολλά") {
     qs = [
       { id: 'erotisi1rolla', label: 'είναι ὁ χώρος καθαρός στο χώρο ευθύνης σας;', type:'select', options:['καλά','μέτρια','κακά'], placeholder:'επελεξε' },
       { id: 'erotisi2rolla', label: 'έγινε κάποια ζημιά που δεν αναφέρθηκε?', type:'select', options:['οχι','ναι'], placeholder:'επελεξε?' },
       { id: 'erotisi3rolla', label: 'χρειάζεται να φύγουν χάρτινα ρολλά απο τον χώρο εκφόρτωσης', type:'select', options:['οχι','ναι'], placeholder:'επελεξε?' },
       { id: 'erotisi4rolla', label: 'εχει γινει απαραιτητη προετοιμασία για τα προς παραγωγή ρολά απο την προηγούμενη βάρδια', type:'select', options:['οχι','ναι'], placeholder:'επελεξε?' },
       { id: 'erotisi5rolla', label: 'εχει γινει απαραιτητη ενημέρωση για αναμενόμενες παραλαβές ρολλών', type:'select', options:['οχι','ναι'], placeholder:'επελεξε?' },
       
       { id: 'paratiriseisrolla1', label: 'παρατηρήσεις', type:'text', placeholder:'εισάγετε παρατήρηση' },
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
            <Info
            date={date}
            setDate={setDate}
       totalPrice={activeStep >= 2 ? 'καταχώρηση απαντησεων' : 'ερωτηματολόγιο'} />
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
                  ερωτηματολόγιο 
                </Typography>
                <Typography variant="body1">
                  {activeStep === 1 ? 'Βήμα 2' : activeStep >= 2 ? 'καταχώρηση απαντήσεων' : 'Βημα 1'}
                </Typography>
              </div>
              <InfoMobile totalPrice={activeStep >= 2 ? 'καταχώρηση απαντησεων' : 'ερωτηματολόγιο'} />
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
             < SubmissionConfirmation
       submitFormSuccess={submitFormSuccess}
             
             />
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
                      προηγούμενο
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
                      προηγούμενο
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'καταχώρηση απαντήσεων' : 'επόμενο'}
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
