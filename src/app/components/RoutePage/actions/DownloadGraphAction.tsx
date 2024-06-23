import { useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

export function downloadImage(dataUrl: string) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 2000;
const imageHeight = 2000;

export function DownloadGraphAction() {
  const { getNodes } = useReactFlow();

  function handleDownloadGraph() {
    const nodesBounds = getRectOfNodes(getNodes());

    const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;

    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(viewport, {
      backgroundColor: 'white',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: String(imageWidth),
        height: String(imageHeight),
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  }

  return (
    <button
      onClick={handleDownloadGraph}
      title="Download app diagram"
      className="group w-8 h-8 rounded-md cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center"
    >
      <Download className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
    </button>
  )
}