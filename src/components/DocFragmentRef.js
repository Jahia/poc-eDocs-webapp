import {DocFragment} from "./DocFragment";

export const DocFragmentRef = ({fragmentRef,index,...props}) => {
    return(
        <DocFragment fragment={fragmentRef.refNode} index={index} />
    )
}
