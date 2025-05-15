import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import GetShift from  '../utilities/getShift'
 const currentDate = new Date().toLocaleDateString()
const products = [
  {
    name: 'ημερομηνια',
    desc: '',
    price: currentDate,
  },
  {
    name: 'βαρδια',
    desc: <GetShift />,
    price: '14:00-22:00',
  },
  
];

function Info({ totalPrice }) {
  return (
    <React.Fragment>
     
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 3, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;

