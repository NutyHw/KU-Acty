import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(16),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: '33.33%',
    },
    textHead: {
        fontSize: 28,
        margin: theme.spacing(3, 0, 3),
    },
    activityList: {
        fontSize: theme.typography.pxToRem(15),
        marginLeft: theme.spacing(3),
    }
  }),
);