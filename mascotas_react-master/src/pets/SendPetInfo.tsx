import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import "../styles.css"
import { addLostPetMessage} from "./petsService"
import { getCurrentProfile} from "../profile/profileService"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

export default function SendPetInfo(props: RouteComponentProps<{ id: string }>) {
    const [petId, setPetId] = useState("")
    const [message, setMessage] = useState("")
    const [author, setAuthor] = useState("")
    const errorHandler = useErrorHandler()

    const loadPetById = async (id: string) => {
        if (id) {
            try {
                setPetId(id)
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const loadAuthor = async () => {
            try {
                const result = await getCurrentProfile()
                setAuthor(result.name)
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
    }

    const sendClick = async () => {
        errorHandler.cleanRestValidations()
        if (!message) {
            errorHandler.addError("message", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }
        try {
            await addLostPetMessage( petId, author+": "+message, "lostWithInfo")
            props.history.push("/lostPets")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        const id  = props.match.params.id
        if (id) {
            void loadPetById(id)
            void loadAuthor()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Enviar info de paradero</FormTitle>
            <Form>
                <FormInput
                    label="Mensaje"
                    name="message"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    errorHandler={errorHandler} />
                <DangerLabel message={errorHandler.errorMessage} />
                <FormButtonBar>
                    <FormAcceptButton label="Enviar" onClick={sendClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}