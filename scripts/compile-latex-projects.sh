#!/usr/bin/env bash
set -euo pipefail

output_root="${1:-latex-build}"
mkdir -p "$output_root"

mapfile -d '' projects < <(find projetos -mindepth 2 -maxdepth 2 -type f -name main.tex -print0 2>/dev/null | sort -z)

if [ "${#projects[@]}" -eq 0 ]; then
  printf 'Nenhum projeto com projetos/<studentId>/main.tex foi encontrado.\n' > "$output_root/status.txt"
  exit 0
fi

failures=0
for main_file in "${projects[@]}"; do
  project_dir="$(dirname "$main_file")"
  project_id="$(basename "$project_dir")"
  build_dir="$(pwd)/$output_root/$project_id"
  mkdir -p "$build_dir"
  if ! (
    cd "$project_dir"
    latexmk -pdf -pdflatex='pdflatex -no-shell-escape %O %S' -interaction=nonstopmode -halt-on-error -file-line-error -outdir="$build_dir" main.tex
  ); then
    failures=$((failures + 1))
  fi
done

if [ "$failures" -gt 0 ]; then
  printf '%s projeto(s) falharam durante a compilação. Consulte os arquivos .log.\n' "$failures" > "$output_root/status.txt"
  exit 1
fi

printf '%s projeto(s) compilados com sucesso.\n' "${#projects[@]}" > "$output_root/status.txt"
