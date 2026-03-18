interface FileDownloadProps {
  href: string;
  filename: string;
  size?: string;
}

export function FileDownload({ href, filename, size }: FileDownloadProps) {
  return (
    <a
      href={href}
      download
      className="my-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm hover:bg-gray-100 transition-colors"
    >
      <svg
        className="w-5 h-5 text-gray-400 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <div>
        <span className="font-medium text-gray-900">{filename}</span>
        {size && <span className="ml-2 text-gray-400">{size}</span>}
      </div>
    </a>
  );
}
