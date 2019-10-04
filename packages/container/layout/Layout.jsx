import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  Hidden,
  IconButton,
  Link as MLink,
  Tooltip,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import VisualizationIcon from '@material-ui/icons/RemoveRedEye';
import AlgorithmIcon from '@material-ui/icons/MergeType';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import NextIcon from '@material-ui/icons/NavigateNext';
import LastIcon from '@material-ui/icons/NavigateBefore';
import { withRouter } from 'next/router';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  dislike: {
    background: theme.palette.error.main,
    color: '#ffffff',
    margin: 8,
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  like: {
    background: theme.palette.primary.main,
    color: '#ffffff',
    margin: 8,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  next: {
    margin: '16px 8px 16px 8px',
  },
  back: {
    margin: '16px 8px 16px 8px',
  },
  home: {
    margin: '16px 16px 16px 32px',
  },
});

const NextStepButton = withRouter(({ router, classes }) => {
  const nextStep = Number(router.query.step || 0) + 1;
  const [next, setNext] = useState(true);
  fetch(`http://localhost:3001/${nextStep}`)
    .then((e) => setNext(e.status === 200))
    .catch(() => setNext(false));

  if (!next) {
    return null;
  }

  return (
    <Link href={`/?step=${nextStep}`}>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.next}
      >
        <Hidden xsDown>Continue</Hidden>
        <NextIcon />
      </Fab>
    </Link>
  );
});

const LastStepButton = withRouter(({ router, classes }) => {
  const lastStep = Number(router.query.step || 0) - 1;

  if (lastStep < 0) {
    return null;
  }

  return (
    <Link href={`/?step=${lastStep}`}>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.back}
      >
        <LastIcon />
        <Hidden xsDown>Back</Hidden>
      </Fab>
    </Link>
  );
});

function Layout({ children, classes }) {
  return (
    <div style={{ padding: 32 }}>
      <Card>
        <CardHeader
          title="AlgoVisio Project"
          subheader={(
            <span>
By&nbsp;
              <MLink>AlgoVisio User</MLink>
            </span>
                    )}
          action={(
            <>
              <Tooltip title="Algorithm"><IconButton aria-label="algorithm"><AlgorithmIcon /></IconButton></Tooltip>
              <Tooltip title="Visualization">
                <IconButton aria-label="visualization">
                  <VisualizationIcon />
                </IconButton>
              </Tooltip>
            </>
                    )}
        />
        <Divider />
        <CardContent>
          {
                        children
                    }
        </CardContent>
        <CardActions>
          <LastStepButton classes={classes} />
          <NextStepButton classes={classes} />
          <Fab
            variant="extended"
            size="medium"
            aria-label="home"
            className={classes.home}
          >
                        Home
          </Fab>
          <div style={{ marginLeft: 'auto' }}>
            <Fab
              size="medium"
              className={classes.like}
            >
              <LikeIcon />
            </Fab>
            <Fab
              size="medium"
              className={classes.dislike}
            >
              <DislikeIcon />
            </Fab>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

Layout.defaultProps = {
  children: <div />,
};

export default withStyles(styles)(Layout);
