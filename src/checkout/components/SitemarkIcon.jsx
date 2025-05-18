import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import logoUrl from './arkhon_logo.svg';

export default function Header() {
  return (
    <header>
      <img src={logoUrl} alt="Arkhon Logo" style={{ width: 200, height: 80 }} />
    </header>
  );
}
