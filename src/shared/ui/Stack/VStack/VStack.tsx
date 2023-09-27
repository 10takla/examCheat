import {
    ForwardedRef, forwardRef, MutableRefObject, useRef,
} from 'react';
import Flex, { FlexProps, FlexRef } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

function VStack(props: VStackProps, ref: ForwardedRef<FlexRef>) {
    const { align = 'stretch' } = props;
    return <Flex {...{ ...props, ref, align }} direction="column" />;
}

export default forwardRef(VStack);
