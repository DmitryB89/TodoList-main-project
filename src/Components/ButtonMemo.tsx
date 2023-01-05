import React, {memo} from "react";
import {Button} from "@material-ui/core";

type ButtonMemoPropsType =
    {
        title: string
        color: 'inherit' | 'primary' | 'secondary' | 'default'
        variant: 'text' | 'outlined' | 'contained'
        onClick: () => void

    }
export const ButtonMemo = memo((props: ButtonMemoPropsType) => {

        const {title, color, variant, onClick} = props
        return (
            <Button variant={variant}
                    onClick={onClick}
                    color={color}
            >{title}
            </Button>
        )

    }
)