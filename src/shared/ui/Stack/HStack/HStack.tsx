import { ForwardedRef, forwardRef } from 'react';
import Flex, { FlexProps, FlexRef } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

const HStack = ((props: HStackProps, ref: ForwardedRef<FlexRef>) => (
    <Flex direction="row" {...{ ...props, ref }} />
));
export default forwardRef(HStack);
