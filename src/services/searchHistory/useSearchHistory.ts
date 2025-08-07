import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '../storage/storage'

import { SearchHistoryService } from './searchHistoryTypes'

let st = storage
console.log('Storage:', { st })

const searchHistoryStore = create<SearchHistoryService>()(
  persist(
    (set, get) => ({
      userList: [],
      addUser: (user) => {
        const userList = get().userList
        const updatedList = [
          user,
          ...userList.filter((item) => item.id !== user.id),
        ].slice(0, 10)

        set({ userList: updatedList })
      },
      removeUser: (userId) => {
        const userList = get().userList
        const updatedList = userList.filter((user) => user.id !== userId)

        set({ userList: updatedList })
      },
      clearUserList: () => {
        set({ userList: [] })
      },
    }),
    { name: '@SearchHistory', storage: storage },
  ),
)

export function useSearchHistory(): SearchHistoryService['userList'] {
  const userList = searchHistoryStore((state) => state.userList)
  return userList
}

export function useSearchHistoryService(): Omit<
  SearchHistoryService,
  'userList'
> {
  const addUser = searchHistoryStore((state) => state.addUser)
  const removeUser = searchHistoryStore((state) => state.removeUser)
  const clearUserList = searchHistoryStore((state) => state.clearUserList)

  return {
    addUser,
    removeUser,
    clearUserList,
  }
}
