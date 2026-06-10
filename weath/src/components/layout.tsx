import { type PropsWithChildren } from 'react'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  )
}

export default layout

