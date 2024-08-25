import React, { useState } from 'react';
import { Grid, Form } from 'semantic-ui-react';
import { Box, Typography, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    height: '40px',
    width: '100%',
    border: '1px solid #ced4da',
    '& fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const DecimalPriceField = ({ name, onChange, disabled, error }) => {
  const [isError, setIsError] = useState(true);
  const setValue = (x) => {
    try {
      const v = parseFloat(x);
      if (v > 0) {
        setIsError(false);
        onChange(v);
      } else {
        setIsError(true);
        onChange(null);
      }
    } catch (error) {
      setIsError(true);
      onChange(null);
    }
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <Form.Input
        label={<label style={{ fontSize: '16px' }}>{name + ' (KDA)'}</label>}
        disabled={disabled}
        error={isError || error}
        placeholder={name}
        onChange={(e) => setValue(e.target.value)}
        style={{
          border: isError ? '1px solid red' : '1px solid green',
          width: '50%',
          margin: '5px',
          borderRadius: '5px',
          height: '40px',
          padding: '5px',
        }}
      />
    </div>
  );
};

const NoTimeoutDatePicker = ({ value, onChange, disabled }) => {
  const [isNoTimeout, setIsNoTimeout] = useState(value == null);
  const [lastDate, setLastDate] = useState(dayjs());

  const handleNoTimeoutChange = (event) => {
    setIsNoTimeout(event.target.checked);
    if (event.target.checked) {
      onChange(null);
      setLastDate(value);
    } else {
      onChange(lastDate);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Form.Checkbox
          label="Unlimited sale"
          checked={isNoTimeout}
          onChange={handleNoTimeoutChange}
          disabled={disabled}
        />
        <Tooltip title="When choosing an Unlimited sale, timeout will be disabled. Seller can close the sale at any time." arrow>
          <HelpOutlineIcon fontSize="small" sx={{ ml: 1, color: 'text.secondary', cursor: 'pointer' }} />
        </Tooltip>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          End date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDateTimePicker
            disabled={isNoTimeout || disabled}
            value={dayjs(value)}
            onChange={(newValue) => onChange(dayjs(newValue))}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

const FixedPriceSellForm = ({ disabled, onChange }) => {
  const [price, setPrice] = useState(null);
  const [toDate, setToDate] = useState(dayjs());

  const handleChange = () => {
    if (price) {
      onChange({ price, tout: toDate });
    }
  };

  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={7}>
          <DecimalPriceField
            name="Sell price"
            disabled={disabled}
            onChange={(newPrice) => {
              setPrice(newPrice);
              handleChange();
            }}
          />
        </Grid.Column>
        <Grid.Column width={9}>
          <NoTimeoutDatePicker
            value={toDate}
            onChange={(newDate) => {
              setToDate(newDate);
              handleChange();
            }}
            disabled={disabled}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FixedPriceSellForm;