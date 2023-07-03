import {Box, Grid, Typography} from "@mui/material";
import {DefaultImage} from "./images";
import React from "react";

export const Heading = ({documentData,...props}) => (
    <Grid container spacing={1}>
        <Grid
            item
            xs={12}
            md={4}
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
                component="div"
                sx={{
                    alignItems: 'end',
                    display: 'flex',
                    flexGrow: 1,
                    // flexDirection: "column",
                    bgcolor: 'primary.main',
                    pl:2,
                    mb:1
                }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography
                            align="left"
                            color="white"
                            gutterBottom
                            variant="h1"
                        >
                            {documentData.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            align="left"
                            color="white"
                            gutterBottom
                            variant="h4"
                        >
                            {documentData.subtitle.value}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            {/*<DefaultImage sx={{pt:1}} path={documentData?.company?.refNode?.logo?.refNode?.path} width="100%"/>*/}
        </Grid>
        <Grid item xs={12} md={8}>
            {/*<DefaultImage style={{objectFit:'cover', maxHeight:'500px'}} path={documentData?.media?.refNode?.path} width="100%"/>*/}
        </Grid>
    </Grid>
)
