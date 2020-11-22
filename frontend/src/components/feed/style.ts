import { makeStyles } from '@material-ui/core/styles';

//-------------------------------------- Styles Part ----------------------------

export const useStyles = makeStyles((theme) => ({
  head: {
    marginTop: theme.spacing(8),
    marginBottom: 16,
  },
  root: {
    background: "#eeeeee"
  },
  eventbox: {
    margin: theme.spacing(0, 0, 3),
    background: "#fafafa",
  },
  paper: {
    marginTop: 8,
    marginLeft: 12,
    marginBottom: 8,
  },
  headerText: {
    marginTop: theme.spacing(8),
    marginBottom: 16,
  },
  headerTextN: {
    marginTop: theme.spacing(16),
    marginBottom: 16,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '33.33%',
  },
  secondaryText: {
    fontSize: 15,
  },
  button: {
    marginTop: 8,
  },
}));

//-------------------------------------- End Styles Part --------------------------