import { useState } from "react"

export const useErrorMessage = () => {
    const [errorMessage,setErrorMessage] = useState('');
    const handleError = (error) => {
        setErrorMessage(error);
    }
    return {handleError,errorMessage};
}