import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

type Props = {
  department: any;
};

const DepartmentForm: React.FC<Props> = ({ department }): JSX.Element => {

  return (
    <AccordionSummary
        sx={{mb:"20px"}}
        aria-controls='panel1a-content'
        id={`panel1a-header-${department._id}`}
      >
        
        <Typography>{department?.nameDepartment ?? null}</Typography>
      </AccordionSummary>
  );
};

export default DepartmentForm;
