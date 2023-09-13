import React from "react";
import { IndeterminateCheckboxProps } from "src/types/globalTypes";

const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({ indeterminate, ...rest }) => {
    const ref = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current!.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (<input type="checkbox" ref={ref} {...rest} />);
}

export default IndeterminateCheckbox;

