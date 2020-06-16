import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import "../styles.css"
import { deletePet, loadPet, newPet, savePet} from "./petsService"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormRadio from "../common/components/FormRadio"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormWarnButton from "../common/components/FormWarnButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

export default function NewPet(props: RouteComponentProps<{ id: string }>) {
    const [birthDate, setBirthDate] = useState("")
    const [description, setDescription] = useState("")
    const [petId, setPetId] = useState("")
    const [name, setName] = useState("")
    const [locationStatus, setLocationStatus] = useState("")
    const [oldLocationStatus, setOldLocationStatus] = useState("")

    const errorHandler = useErrorHandler()

    const loadPetById = async (id: string) => {
        if (id) {
            try {
                const result = await loadPet(id)
                setBirthDate(result.birthDate)
                setPetId(result.id)
                setName(result.name)
                setDescription(result.description)
                setLocationStatus(result.locationStatus)
                setOldLocationStatus(result.locationStatus)
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }
    const deleteClick = async () => {
        if (petId) {
            try {
                await deletePet(petId)
                props.history.push("/pets")
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const saveClick = async () => {
        errorHandler.cleanRestValidations()
        if (!name) {
            errorHandler.addError("name", "No puede estar vacío")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        let newLocationStatus;
        if(oldLocationStatus==="lostWithInfo" && locationStatus==="lost"){
            newLocationStatus="lostWithInfo"   //Si intento setear estado "lost" al encontrarme en "lostWithInfo", el estado se mantiene en "lostWithInfo"
        } else {newLocationStatus= locationStatus}
        try {
            if (petId) {
                if(locationStatus==="atHome"){ //Al indicar que la mascota a vuelto a casa, se eliminan los mensajes con información sobre su paradero
                    await savePet({ id: petId, name, birthDate, description, locationStatus:newLocationStatus, locationMessages:[""]})
                } else{
                    await savePet({ id: petId, name, birthDate, description, locationStatus:newLocationStatus})
                }
            } else {
                await newPet({ id: petId, name, birthDate, description, locationStatus:newLocationStatus, locationMessages:[""]})
            }
            props.history.push("/pets")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        const id  = props.match.params.id
        if (id) {
            void loadPetById(id)
        }
        // eslint-disable-next-line
    }, [])

    const goToPets = async () => {
        props.history.push("/pets")
    }

    return (
        <GlobalContent>
            <FormTitle>Nueva Mascota</FormTitle>
            <Form>
                <FormInput
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Fecha de Nacimiento"
                    name="birthDate"
                    value={birthDate}
                    onChange={event => setBirthDate(event.target.value)}
                    errorHandler={errorHandler} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormRadio 
                    label="Estado"
                    checkedLost={locationStatus==="lost"|| locationStatus==="lostWithInfo"}
                    checkedHome={locationStatus==="atHome"}
                    onChange={event => setLocationStatus(event.target.value)}
                    errorHandler={errorHandler} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />
                    <FormWarnButton hidden={!petId} label="Eliminar" onClick={deleteClick} />
                    <FormButton label="Cancelar" onClick={() => goToPets()} />
                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}