import DOMPurify from 'dompurify'
import {Box, Grid, Typography} from "@mui/material";
import React from "react";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import Moment from "react-moment";
import {Media} from "./Media";
import './DocFragment.css';

export const DocFragment = ({fragment,site,index,...props}) => {
    const fragmentSite = fragment.site.displayName;
    return (
        <>
            <Grid container spacing={0} id={fragment.uuid}
                  sx={{
                      bgcolor: 'primary.main',
                      mt:5,
                      p:{xs:2,sm:0},
                      display:"flex",
                      alignItems:"center",
                      minHeight:100
                  }}
            >
                <Grid item
                      sx={{
                          pl:2,
                          display: { xs: 'none',sm:'inline-block'}
                          // pt:4.5
                      }}
                >
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
                        {fragment.title}
                        {fragmentSite!==site &&
                            <Typography
                                color="primary.dark"
                                gutterBottom
                                variant="span"
                                sx={{
                                    display:"block",
                                    fontSize:".7rem"
                                }}

                            >
                                {fragmentSite}
                            </Typography>
                        }
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        p:2,
                    }}
                >
                    <Typography
                        align="center"
                        color="primary"
                        gutterBottom
                        variant="body1"
                        sx={{
                            height:50,
                            width:50,
                            lineHeight:"50px",
                            p:0,
                            m:0,
                            textTransform:"uppercase",
                            fontWeight:700,
                            fontSize:'1.5rem',
                            bgcolor:"white"
                        }}
                    >
                        {index}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}
                  sx={{
                      pt:2,
                      width:"100%"
                  }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        textAlign:"justify"
                    }}
                >
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(fragment.content.value)}}/>
                </Grid>
                { fragment.media?.refNode &&
                    <Grid
                        item
                        sx={{
                            width:"100%",
                            position:"relative"
                        }}>
                        <Grid item className="gradient-image">
                            <Media media={fragment.media?.refNode} style={{width:"100%",objectFit:"cover",maxHeight:"500px"}}/>
                        </Grid>
                    </Grid>}
            </Grid>
        </>
    )
}

// export const DocFragment = ({fragment,index,...props}) => {
//     return(
//         <Box
//             id={fragment.uuid}
//             component="section"
//          >
//             <Box
//                 component="div"
//                 sx={{
//                     bgcolor: 'primary.main',
//                 }}
//             >
//                 <Typography
//                     color="white"
//                     gutterBottom
//                     variant="h3"
//                     style={{textTransform:"uppercase"}}
//                 >
//                     {index}. {fragment.title}
//                 </Typography>
//             {/*    faire le format icon truc*/}
//             </Box>
//             <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(fragment.content.value)}}/>
//         </Box>
//
//     )
// }
