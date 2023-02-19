import React, { useState, useContext, useRef, Fragment, useEffect } from 'react'
import UserContext from '../auth/UserContext'
import TravelWhizApi from '../Api'
import EditSaved from './EditSaved'
import useOutClick from '../hooks/outClick'
import PopupAlert from '../general/PopupAlert'
import { useAlert } from 'react-alert'
import './Saved.css'

import { Grid, Box, Paper, Typography, Modal } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Favorite, FavoriteBorder, DeleteOutline, ModeEdit } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

const Saved = () => {
    const { currentUser, setCurrentUser, favIds, favs, handleFav } = useContext(UserContext)
    const [showPop, setShowPop] = useState(false)
    const [pinId, setPinId] = useState(null)
    const [currDate, setCurrDate] = useState('just now')
    const [fade, setFade] = useState(false)

    const alert = useAlert()

    //style per item 
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // sorting the pings
    const sortedUserPins = currentUser?.uPinList?.sort((a, b) => a.id - b.id) || [];

    //handles click on edit icon
    const handleEditClick = (id) => {
        setShowPop(true)
        setPinId(id)
    }

    //handles click on delete icon
    const handleDeletePin = async (id) => {
        try {
            await TravelWhizApi.deletePin(id);
            let user = await TravelWhizApi.getCurrentUser(currentUser.username)
            setCurrentUser(user)
            return { success: true }
        } catch (err) {
            console.error("failed", err)
            return { success: false, err }
        }
    }

    //handles if pin is favorited 
    //displays alert if success 
    const handleUnfav = (id) => {
        handleFav(id)
        alert.success('Unfavorited!')
    }

    //handles outside click of popup - closes popup
    const ref = useRef();
    useOutClick(ref, () => {
        if (showPop) {
            setShowPop(false)
        }
    })

    return (
        <Fragment>
            <div className="savedPage" >
                <div className='savedContainer' >

                    {/* Section for users' favorited pins */}
                    <Box sx={{ flexGrow: 1, p: 2 }} >
                        <Grid container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item md={7} lg={8}><h3 className='sectionTitle'>Favorites</h3></Grid>

                            <Grid container style={{ minWidth: 0 }} columns={{ xs: 3, sm: 6, md: 12, lg: 12 }} spacing={4}>

                                {favs?.favorites?.length === 0 ?
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            <h4>No favorites yet! Start <a className="searching" href="/map">searching</a></h4>
                                        </Typography>
                                    </Grid> :
                                    (favs?.favorites?.map((f, index) => (
                                        <Grid item xs={6} sm={3} md={4} lg={3} key={f.id}>
                                            <Item>
                                                <Box className="labels" style={{ padding: '5px' }}>
                                                    <label>Location</label>
                                                    <h5>{f.title}</h5>
                                                    <label>Review</label>
                                                    <h5>{f.review}</h5>
                                                    <label>Rating</label>
                                                    <h5>{f.rating}</h5>
                                                    <span> Created by {f.username}</span>
                                                    <Box

                                                    >
                                                        {favIds?.has(f.id) && currentUser.username ? (<>
                                                            <PopupAlert
                                                                trigger={<Tooltip title="Unfavorite" arrow><Favorite style={{ color: "pink", cursor: 'pointer' }} /></Tooltip>}
                                                                text={'Are you sure you wish to unfavorite this pin?'}
                                                                handle={() => handleUnfav(f.id)} />

                                                        </>
                                                        ) : (<FavoriteBorder
                                                            style={{ color: "pink" }} />)}
                                                    </Box>
                                                </Box>
                                            </Item>
                                        </Grid>
                                    ))

                                    )}


                            </Grid>
                        </Grid>
                    </Box>

                    {/* Section for users' pins */}
                    <Box sx={{ flexGrow: 1, p: 2 }}>
                        <Grid container
                            direction="row"
                            justifyContent="flex=start"
                            alignItems="center">

                            <Grid item md={7} lg={8}><h3 className='sectionTitle'>Your Pins</h3></Grid>
                            <Grid container columns={{ xs: 3, sm: 6, md: 12, lg: 12 }} spacing={4}>

                                {sortedUserPins.length === 0 ?
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            <h4>No pins yet!</h4>
                                        </Typography>
                                    </Grid> :
                                    (sortedUserPins.map((p, index) => (
                                        currentUser.username === p.username && (

                                            <Grid key={index} item xs={6} sm={3} md={4} lg={3}>
                                                <Item>
                                                    <Box style={{ padding: '5px' }}>
                                                        <label>Location</label>
                                                        <h5>{p.title}</h5>
                                                        <label>Review</label>
                                                        <h5>{p.review}</h5>
                                                        <label>Rating</label>
                                                        <h5>{p.rating}</h5>
                                                    </Box>

                                                    <Box style={{ cursor: "pointer" }}
                                                    >
                                                        <PopupAlert
                                                            trigger={<Tooltip title="Delete" arrow><DeleteOutline className="deleteIcon" /></Tooltip>}
                                                            text={"Are you sure you wish to delete this pin?"}
                                                            handle={() => handleDeletePin(p.id) && alert.success('Deleted!')}
                                                            fade={fade}
                                                            setFade={setFade}
                                                        />
                                                        <Tooltip title="Edit" arrow>
                                                            <ModeEdit
                                                                className="editIcon"
                                                                onClick={() => handleEditClick(p.id)}
                                                                style={{ cursor: "pointer" }}

                                                            />
                                                        </Tooltip>

                                                    </Box>



                                                </Item>
                                            </Grid>

                                        )
                                    ))
                                    )}

                                {showPop &&
                                    <EditSaved
                                        pinId={pinId}
                                        setShowPop={setShowPop}
                                        currDate={currDate}
                                        setCurrDate={setCurrDate}
                                    />
                                }

                            </Grid>
                        </Grid>

                    </Box>
                </div>
            </div>
        </Fragment>
    )
}

export default Saved;