import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { saveAs } from "file-saver";
import { createApi } from "unsplash-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const unsplash = createApi({
  accessKey: "YOUR_UNSPLASH_ACCESS_KEY",
});

const Index = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [layers, setLayers] = useState([]);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const [alignment, setAlignment] = useState("left");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f3f3f3",
    });

    setCanvas(canvasInstance);

    canvasInstance.on("object:selected", (e) => {
      setActiveObject(e.target);
    });

    canvasInstance.on("selection:cleared", () => {
      setActiveObject(null);
    });

    return () => {
      canvasInstance.dispose();
    };
  }, []);

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 50,
      height: 50,
    });
    canvas.add(rect);
    updateLayers();
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      fill: "blue",
      radius: 30,
    });
    canvas.add(circle);
    updateLayers();
  };

  const addLine = () => {
    const line = new fabric.Line([50, 100, 200, 200], {
      left: 200,
      top: 200,
      stroke: "green",
    });
    canvas.add(line);
    updateLayers();
  };

  const addText = () => {
    const textObj = new fabric.Textbox(text, {
      left: 200,
      top: 200,
      fontSize: fontSize,
      fill: fontColor,
      textAlign: alignment,
    });
    canvas.add(textObj);
    updateLayers();
  };

  const applyFilter = (filterType, value) => {
    if (activeObject) {
      activeObject.filters = activeObject.filters || [];
      activeObject.filters[filterType] = new fabric.Image.filters[filterType]({
        value: value,
      });
      activeObject.applyFilters();
      canvas.renderAll();
    }
  };

  const cropImage = () => {
    if (activeObject && activeObject.type === "image") {
      const cropped = new fabric.Image(activeObject.getElement(), {
        left: activeObject.left,
        top: activeObject.top,
        width: activeObject.width * activeObject.scaleX,
        height: activeObject.height * activeObject.scaleY,
        cropX: activeObject.cropX,
        cropY: activeObject.cropY,
      });
      canvas.remove(activeObject);
      canvas.add(cropped);
      updateLayers();
    }
  };

  const uploadImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        canvas.add(img);
        updateLayers();
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const searchImages = async () => {
    const result = await unsplash.search.getPhotos({
      query: searchQuery,
      page: 1,
      perPage: 10,
    });
    setSearchResults(result.response.results);
  };

  const insertImage = (url) => {
    fabric.Image.fromURL(url, (img) => {
      canvas.add(img);
      updateLayers();
    });
  };

  const exportProject = (format) => {
    const dataURL = canvas.toDataURL({
      format: format,
      quality: 1.0,
    });
    saveAs(dataURL, `project.${format}`);
  };

  const undo = () => {
    canvas.undo();
  };

  const redo = () => {
    canvas.redo();
  };

  const alignObjects = (alignment) => {
    const activeGroup = canvas.getActiveGroup();
    if (activeGroup) {
      activeGroup.forEachObject((obj) => {
        switch (alignment) {
          case "left":
            obj.set({ left: 0 });
            break;
          case "center":
            obj.set({ left: (canvas.width - obj.width * obj.scaleX) / 2 });
            break;
          case "right":
            obj.set({ left: canvas.width - obj.width * obj.scaleX });
            break;
          case "top":
            obj.set({ top: 0 });
            break;
          case "middle":
            obj.set({ top: (canvas.height - obj.height * obj.scaleY) / 2 });
            break;
          case "bottom":
            obj.set({ top: canvas.height - obj.height * obj.scaleY });
            break;
          default:
            break;
        }
        obj.setCoords();
      });
      canvas.renderAll();
    }
  };

  const updateLayers = () => {
    setLayers(canvas.getObjects().map((obj, index) => ({ id: index, type: obj.type })));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl mb-4">Image Editor</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={addRectangle}>Add Rectangle</Button>
        <Button onClick={addCircle}>Add Circle</Button>
        <Button onClick={addLine}>Add Line</Button>
        <Button onClick={addText}>Add Text</Button>
        <Button onClick={cropImage}>Crop Image</Button>
        <Button onClick={() => exportProject("png")}>Export PNG</Button>
        <Button onClick={() => exportProject("jpeg")}>Export JPEG</Button>
        <Button onClick={() => exportProject("svg")}>Export SVG</Button>
        <Button onClick={undo}>Undo</Button>
        <Button onClick={redo}>Redo</Button>
      </div>
      <div className="flex space-x-4 mb-4">
        <Input type="file" onChange={uploadImage} />
        <Input
          type="text"
          placeholder="Search Unsplash"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={searchImages}>Search</Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {searchResults.map((result) => (
          <img
            key={result.id}
            src={result.urls.thumb}
            alt={result.alt_description}
            onClick={() => insertImage(result.urls.full)}
            className="cursor-pointer"
          />
        ))}
      </div>
      <canvas ref={canvasRef} className="border" />
      <div className="flex space-x-4 mt-4">
        <Input
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Font Size"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
        <Input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
        <Select value={alignment} onValueChange={setAlignment}>
          <SelectTrigger>
            <SelectValue placeholder="Alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs defaultValue="filters" className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="filters">Filters</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>
        <TabsContent value="filters">
          <Accordion type="single" collapsible>
            <AccordionItem value="brightness">
              <AccordionTrigger>Brightness</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[0]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => applyFilter("Brightness", value[0])}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contrast">
              <AccordionTrigger>Contrast</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[0]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => applyFilter("Contrast", value[0])}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="saturation">
              <AccordionTrigger>Saturation</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[0]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => applyFilter("Saturation", value[0])}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="effects">
          <Accordion type="single" collapsible>
            <AccordionItem value="shadow">
              <AccordionTrigger>Shadow</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[0]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => applyFilter("Shadow", value[0])}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="border">
              <AccordionTrigger>Border</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[0]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => applyFilter("Border", value[0])}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;