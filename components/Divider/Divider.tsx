import styles from "./Divider.module.css";
import cn from "classnames";
import {IDividerProps} from "./Divider.props";

export const Divider = ({className, ...props}: IDividerProps)=> {
    return(
        <hr className={cn(styles.hr, className)} {...props}/>
    )
};