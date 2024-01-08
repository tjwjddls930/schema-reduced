import { createContext, useState, useEffect } from "react";

export const FontsizeContext = createContext();

export const FontsizeProvider = ({children}) => {
    const [fontsize, setFontsize] = useState(false);

    // const changeFontsize = () => {
    //     setFontsize(true)
    // }

    return (
        <FontsizeContext.Provider value={{fontsize, setFontsize}}>
            {children}
        </FontsizeContext.Provider>
    )
};