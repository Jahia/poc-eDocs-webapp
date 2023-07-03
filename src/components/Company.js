import {Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Grid} from "@mui/material";
import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export const Company = ({companyData,...props}) => (
    <Grid container spacing={0} sx={{border: 1, borderColor:'primary.main',mt:5}}>
        <Grid item xs={12} sm={6}>
            <List sx={{ width: '100%'}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor: 'primary.main'}}>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={companyData?.owner?.value} secondary="Conseiller" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor: 'primary.main'}}>
                            <BusinessIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${companyData?.adresse?.value} - ${companyData?.zipcode?.value}, ${companyData?.city?.value}`}
                        secondary="Adresse"
                    />
                </ListItem>
            </List>
        </Grid>
        <Grid item xs={12} sm={6}>
            <List sx={{ width: '100%'}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor: 'primary.main'}}>
                            <ContactPhoneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={companyData?.mobile?.value} secondary="Téléphone"/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor: 'primary.main'}}>
                            <AlternateEmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={companyData?.email?.value} secondary="Courriel"/>
                </ListItem>
            </List>
        </Grid>
    </Grid>
)

// export const Company = ({companyData,...props}) => (
//     <Box
//         component="div"
//         sx={{
//             alignItems: 'center',
//             display: 'flex',
//             flexDirection: 'column',
//             border: 1,
//             borderColor: 'primary.main',
//             p:2,
//             mt:5,
//             // minHeight: '500px'
//         }}>
//         <Typography
//             align="center"
//             color="primary"
//             gutterBottom
//             variant="h5"
//         >
//             {companyData?.owner?.value}
//         </Typography>
//         <Typography
//             align="center"
//             gutterBottom
//             variant="body1"
//         >
//             {companyData?.adresse?.value}
//             {companyData?.zipcode?.value},&nbsp;
//             {companyData?.city?.value}
//         </Typography>
//
//         <Box
//             component="div"
//             sx={{
//                 alignItems: 'center',
//                 borderTop: 1,
//                 // borderColor: 'primary.main',
//                 p:2,
//                 mt:5,
//             }}>
//
//             <Typography
//                 align="left"
//                 gutterBottom
//                 variant="body1"
//                 sx={{
//                     mt:1,
//                 }}
//             >
//                 tel : {companyData?.mobile?.value}<br/>
//                 courriel : {companyData?.email?.value}
//             </Typography>
//         </Box>
//     </Box>
// );
