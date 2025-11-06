import { useState } from "react"

export default function BackButton() {
    const [hoveredReturn, setHoverReturn] = useState<boolean>(false)

    return (
      <div
        className="back-button"
        onMouseEnter={() => setHoverReturn(true)}
        onMouseLeave={() => setHoverReturn(false)}
      >
        <div className={`arrow-left ${hoveredReturn ? "active" : ""}`}>
          {" "}
          &lt;{" "}
        </div>
        Back
      </div>
    )
}