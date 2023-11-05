import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Icon({ name, size = 18, color, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}
