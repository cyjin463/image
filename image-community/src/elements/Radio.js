import React, { useState } from "react";
import { Grid } from ".";

const view = () => {

    const [radio, setRadio] = useState("nomal");

    return(
        <Grid>
            <h1> Radio button is : {radio}</h1>

            <label> Right : </label>
            <input type="radio"
                    checked={radio === "right"}
                    value="right"
                    onChange={(e) => { setRadio(e.target.value)}} />

            <label> Left : </label>
            <input type="radio"
                    checked={radio === "left"}
                    value="left"
                    onChange={(e) => { setRadio(e.target.value)}} />

            <label> Momal : </label>
            <input type="radio"
                    checked={radio === "nomal"}
                    value="nomal"
                    onChange={(e) => { setRadio(e.target.value)}} />
        </Grid>
    )



}


export default view;