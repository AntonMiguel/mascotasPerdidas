import React from "react"
import { ErrorHandler } from "../utils/ErrorHandler"

interface FormRadioProps {
    label: string,
    errorHandler: ErrorHandler,
    checkedLost: boolean,
    checkedHome: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
}

export default function FormRadio(props: FormRadioProps) {
    return (
        <div className="form-group">
            <form>
                <label>{props.label}:</label><br/>
                <input 
                    style={{margin: "0px 2px 0px 30px"}} 
                    type="radio" id="atHome"
                    name="locationStatus" 
                    onChange={props.onChange}
                    value="atHome"
                    checked={props.checkedHome}/>
                <label htmlFor="atHome">En casa</label>
                <input 
                    style={{margin: "0px 2px 0px 30px"}} 
                    type="radio" 
                    id="lost"
                    name="locationStatus" 
                    onChange={props.onChange}
                    value="lost"
                    checked={props.checkedLost}/>
                <label htmlFor="lost">Perdida</label>
            </form>
        </div>
    )
}