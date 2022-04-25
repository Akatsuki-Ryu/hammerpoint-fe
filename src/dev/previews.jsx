import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import serverstatusdatahandle from "../layouts/serverstatus/data/serverstatusTableData";
import gamedatahandle from "../layouts/akabox/data/gamedata";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/serverstatusdatahandle">
                <serverstatusdatahandle/>
            </ComponentPreview>
            <ComponentPreview path="/gamedatahandle">
                <gamedatahandle/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
