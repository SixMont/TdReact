import { useEffect, useState } from "react"
import Credits from "../../components/common/Credits"
import InfoBar from "../../components/common/InfoBar"
import PlayButton from "../../components/common/PlayButton"
import LeftGameScore from "../../components/common/LeftGameScore"
import RightGameInfo from "../../components/common/RightGameInfo"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [windowsWidth, setWindowsWidth] = useState(0)

  useEffect(() => {
    setWindowsWidth(window.innerWidth)
  }, [])

  // Prevent page scrolling while HomePage is mounted
  useEffect(() => {
    document.body.classList.add("no-scroll")
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [])

  const getBlocks = () => {
    const blockSize = Math.max(2, Math.floor(windowsWidth * 0.01))

    const nbOfBlocks = Math.ceil(window.innerHeight / blockSize)

    return [...Array(nbOfBlocks).keys()].map((_, index) => {
      return (
        <div
          onMouseEnter={(e) => {
            colorize(e.target)
          }}
          key={index}
          style={{ width: `${blockSize}px`, height: `${blockSize}px` }}
        ></div>
      )
    })
  }

  const colorize = (el: EventTarget | HTMLElement) => {
    if (!(el instanceof HTMLElement)) return

    el.style.backgroundColor = "black"

    setTimeout(() => {
      el.style.backgroundColor = "transparent"
    }, 300)
  }

  return (
    <div className="container-home-page">
      <div className="header-home-page">
        <InfoBar />
      </div>
      <PlayButton />
      <Credits />
      <Link to="/info">
        <RightGameInfo />
      </Link>
      <LeftGameScore />
      <div className="grid-home-page">
        {windowsWidth > 0 &&
          (() => {
            const blockSize = Math.max(2, Math.floor(windowsWidth * 0.01))
            const nbOfColumns = Math.max(
              1,
              Math.floor(window.innerWidth / blockSize)
            )

            return [...Array(nbOfColumns).keys()].map((_, index) => {
              return (
                <div
                  key={"b_" + index}
                  className="column-home-page"
                  style={{ width: `${blockSize}px` }}
                >
                  {getBlocks()}
                </div>
              )
            })
          })()}
      </div>
    </div>
  )
}
