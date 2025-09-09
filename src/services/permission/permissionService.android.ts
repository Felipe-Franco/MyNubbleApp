import { Permission, PermissionsAndroid, Platform } from 'react-native'

import {
  PermissionName,
  PermissionService,
  PermissionStatus,
} from './permissionTypes'

async function check(
  permissionName: PermissionName,
): Promise<PermissionStatus> {
  const permission = mapPermissionNameToPermission(permissionName)
  if (permission) {
    const hasPermission = await PermissionsAndroid.check(permission)
    return hasPermission ? 'granted' : 'denied'
  }

  return 'unavailable'
}

async function request(
  permissionName: PermissionName,
): Promise<PermissionStatus> {
  const permission = mapPermissionNameToPermission(permissionName)

  if (permission) {
    return await PermissionsAndroid.request(permission)
  }

  return 'unavailable'
}

function mapPermissionNameToPermission(
  permissionName: PermissionName,
): Permission | null {
  switch (permissionName) {
    case 'photoLibrary':
      if (Number(Platform.Version) >= 33) {
        return 'android.permission.READ_MEDIA_IMAGES'
      } else {
        return 'android.permission.READ_EXTERNAL_STORAGE'
      }

    case 'camera':
      return 'android.permission.CAMERA'

    default:
      return null
  }
}

export const permissionService: PermissionService = {
  check,
  request,
}
