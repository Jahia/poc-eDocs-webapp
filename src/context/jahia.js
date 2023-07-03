import React from 'react';

const JahiaCtx= React.createContext({});
const {Provider:JahiaCtxProvider, Consumer:JahiaCtxConsumer} = JahiaCtx;

export {JahiaCtx, JahiaCtxProvider ,JahiaCtxConsumer};
