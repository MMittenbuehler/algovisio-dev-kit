import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default () => (
  <div>
    <Typography variant="h5" color="error" align="center" style={{ marginTop: 16 }}>
                Not found
    </Typography>
    <Typography variant="body1" align="center">
                The visualization step you were looking for could not be found.
      <br />
                If you think this is AlgoVisio&apos;s fault, please

      <Link href="mailto:contact@algovisio.net">contact us</Link>
    </Typography>
  </div>
);
