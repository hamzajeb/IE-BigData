import background from '../Assets/images/background1.jpg'
import * as React from 'react';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Cookies from 'js-cookie'
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { CreateCustomer } from '../Utils/CustomerRequest';
import Typography from '@mui/material/Typography';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TextField from '@mui/material/TextField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {  Button as Bt, Tooltip, Table ,ConfigProvider,Tag,FloatButton} from 'antd';
import { GetItems } from '../Utils/AuthRequest';

export default function Dashboard(){
return(
  <h1 style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>Dashboard</h1>
)
}
