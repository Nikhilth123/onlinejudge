import { useState, useRef, useEffect } from "react"

export default function Drag() {
  // 1️⃣ State: controls UI height (this MUST re-render UI)
  const [editorHeight, setEditorHeight] = useState(400)

  // 2️⃣ Ref: tells whether dragging is happening (NO re-render)
  const isDraggingRef = useRef(false)

  // 3️⃣ Mouse down → start dragging
  const handleMouseDown = () => {
    isDraggingRef.current = true
  }

  // 4️⃣ Mouse move & mouse up → handled globally
  useEffect(() => {
    const handleMouseMove = (e) => {
      // If not dragging, ignore mouse move
      if (!isDraggingRef.current) return

      setEditorHeight((prevHeight) => {
        const newHeight = prevHeight - e.movementY

        // limits (VERY IMPORTANT)
        if (newHeight < 200) return 200
        if (newHeight > 700) return 700

        return newHeight
      })
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    // attach to window for smooth drag
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    // cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col">

      {/* Problem Description */}
      <div className="flex-1 p-4 bg-muted">
        <h2 className="font-bold mb-2">Problem Description</h2>
        <p>Some problem text here...</p>
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="h-2 bg-border cursor-row-resize"
      />

      {/* Code Editor */}
      <div
        style={{ height: editorHeight }}
        className="bg-black text-white p-4"
      >
        Code Editor Area
      </div>

    </div>
  )
}
