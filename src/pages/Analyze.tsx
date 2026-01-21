import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Upload, Sparkles } from "lucide-react";
import BlurText from "../components/BlurText";
import analyzeDataWithProgress from "../api/analyze";

const MIN_WIDTH = 520;
const MAX_WIDTH = 900;

export default function Analyze() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [result, setResult] = useState<any>(null);

  /* Width animation */
  const width = useMotionValue(MIN_WIDTH);
  const animatedWidth = useSpring(width, {
    stiffness: 120,
    damping: 22,
    mass: 0.9,
  });

  const mirrorRef = useRef<HTMLSpanElement>(null);

  /* Cursor-follow title */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 18 });
  const titleRef = useRef<HTMLDivElement>(null);

  /* Analyze only after upload */
  const handleSubmit = () => {
    if (!fileUploaded) return;
    setSubmitted(true);
  };

  /* Horizontal resize logic */
  useEffect(() => {
    if (!submitted || !mirrorRef.current) return;

    const textWidth = mirrorRef.current.offsetWidth + 120;
    const clamped = Math.min(Math.max(textWidth, MIN_WIDTH), MAX_WIDTH);
    width.set(clamped);
  }, [query, submitted, width]);

  /* Immediate upload on file select */
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setProgress(0);
    setFileUploaded(false);

    analyzeDataWithProgress(
      selectedFile,
      "",
      (p: number) => setProgress(p)
    )
      .then((data: any) => {
        setResult(data);
        setFileUploaded(true);
      })
      .catch(console.error)
      .finally(() => setUploading(false));
  };

  return (
    <div
      className={`
        relative min-h-screen text-white
        transition-all duration-500
        ${submitted ? "bg-black/50 backdrop-blur-[3px]" : "bg-black/20"}
      `}
    >
      {/* ================= TITLE ================= */}
      {!submitted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            ref={titleRef}
            onMouseMove={(e) => {
              const rect = titleRef.current?.getBoundingClientRect();
              if (!rect) return;

              x.set(
                Math.max(
                  -2,
                  Math.min(2, (e.clientX - rect.left - rect.width / 2) / 18)
                )
              );
              y.set(
                Math.max(
                  -2,
                  Math.min(2, (e.clientY - rect.top - rect.height / 2) / 18)
                )
              );
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            style={{ x: smoothX, y: smoothY }}
            className="mb-28 flex items-center gap-3 select-none"
          >
            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>

            <BlurText
              text="Analyzing your data with Datavex"
              animateBy="words"
              direction="top"
              className="text-xl md:text-2xl font-semibold text-purple-300 whitespace-nowrap"
            />
          </motion.div>
        </div>
      )}

      {/* ================= INPUT ================= */}
      {!submitted ? (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <MessageBox
            width={MIN_WIDTH}
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            uploading={uploading}
            fileUploaded={fileUploaded}
            onFileSelect={handleFileSelect}
          />
        </div>
      ) : (
        <div className="fixed inset-x-0 bottom-6 flex justify-center z-20">
          <motion.div style={{ width: animatedWidth }}>
            <MessageBox
              width={animatedWidth}
              query={query}
              setQuery={setQuery}
              onSubmit={handleSubmit}
              uploading={uploading}
              fileUploaded={fileUploaded}
              onFileSelect={handleFileSelect}
            />
          </motion.div>
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
  <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[420px] z-30">
    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl">
      
      {/* Label */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/80 truncate">
          Uploading {file?.name}
        </span>
        <span className="text-lg font-semibold text-purple-400">
          {progress}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
      </div>

    </div>
  </div>
)}

      {/* Hidden mirror */}
      <span
        ref={mirrorRef}
        className="absolute invisible whitespace-pre text-sm font-normal px-2"
      >
        {query || " "}
      </span>
    </div>
  );
}

/* ================= MESSAGE BOX ================= */

function MessageBox({
  width,
  query,
  setQuery,
  onSubmit,
  uploading,
  fileUploaded,
  onFileSelect,
}: {
  width: number | any;
  query: string;
  setQuery: (v: string) => void;
  onSubmit: () => void;
  uploading: boolean;
  fileUploaded: boolean;
  onFileSelect: (f: File) => void;
}) {
  return (
    <motion.div
      style={{ width }}
      className="
        flex items-center gap-3
        px-4 py-3
        rounded-full
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-2xl
      "
    >
      {/* Upload */}
      <label className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-purple-600/20 hover:bg-purple-600/30 transition shrink-0">
        <Upload className="w-5 h-5 text-purple-400" />
        <input
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
        />
      </label>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder="Write your query, we are here to solve."
        className="
          flex-1 bg-transparent
          text-sm text-white placeholder:text-white/40
          focus:outline-none
          whitespace-nowrap
        "
      />

      {/* Analyze */}
      <button
        disabled={!fileUploaded || uploading}
        onClick={onSubmit}
        className="
          px-5 py-2 rounded-full
          text-sm font-medium text-white
          bg-purple-600/70
          hover:bg-purple-600/85
          transition
          shrink-0
          disabled:opacity-40
        "
      >
        Analyze
      </button>
    </motion.div>
  );
}