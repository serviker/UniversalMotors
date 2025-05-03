import React from "react";
import {Badge, Button} from "react-bootstrap";
import styles from "./button.module.css"

const Buttontable = ({ variant, name, badge , onClick}) => {
   return (
       <Button onClick={onClick} variant={variant} size="small" className={styles.buttontable}>
          {name}
           <Badge className={styles.badge} bg="secondary">{badge}</Badge>
       </Button>
   );
};

export default Buttontable;
