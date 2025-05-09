import React from "react";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Code,
  FileCode,
  Monitor,
  Maximize,
  MinusSquare,
  Quote,
  CheckSquare,
  Youtube,
} from "lucide-react";
import MediaUploadButton from "./MediaUploadButton";

interface ToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onStrikethrough: () => void;
  onLink: () => void;
  onQuote: () => void;
  onCode: () => void;
  onCodeBlock: () => void;
  onBulletList: () => void;
  onNumberList: () => void;
  onTaskList: () => void;
  onDivider: () => void;
  onHeading: (level: number) => void;
  onMediaUpload: (file: File) => Promise<void>;
  onYouTubeVideo: () => void;
  onTogglePreview: () => void;
  onToggleFullscreen: () => void;
  isPreviewVisible: boolean;
  isFullscreen: boolean;
}

export default function EditorToolbar({
  onBold,
  onItalic,
  onStrikethrough,
  onLink,
  onQuote,
  onCode,
  onCodeBlock,
  onBulletList,
  onNumberList,
  onTaskList,
  onDivider,
  onHeading,
  onMediaUpload,
  onYouTubeVideo,
  onTogglePreview,
  onToggleFullscreen,
  isPreviewVisible,
  isFullscreen,
}: ToolbarProps) {
  const ToolbarButton = ({
    onClick,
    icon: Icon,
    title,
    isActive = false,
  }: {
    onClick: () => void;
    icon: React.ElementType;
    title: string;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`hover:bg-navy-600 focus:ring-neon/30 rounded p-1.5 focus:ring-1 focus:outline-none ${
        isActive ? "text-neon bg-navy-600" : "text-gray-300"
      }`}
    >
      <Icon size={16} />
    </button>
  );

  const Divider = () => <div className="bg-navy-600 mx-1 h-6 w-px"></div>;

  return (
    <div className="border-navy-600 bg-navy-700/90 flex flex-wrap items-center gap-1 border-b p-1">
      {/* Text formatting */}
      <ToolbarButton onClick={onBold} icon={Bold} title="Bold (Ctrl+B)" />
      <ToolbarButton onClick={onItalic} icon={Italic} title="Italic (Ctrl+I)" />
      <ToolbarButton
        onClick={onStrikethrough}
        icon={() => <span className="text-sm font-medium">S̶</span>}
        title="Strikethrough"
      />

      <Divider />

      {/* Headings */}
      <div className="group relative">
        <button
          type="button"
          className="hover:bg-navy-600 rounded p-1.5 text-gray-300"
          title="Headings"
        >
          <span className="text-sm font-bold">H#</span>
        </button>

        <div className="bg-navy-600 invisible absolute top-full left-0 z-10 mt-1 rounded shadow-lg group-hover:visible">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button
              key={level}
              onClick={() => onHeading(level)}
              className="hover:bg-navy-500 block w-full px-3 py-1.5 text-left"
            >
              Heading {level}
            </button>
          ))}
        </div>
      </div>

      <Divider />

      {/* Lists */}
      <ToolbarButton onClick={onBulletList} icon={List} title="Bullet List" />
      <ToolbarButton
        onClick={onNumberList}
        icon={ListOrdered}
        title="Numbered List"
      />
      <ToolbarButton
        onClick={onTaskList}
        icon={CheckSquare}
        title="Task List"
      />

      <Divider />

      {/* Media */}
      <MediaUploadButton onUpload={onMediaUpload} />
      <ToolbarButton
        onClick={onYouTubeVideo}
        icon={Youtube}
        title="Embed YouTube Video"
      />
      <ToolbarButton onClick={onLink} icon={Link} title="Link (Ctrl+K)" />

      <Divider />

      {/* Block elements */}
      <ToolbarButton onClick={onQuote} icon={Quote} title="Quote" />
      <ToolbarButton onClick={onCode} icon={Code} title="Inline Code" />
      <ToolbarButton onClick={onCodeBlock} icon={FileCode} title="Code Block" />
      <button
        type="button"
        onClick={onDivider}
        title="Horizontal Rule"
        className="hover:bg-navy-600 rounded p-1.5 text-gray-300"
      >
        <span className="text-xs font-bold">─── </span>
      </button>

      <div className="flex-grow"></div>

      {/* View controls */}
      <ToolbarButton
        onClick={onTogglePreview}
        icon={Monitor}
        title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
        isActive={isPreviewVisible}
      />
      <ToolbarButton
        onClick={onToggleFullscreen}
        icon={isFullscreen ? MinusSquare : Maximize}
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        isActive={isFullscreen}
      />
    </div>
  );
}
