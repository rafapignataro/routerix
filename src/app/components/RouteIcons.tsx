import { LucideProps, FolderTree, Folder, FolderPen, File, FileX, FileQuestion, Loader, Archive, PanelsLeftBottom } from "lucide-react";
import { Route, RouteElement } from "../../types";

export type RouteIconName = 'root' | Route['subType'] | RouteElement['subType'];

interface RouteIconProps extends LucideProps {
  name: RouteIconName;
}

export function RouteIcon({ name, ...props }: RouteIconProps) {
  switch (name) {
    case 'root': return <FolderTree {...props} />
    case 'default': return <Folder {...props} />;
    case 'container': return <Archive {...props} />;
    case 'dynamic': return <FolderPen {...props} />;
    case 'page': return <File {...props} />;
    case 'layout': return <PanelsLeftBottom {...props} />;
    case 'loading': return <Loader {...props} />;
    case 'not-found': return <FileX {...props} />;
    case 'unknown': return <FileQuestion {...props} />;
    default: return <Folder {...props} />
  }
};