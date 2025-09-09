export type PermissionStatus =
  | 'granted'
  | 'denied'
  | 'never_ask_again'
  | 'unavailable'

export type PermissionName = 'photoLibrary' | 'camera'

export type PermissionService = {
  request: (permissionName: PermissionName) => Promise<PermissionStatus>
  check: (permissionName: PermissionName) => Promise<PermissionStatus>
}
