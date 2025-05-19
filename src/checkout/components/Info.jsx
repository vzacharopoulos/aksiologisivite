import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import GetShift from  '../utilities/getShift';
import GetShifttime from  '../utilities/getShifttime';
 const currentDate = new Date().toLocaleDateString()
const products = [
  {
    name: 'ημερομηνία',
    desc: '',
    price: currentDate,
  },
  {
    name: 'βάρδια',
    desc: <GetShift />,
    price: <GetShifttime />,
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

