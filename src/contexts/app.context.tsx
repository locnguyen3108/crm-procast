import { createContext, useState } from 'react'
import { User } from '~/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppConxtext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppConxtext.Provider value={{ isAuthenticated, setIsAuthenticated, profile: initialAppContext.profile }}>
      {children}
    </AppConxtext.Provider>
  )
}
