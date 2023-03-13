import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

type Props = {
  user: any;
};

const ManagerForm: React.FC<Props> = ({ user }): JSX.Element => {

  return (
    <AccordionSummary
        sx={{mb:"20px"}}
        aria-controls='panel1a-content'
        id={`panel1a-header-${user._id}`}
      >
        <Typography>{user?.username ?? null}</Typography>
      </AccordionSummary>
  );
};

export default ManagerForm;
