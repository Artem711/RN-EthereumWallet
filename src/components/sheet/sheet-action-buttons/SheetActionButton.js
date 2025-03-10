import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/primitives';
import { ButtonPressAnimation } from '../../animations';
import { Icon } from '../../icons';
import { Centered, InnerBorder, RowWithMargins } from '../../layout';
import { Emoji, Text } from '../../text';
import { containsEmoji } from '@rainbow-me/helpers/strings';
import { colors, position } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const Button = styled(Centered).attrs({
  scaleTo: 0.9,
})`
  flex: ${({ noFlex }) => (noFlex ? 'none' : 1)};
  height: ${({ size }) => (size === 'big' ? 56 : 46)};
`;

const Content = styled(RowWithMargins).attrs({
  align: 'center',
  margin: 4,
})`
  padding-bottom: ${({ label }) => (containsEmoji(label) ? 5.5 : 4)};
  padding-horizontal: 19;
  z-index: 1;
  height: ${({ size }) => (size === 'big' ? 56 : 46)};
`;

const neverRerender = () => true;
// eslint-disable-next-line react/display-name
const WhiteButtonGradient = React.memo(
  () => (
    <LinearGradient
      borderRadius={49}
      colors={['#FFFFFF', '#F7F9FA']}
      end={{ x: 0.5, y: 1 }}
      opacity={0.5}
      pointerEvents="none"
      start={{ x: 0.5, y: 0 }}
      style={position.coverAsObject}
    />
  ),
  neverRerender
);

const SheetActionButton = ({
  borderRadius = 56,
  color = colors.appleBlue,
  disabled,
  emoji,
  icon,
  isTransparent,
  label,
  noFlex,
  size,
  testID,
  textColor = colors.white,
  weight = 'semibold',
  ...props
}) => {
  const shadowsForButtonColor = useMemo(() => {
    const isWhite = color === colors.white;

    if (isTransparent) {
      return [[0, 0, 0, colors.transparent]];
    } else
      return [
        [0, 10, 30, colors.dark, isWhite ? 0.12 : 0.2],
        [0, 5, 15, isWhite ? colors.dark : color, isWhite ? 0.08 : 0.4],
      ];
  }, [color, isTransparent]);

  return (
    <Button
      as={ButtonPressAnimation}
      elevation={android ? 24 : null}
      noFlex={noFlex}
      radiusAndroid={borderRadius}
      size={size}
      testID={`${testID}-action-button`}
      {...props}
    >
      <ShadowStack
        {...position.coverAsObject}
        backgroundColor={color}
        borderRadius={borderRadius}
        shadows={shadowsForButtonColor}
      >
        {color === colors.white && <WhiteButtonGradient />}
        {color !== colors.white && !isTransparent && (
          <InnerBorder
            color={disabled ? textColor : null}
            opacity={disabled ? 0.02 : null}
            radius={borderRadius}
            width={disabled ? 2 : null}
          />
        )}
      </ShadowStack>
      <Content label={label} size={size}>
        {emoji && <Emoji lineHeight={23} name={emoji} size="medium" />}
        {icon && <Icon color="white" height={18} name={icon} size={18} />}
        <Text
          align="center"
          color={textColor}
          size={size === 'big' ? 'larger' : 'large'}
          weight={weight}
        >
          {label}
        </Text>
      </Content>
    </Button>
  );
};

export default React.memo(SheetActionButton);
