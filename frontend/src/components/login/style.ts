import { makeStyles } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

//-------------------------------------- Styles Part ----------------------------
export const GreenTypography = withStyles({
  root: {
    fontSize: 90,
    color: "#197C4F",
  }
})(Typography);

export const GreenDesc = withStyles({
  root: {
    color: "#197C4F",
  }
})(Typography);

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  login: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    margin: theme.spacing(0, 0, 1),
  }
}));
//-------------------------------------- End Styles Part ------------------------
