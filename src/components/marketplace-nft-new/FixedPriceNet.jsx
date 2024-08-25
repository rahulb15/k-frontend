import React, { useState } from 'react';
import { Box, Typography, IconButton, Popover, Paper } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Table } from 'semantic-ui-react';
import { useRoyaltyRate } from 'src/hooks/SWR_Hooks';
import { compute_marketplace_fees, pretty_price } from '@utils/marmalade_common';
import Decimal from 'decimal.js';

const ZERO = new Decimal(0);

const FeeDetailsModal = ({ headers, gross, fees, total }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing />
          {headers.map((x, index) => (
            <Table.HeaderCell key={index}> {x} </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row positive>
          <Table.Cell> Gross price </Table.Cell>
          {gross.map((x, index) => (
            <Table.Cell key={index}> {x} </Table.Cell>
          ))}
        </Table.Row>

        {fees.map((fee_line, index) => (
          <Table.Row negative key={index}>
            {fee_line.map((x, cellIndex) => (
              <Table.Cell key={cellIndex}>{x}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell> Total </Table.HeaderCell>
          {total.map((x, index) => (
            <Table.HeaderCell key={index}> {x} </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

const FixedPriceNet = ({ sale_data, token_id, fee }) => {
    console.log("FixedPriceNet", sale_data, token_id, fee);
  const [anchorEl, setAnchorEl] = useState(null);
  const royalty_rate = useRoyaltyRate(token_id);
  const gross = sale_data?.price ?? ZERO;
  console.log("gross", gross);
  const mplace_fee = compute_marketplace_fees(gross, fee);
  const gross_after_mplace = gross.minus(mplace_fee);

  const royalty = royalty_rate.times(gross_after_mplace);
  const total = gross_after_mplace.minus(royalty);

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const details = (
    <FeeDetailsModal
      headers={['Fixed']}
      gross={[pretty_price(gross, 'coin')]}
      fees={[
        ['Marketplace', '- ' + pretty_price(mplace_fee, 'coin')],
        ['Royalty', '- ' + pretty_price(royalty, 'coin')],
      ]}
      total={[pretty_price(total, 'coin')]}
    />
  );

  return sale_data ? (
    <Box sx={{ mt: 2, position: 'relative' }}>
      <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant="body1">
          You will receive {pretty_price(total, 'coin')}
        </Typography>
        <IconButton
          size="small"
          onClick={handleInfoClick}
          sx={{ ml: 1 }}
          style={{
            width: '30px',
            height: '30px',
            padding: '0px',
            borderRadius: '50%',
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </Paper>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>{details}</Box>
      </Popover>
    </Box>
  ) : null;
};

export default FixedPriceNet;