'use client'
import { useState } from "react"

export const Header = () => {
  const [count, setCount] = useState(0);
  const handleCountUp = () => {
    setCount(count + 1)
  }
  return (
    <>
      <div>header</div>
    </>
  )
}