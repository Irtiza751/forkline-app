import React from 'react';
import { View } from 'react-native';

import LogoSvg from '@/assets/svgs/logo.svg';

const LOGO_ASPECT = 41 / 161.64;

export interface LogoProps {
  width?: number;
}

export const Logo = ({ width = 132 }: LogoProps) => {
  const height = width * LOGO_ASPECT;

  return (
    <View style={{ width, height }}>
      <LogoSvg width={width} height={height} />
    </View>
  );
};

export default Logo;
