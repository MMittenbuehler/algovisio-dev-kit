import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default () => (
  <div>
    <Typography variant="h5">Hello World</Typography>
    <Typography variant="body1">
            Welcome to your AlgoVisio dev environment.
      <br />
      <br />
            Learn more:&nbsp;

      <Link href="https://algovisio.net/docs" target="_blank">Docs</Link>
    </Typography>
  </div>
);
