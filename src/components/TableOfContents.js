import {Avatar, Box, Grid, Link, Typography} from "@mui/material";
import Moment from "react-moment";
import React from "react";
import CropSquareIcon from '@mui/icons-material/CropSquare';
import BusinessIcon from '@mui/icons-material/Business';

const getLink = (fragment,site) => {
    const fragmentSite = fragment.site.displayName
    let title = fragment.title;

    // Doc content def was updated and not needed anymore
    // if(fragment.primaryNodeType.name === "doc4nt:fragmentReference")
    //     title = fragment.fragmentRef?.refNode?.title
    return (
        <Box sx={{
            pb:1.5,
            lineHeight:"1rem"
        }}>
            <Link href={`#${getUuid(fragment)}`}
                  underline="hover"
                  color="primary"
                  sx={{
                      fontWeight:700,
                      fontSize:'1.25rem'
                  }}
            >
                {title}
            </Link>

            {fragmentSite!==site &&
                // <BusinessIcon/>

                <Typography
                    color="primary.dark"
                    component="span"
                    sx={{
                        display:"block",
                        // pl:1,
                        // fontWeight:700,
                        fontSize:'.7rem',
                        // fontStyle:'italic'
                    }}
                >
                    {fragmentSite}
                </Typography>
            }
        </Box>
    );
}

const getUuid = (fragment) => {
    let uuid = fragment.uuid;
    // Doc content def was updated and not needed anymore
    // if(fragment.primaryNodeType.name === "doc4nt:fragmentReference")
    //     uuid = fragment.fragmentRef?.refNode?.uuid
    return uuid;
}

export const TableOfContents = ({documentData,...props}) => {
    const site = documentData?.site?.displayName;
    return(
        <>
            <Grid container spacing={0}
                  sx={{
                      bgcolor: 'primary.main',
                      mt:5,
                      display:"flex",
                      alignItems:"center",
                      height:100
                  }}
            >
                <Grid item
                      sx={{
                          pl:2,
                          // pt:4.5
                      }}>
                    <CropSquareIcon sx={{color:'white'}}/>
                </Grid>
                <Grid item
                      sx={{
                          flexGrow: 1,
                          pl:3,
                      }}
                >

                    <Typography
                        align="left"
                        color="white"
                        gutterBottom
                        variant="h5"
                        sx={{
                            m:0,
                            // pt:4,
                            textTransform:"uppercase"
                        }}

                    >
                        Sommaire
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        p:.5,
                        mt:7,
                    }}
                >
                    <Typography
                        align="right"
                        color="white"
                        gutterBottom
                        variant="body1"
                        sx={{
                            m:0,
                            textTransform:"uppercase",
                            lineHeight:1.2,
                            fontWeight:700,
                            fontSize:'.9rem'
                        }}
                    >
                        <span style={{textTransform:"capitalize"}}>Modèle</span> {documentData?.model?.value}<br/>
                        <Moment format="MMM Y" date={documentData?.revision?.value}/>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    <ol type="I" style={{fontColor:"primary"}}>
                        {documentData?.fragments?.refNodes && documentData.fragments.refNodes.map( fragment =>
                            <li key={fragment.uuid} style={{paddingLeft:'1rem'}}>
                                {getLink(fragment,site)}
                            </li>
                        )}
                    </ol>

                </Grid>
            </Grid>
        </>
    )
}
