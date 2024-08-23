import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ title, onPress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-[#13DAE9] rounded-xl min-h-[62px] justify-center items-center ${containerStyles}
      ${isLoading ? 'opacity-50' : ''}`} 
      disabled={isLoading}>
      <Text className={`text-white font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
