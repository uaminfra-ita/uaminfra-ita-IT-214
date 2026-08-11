export default function Icon({ name, className = 'h-5 w-5' }) {
  const paths = {
    home: <path d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9.5 20v-6h5v6" />,
    library: <path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm2 0v16M10 8h6M10 12h6" />,
    calendar: <path d="M6 3v3m12-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Zm3 8h3v3H8v-3Z" />,
    user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    upload: <path d="M12 16V4m-5 5 5-5 5 5M5 15v5h14v-5" />,
    external: <path d="M14 4h6v6m0-6-9 9M18 13v7H4V6h7" />,
    lock: <path d="M6 10h12v10H6V10Zm3 0V7a3 3 0 0 1 6 0v3" />,
    file: <path d="M6 3h8l4 4v14H6V3Zm8 0v5h5M9 13h6M9 17h6" />,
    check: <path d="m5 12 4 4L19 6" />,
    logout: <path d="M10 5H5v14h5m4-4 4-3-4-3m4 3H9" />,
    presentation: <path d="M4 4h16v11H4V4Zm8 11v5m-4 0h8" />,
    linkedin: <><path d="M6.5 9.5V19M6.5 6.25v.05M10.5 19v-9.5M10.5 13.5c.8-2.7 6.8-3 6.8 1V19" /><rect x="3" y="3" width="18" height="18" rx="3" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.file}
    </svg>
  );
}
