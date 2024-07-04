import { useEffect, useRef } from "react";
import { fabric } from "fabric";

const Index = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f3f3f3",
    });

    // Example: Add a rectangle
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 50,
      height: 50,
    });
    canvas.add(rect);

    // Add selection and movement
    canvas.on("object:moving", (e) => {
      e.target.set({
        borderColor: "red",
        cornerColor: "green",
        cornerSize: 6,
        transparentCorners: false,
      });
    });

    // Add resizing
    canvas.on("object:scaling", (e) => {
      e.target.set({
        borderColor: "red",
        cornerColor: "green",
        cornerSize: 6,
        transparentCorners: false,
      });
    });

    // Add rotation
    canvas.on("object:rotating", (e) => {
      e.target.set({
        borderColor: "red",
        cornerColor: "green",
        cornerSize: 6,
        transparentCorners: false,
      });
    });

    // Add deletion
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        canvas.remove(canvas.getActiveObject());
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl mb-4">Image Editor</h1>
      <canvas ref={canvasRef} className="border" />
    </div>
  );
};

export default Index;