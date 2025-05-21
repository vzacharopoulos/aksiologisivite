import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



export default function  SubmissionConfirmation({submitFormSuccess}){
let confirmationPanel = null;
  if (submitFormSuccess === true) {
    confirmationPanel = (
      <Stack spacing={2} useFlexGap>
        <Typography variant="h1">📦</Typography>
        <Typography variant="h5">οι απαντησεις σας καταχωρηθηκαν</Typography>
        <Button
          variant="contained"
          onClick={handleStart}
          sx={{ alignSelf: 'start' }}
        >
          επιστροφη στην αρχικη
        </Button>
      </Stack>
    );
  } else if (submitFormSuccess === false) {
    confirmationPanel = (
      <Stack spacing={2} useFlexGap>
        <Typography variant="h1">⚠️</Typography>
        <Typography variant="h5">οι απαντησεις δεν καταχωρηθηκαν</Typography>
        <Button
          variant="contained"
          onClick={handleStart}
          sx={{ alignSelf: 'start' }}
        >
          επιστροφη στην αρχικη
        </Button>
      </Stack>
    );
  }
}