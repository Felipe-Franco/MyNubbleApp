import { Pressable } from 'react-native'

import { useAppTheme } from '@hooks'
import { ThemeColor } from '@theme'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  BellOnIcon,
  BookmarkFillIcon,
  BookmarkIcon,
  CameraClick,
  CameraIcon,
  ChatIcon,
  ChatOnIcon,
  CheckIcon,
  CheckRoundIcon,
  ChevronRightIcon,
  CommentIcon,
  ErrorRoundIcon,
  EyeOffIcon,
  EyeOnIcon,
  FlashOffIcon,
  FlashOnIcon,
  HeartFillIcon,
  HeartIcon,
  HomeFillIcon,
  HomeIcon,
  MessageIcon,
  MessageRoundIcon,
  MessageRoundLightIcon,
  NewPostIcon,
  ProfileFillIcon,
  ProfileIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from '../../assets/icons'

export type IconBase = {
  size?: number
  color?: string
  fillColor?: string
}

export type IconProps = {
  name: IconName
  size?: number
  color?: ThemeColor
  onPress?: () => void
}

export function Icon({
  name,
  size,
  onPress,
  color = 'backgroundContrast',
}: IconProps) {
  const SVGIcon = iconRegistry[name]
  const { colors } = useAppTheme()

  if (onPress) {
    return (
      <Pressable hitSlop={10} onPress={onPress}>
        <SVGIcon size={size} color={colors[color]} />
      </Pressable>
    )
  }

  return <SVGIcon size={size} color={colors[color]} />
}

export const iconRegistry = {
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  bell: BellIcon,
  bellOn: BellOnIcon,
  bookmarkFill: BookmarkFillIcon,
  bookmark: BookmarkIcon,
  camera: CameraIcon,
  cameraClick: CameraClick,
  chat: ChatIcon,
  chatOn: ChatOnIcon,
  check: CheckIcon,
  checkRound: CheckRoundIcon,
  chevronRight: ChevronRightIcon,
  comment: CommentIcon,
  errorRound: ErrorRoundIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  flashOff: FlashOffIcon,
  flashOn: FlashOnIcon,
  heartFill: HeartFillIcon,
  heart: HeartIcon,
  homeFill: HomeFillIcon,
  home: HomeIcon,
  message: MessageIcon,
  messageRound: MessageRoundIcon,
  messageRoundLight: MessageRoundLightIcon,
  newPost: NewPostIcon,
  profileFill: ProfileFillIcon,
  profile: ProfileIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  trash: TrashIcon,
}

type IconType = typeof iconRegistry
type IconName = keyof IconType
