import React, {useContext} from "react";
import {useQuery} from "@apollo/client";
import {Box, Container, Grid, styled, ThemeProvider, Typography,CircularProgress} from "@mui/material";

import {queryDocument} from "_graphql";
import {JahiaCtx} from "../context";
import {mergedTheme} from "../theme";
import {TableOfContents} from "./TableOfContents";
import {DocFragment} from "./DocFragment";
// import {DocFragmentRef} from "./DocFragmentRef";
import {Company} from "./Company";
import {Heading} from "./Heading";


const DocumentLayoutRoot = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
}));

const getComponent = (node,site,index) => {
  let component = <DocFragment key={node.uuid} site={site} fragment={node} index={index}/>
  // if(node.primaryNodeType.name === "doc4nt:fragmentReference")
  //   component = <DocFragmentRef key={node.uuid} fragmentRef={node.fragmentRef} index={index}/>
  return component;
}


function App() {
  const { workspace,documentId,locale } = useContext(JahiaCtx);

  const {loading, error, data} = useQuery(queryDocument, {
    variables:{
      workspace,
      language:locale,
      id:documentId
    },
  });

  if (loading) return <p><CircularProgress/>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const documentData = data?.jcr?.nodeById;
  const userTheme = documentData?.userTheme?.value || {};//not implemented yet value is already {}
  const site = documentData?.site?.displayName;

  return (
      <ThemeProvider theme={mergedTheme(userTheme)}>
        <DocumentLayoutRoot>
          <Box
              component="main"
              sx={{
                // alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
              }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Heading documentData={documentData}/>

                <Company companyData={documentData?.company?.refNode}/>

                <TableOfContents documentData={documentData}/>

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        {documentData?.fragments?.refNodes?.map((docFragment,index) => getComponent(docFragment,site,index+1))}
                    </Grid>
                </Grid>
            </Container>

            {/*<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>*/}
            {/*  <Grid container spacing={1}>*/}
            {/*    <Grid item xs={12}>*/}
            {/*      <TableOfContents fragments={documentData?.children?.nodes || []}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12}>*/}
            {/*      {documentData?.children?.nodes?.map((docFragment,index) => getComponent(docFragment,index+1))}*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</Container>*/}
          </Box>
        </DocumentLayoutRoot>
      </ThemeProvider>

  );
}

export default App;
