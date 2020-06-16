import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import "../styles.css"
import {loadPet} from "./petsService"
import FormButtonBar from "../common/components/FormButtonBar"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

export default function LostPetMessages(props: RouteComponentProps<{ id: string }>) {
    const [name, setName] = useState("")
    const [locationMessages, setLocationMessages] = useState<string[]>([])
    const errorHandler = useErrorHandler()

    const loadPetById = async (id: string) => {
        if (id) {
            try {
                const result = await loadPet(id)
                setName(result.name)
                if (result.locationMessages!== undefined){
                    setLocationMessages(result.locationMessages)
                }
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const goToPets = async () => {
        props.history.push("/pets")
    }

    useEffect(() => {
        const id  = props.match.params.id
        if (id) {
            void loadPetById(id)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Mensajes sobre paradero de {name}</FormTitle>
            <table id="mascotas" className="table">

                <tbody>
                {locationMessages.map((oneMessage, i) => {
                        return (
                            <tr key={i}>
                                <td>{oneMessage}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <FormButtonBar>
                <FormButton label="Volver" onClick={() => goToPets()} />
            </FormButtonBar>
        </GlobalContent>
    )
}
