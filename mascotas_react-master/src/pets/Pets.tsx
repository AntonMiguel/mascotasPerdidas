import React, { useState, useEffect } from "react"
import { Pet, loadPets } from "./petsService"
import "../styles.css"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

export default function Pets(props: RouteComponentProps) {
    const [pets, setPets] = useState<Pet[]>([])

    const errorHandler = useErrorHandler()

    const loadCurrentPets = async () => {
        try {
            const result = await loadPets()
            setPets(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const editPetClick = (petId: string) => {
        props.history.push("/editPet/" + petId)
    }

    
    const checkLostInfoClick = (petId: string) => {
        props.history.push("/lostPetMsg/" + petId)
    }

    const newPetClick = () => {
        props.history.push("/editPet")
    }

    useEffect(() => {
        void loadCurrentPets()
        // eslint-disable-next-line
    }, [])


    return (
        <GlobalContent>
            <FormTitle>Mascotas</FormTitle>
            <table id="mascotas" className="table">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Descripción </th>
                        <th> Estado </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) => {
                        let locationStatusMessage:JSX.Element;
                        switch (pet.locationStatus){
                            case "atHome":
                                locationStatusMessage= <p>En casa</p>;
                                break;
                            case "lost":
                                locationStatusMessage= <p style={{color: "red"}}>Perdida</p>;
                                break;
                            case "lostWithInfo":
                                locationStatusMessage= <p style={{color: "red"}}>Perdida<br/><button type="button" onClick={() => checkLostInfoClick(pet.id)}>Ver info</button></p>;
                                break;
                            default:
                                locationStatusMessage= <p>ERROR</p>;
                                break;
                        }
                        return (
                            <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.description}</td>
                                <td>{locationStatusMessage}</td>
                                <td className="text">
                                    <img
                                        src="/assets/edit.png"
                                        alt=""
                                        onClick={() => editPetClick(pet.id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <FormButtonBar>
                <FormAcceptButton label="Nueva Mascota" onClick={newPetClick} />
                <FormButton label="Cancelar" onClick={() => goHome(props)} />
            </FormButtonBar>
        </GlobalContent>
    )
}
