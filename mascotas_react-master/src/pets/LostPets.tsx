import React, { useState, useEffect } from "react"
import { Pet, loadLostPets } from "./petsService"
import "../styles.css"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import FormButtonBar from "../common/components/FormButtonBar"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

export default function LostPets(props: RouteComponentProps) {
    const [pets, setPets] = useState<Pet[]>([])

    const errorHandler = useErrorHandler()

    const loadCurrentLostPets = async () => {
        try {
            const result = await loadLostPets()
            setPets(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const foundPetClick = async (petId:string) => {
        props.history.push(`/foundPetInfo/${petId}`)
    }

    useEffect(() => {
        void loadCurrentLostPets()
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Mascotas Perdidas</FormTitle>
            <table id="mascotasPerdidas" className="table">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Descripción </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) => {
                        return (
                            <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.description}</td>
                                <td><button type="button" onClick={() => foundPetClick(pet.id)}>Enviar información</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <FormButtonBar>
                <FormButton label="Volver" onClick={() => goHome(props)} />
            </FormButtonBar>
        </GlobalContent>
    )
}