import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function TryForm(props) {
  const matches = useMediaQuery('(max-width:320px)');

  return props.width(matches);
}