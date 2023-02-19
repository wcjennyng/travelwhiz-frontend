import React from 'react';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//If user changes url or does not have access to route
//They will be rerouted to page not found 
//That page will include link to route back to log in/sign up page

const PageNotFound = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <h3 style={{ marginTop: '200px' }}>Uh Oh. <b>404: Page Not Found. </b></h3>
            <h3> Please click on the dragon back to the right page. </h3>
            <h2><a href="/"><FontAwesomeIcon icon={faDragon} /></a></h2>
        </div>
    )
}

export default PageNotFound;