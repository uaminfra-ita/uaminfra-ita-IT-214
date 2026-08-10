import course from '@/data/course.json';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <span className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">{course.code} · {course.term}</span>
          <h2 className="mt-3 text-2xl font-black">{course.name}</h2>
          <p className="mt-2 text-sm text-slate-400">{course.institution}</p>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-400 md:text-right">Portal acadêmico mantido pela equipe docente. Conteúdo sujeito a atualizações ao longo do semestre.</p>
      </div>
    </footer>
  );
}
