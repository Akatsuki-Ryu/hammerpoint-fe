import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import serverstatusdatahandle from "../layouts/serverstatus/data/serverstatusTableData";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/serverstatusdatahandle">
                <serverstatusdatahandle/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
