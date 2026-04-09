library(readxl)
library(ggplot2)

base_dir <- "scripts/mod 01 - Los Angeles"
excel_path <- file.path(base_dir, "data_los_angeles.xls")
output_dir <- "figures"
table_dir <- "tables"

load_los_angeles_data <- function(path = excel_path) {
  raw <- read_excel(path, sheet = "All Data", skip = 1)

  names(raw) <- c(
    "ano",
    "pax",
    "pax_mil",
    "ppc",
    "pop",
    "pop_mil",
    "rpc",
    "rpc_mil",
    "ydd"
  )

  raw <- raw[grepl("^[0-9]{2}$", raw$ano), ]

  raw$ano <- as.numeric(raw$ano)
  raw$pax_mil <- as.numeric(raw$pax_mil)
  raw$ppc <- as.numeric(raw$ppc)
  raw$pop_mil <- as.numeric(raw$pop_mil)
  raw$rpc_mil <- as.numeric(raw$rpc_mil)
  raw$ydd <- as.numeric(raw$ydd)

  raw
}

format_br <- function(x, digits = 4) {
  formatC(x, format = "f", digits = digits, decimal.mark = ",")
}

write_lines_utf8 <- function(lines, path) {
  dir.create(dirname(path), recursive = TRUE, showWarnings = FALSE)
  writeLines(lines, con = path, useBytes = TRUE)
}

save_plot <- function(plot, output_path, width = 8.6, height = 4.8) {
  dir.create(dirname(output_path), recursive = TRUE, showWarnings = FALSE)

  ggsave(
    filename = output_path,
    plot = plot,
    width = width,
    height = height,
    dpi = 180,
    bg = "white"
  )
}

coef_label <- function(term_name, labels) {
  if (term_name == "(Intercept)") {
    return("Interse\\c{c}\\~ao")
  }

  labels[[term_name]]
}

build_pax_historico_plot <- function(data) {
  ggplot(data, aes(x = ano, y = pax_mil)) +
    geom_point(size = 2.6, color = "#6B7A42") +
    scale_x_continuous(breaks = seq(74, 94, by = 2)) +
    scale_y_continuous(breaks = seq(20, 70, by = 10), limits = c(20, 70)) +
    labs(
      title = "PAX (000)",
      x = "Ano",
      y = "PAX (000)"
    ) +
    theme_minimal(base_size = 16) +
    theme(
      plot.title = element_text(hjust = 0.5, face = "bold", size = 18),
      panel.grid.minor = element_blank(),
      panel.grid.major = element_line(color = "#D8CFC0", linewidth = 0.5),
      axis.line = element_line(color = "#666666", linewidth = 0.4),
      axis.ticks = element_line(color = "#666666", linewidth = 0.4),
      axis.text = element_text(color = "#333333"),
      axis.title = element_text(color = "#333333"),
      plot.background = element_rect(fill = "white", color = NA),
      panel.background = element_rect(fill = "white", color = NA)
    )
}

build_correlation_data <- function(data) {
  corr_data <- data[, c("pax_mil", "pop_mil", "ydd", "rpc_mil")]
  names(corr_data) <- c("PAX (000)", "POP (000)", "YDD", "RPC (000)")
  corr_data
}

save_correlation_plot <- function(data, output_path) {
  dir.create(dirname(output_path), recursive = TRUE, showWarnings = FALSE)

  corr_matrix <- cor(build_correlation_data(data))
  corr_colors <- colorRampPalette(c("#DCEAF4", "#F6F1D8", "#DDEBD8"))(200)

  if (grepl("\\.pdf$", output_path, ignore.case = TRUE)) {
    pdf(output_path, width = 7.2, height = 5.2)
  } else {
    png(output_path, width = 1400, height = 1000, res = 180)
  }

  corrplot::corrplot(
    corr_matrix,
    method = "color",
    type = "upper",
    col = corr_colors,
    diag = FALSE,
    addCoef.col = "black",
    insig = "blank",
    number.cex = 0.95,
    number.digits = 4,
    tl.col = "red3",
    tl.srt = 90,
    tl.cex = 1.05,
    mar = c(0, 0, 1, 0)
  )

  dev.off()
}

save_regression_tables <- function(model, labels, output_prefix) {
  model_summary <- summary(model)
  coef_table <- model_summary$coefficients
  ci_table <- confint(model)
  anova_table <- anova(model)

  coef_lines <- c(
    "\\begin{tabular}{lrrrrrr}",
    "\\toprule",
    " & Coeficientes & Erro padr\\~ao & Stat $t$ & valor-$P$ & 95\\% inferiores & 95\\% superiores \\\\",
    "\\midrule"
  )

  coef_row_names <- rownames(coef_table)
  for (i in seq_len(nrow(coef_table))) {
    coef_lines <- c(
      coef_lines,
      sprintf(
        "%s & %s & %s & %s & %s & %s & %s \\\\",
        coef_label(coef_row_names[i], labels),
        format_br(coef_table[i, 1]),
        format_br(coef_table[i, 2]),
        format_br(coef_table[i, 3]),
        format_br(coef_table[i, 4]),
        format_br(ci_table[i, 1]),
        format_br(ci_table[i, 2])
      )
    )
  }

  coef_lines <- c(coef_lines, "\\bottomrule", "\\end{tabular}")

  stats_lines <- c(
    "\\begin{tabular}{lr}",
    "\\toprule",
    "\\multicolumn{2}{c}{\\textit{Estat\\'istica de regress\\~ao}} \\\\",
    "\\midrule",
    sprintf("R m\\'ultiplo & %s \\\\", format_br(sqrt(model_summary$r.squared))),
    sprintf("R-Quadrado & %s \\\\", format_br(model_summary$r.squared)),
    sprintf("R-quadrado ajustado & %s \\\\", format_br(model_summary$adj.r.squared)),
    sprintf("Erro padr\\~ao & %s \\\\", format_br(model_summary$sigma)),
    sprintf("Observa\\c{c}\\~oes & %s \\\\", nobs(model)),
    "\\bottomrule",
    "\\end{tabular}"
  )

  fstat <- model_summary$fstatistic
  f_value <- unname(fstat["value"])
  f_pvalue <- pf(f_value, fstat["numdf"], fstat["dendf"], lower.tail = FALSE)
  reg_df <- sum(anova_table$Df[seq_len(nrow(anova_table) - 1)])
  reg_sq <- sum(anova_table$`Sum Sq`[seq_len(nrow(anova_table) - 1)])
  reg_mq <- reg_sq / reg_df
  resid_df <- anova_table$Df[nrow(anova_table)]
  resid_sq <- anova_table$`Sum Sq`[nrow(anova_table)]
  resid_mq <- anova_table$`Mean Sq`[nrow(anova_table)]

  anova_lines <- c(
    "\\begin{tabular}{lrrrrr}",
    "\\toprule",
    " & gl & SQ & MQ & F & F de significa\\c{c}\\~ao \\\\",
    "\\midrule",
    sprintf(
      "Regress\\~ao & %s & %s & %s & %s & %s \\\\",
      format_br(reg_df, digits = 1),
      format_br(reg_sq),
      format_br(reg_mq),
      format_br(f_value),
      format_br(f_pvalue)
    ),
    sprintf(
      "Res\\'iduo & %s & %s & %s &  &  \\\\",
      format_br(resid_df, digits = 1),
      format_br(resid_sq),
      format_br(resid_mq)
    ),
    sprintf(
      "Total & %s & %s &  &  &  \\\\",
      format_br(reg_df + resid_df, digits = 1),
      format_br(reg_sq + resid_sq)
    ),
    "\\bottomrule",
    "\\end{tabular}"
  )

  write_lines_utf8(coef_lines, file.path(table_dir, paste0(output_prefix, "-coeficientes.tex")))
  write_lines_utf8(stats_lines, file.path(table_dir, paste0(output_prefix, "-estatisticas.tex")))
  write_lines_utf8(anova_lines, file.path(table_dir, paste0(output_prefix, "-anova.tex")))
}

build_fit_plot <- function(data, model, x_var, x_label, title_text, x_breaks, x_limits) {
  fitted_df <- data.frame(
    x_value = data[[x_var]],
    pax_mil = data$pax_mil,
    ajustado = fitted(model)
  )

  ggplot(fitted_df, aes(x = x_value)) +
    geom_line(aes(y = ajustado, color = "Previsto(a) PAX (000)"), linewidth = 0.8) +
    geom_point(aes(y = ajustado, color = "Previsto(a) PAX (000)"), size = 2.3, shape = 15) +
    geom_point(aes(y = pax_mil, color = "PAX (000)"), size = 2.4, shape = 18) +
    scale_color_manual(
      values = c(
        "Previsto(a) PAX (000)" = "#E441E8",
        "PAX (000)" = "#1E2A97"
      )
    ) +
    scale_x_continuous(breaks = x_breaks) +
    scale_y_continuous(breaks = seq(0, 80, by = 10)) +
    coord_cartesian(xlim = x_limits, ylim = c(0, 80)) +
    labs(
      title = title_text,
      x = x_label,
      y = "PAX (000)",
      color = NULL
    ) +
    theme_minimal(base_size = 14) +
    theme(
      plot.title = element_text(hjust = 0.5, face = "bold.italic", size = 15),
      legend.position = "top",
      panel.grid.minor = element_blank(),
      panel.grid.major = element_line(color = "#A8A8A8", linewidth = 0.45),
      axis.title = element_text(face = "bold.italic", color = "#1C1B18"),
      axis.text = element_text(color = "#333333"),
      plot.background = element_rect(fill = "white", color = NA),
      panel.background = element_rect(fill = "white", color = NA)
    )
}

compute_dw <- function(model) {
  residuals <- resid(model)
  sum(diff(residuals)^2) / sum(residuals^2)
}

build_dw_data <- function(model) {
  residuals <- resid(model)
  data.frame(
    observacao = seq_along(residuals),
    previsto = fitted(model),
    residuo = residuals,
    diff_sq = c(NA_real_, diff(residuals)^2),
    resid_sq = residuals^2
  )
}

save_dw_calc_table_abbrev <- function(dw_data, output_path, head_n = 3, tail_n = 3) {
  n_rows <- nrow(dw_data)
  keep_idx <- c(seq_len(min(head_n, n_rows)), seq.int(max(head_n + 1, n_rows - tail_n + 1), n_rows))
  keep_idx <- unique(keep_idx)
  dw_subset <- dw_data[keep_idx, , drop = FALSE]

  lines <- c(
    "\\begin{tabular}{rrrrr}",
    "\\toprule",
    "Obs. & Previsto(a) & Res\\'iduo & $(\\hat e_t - \\hat e_{t-1})^2$ & $\\hat e^2$ \\\\",
    "\\midrule"
  )

  build_row <- function(row) {
    diff_value <- if (is.na(row[["diff_sq"]])) "---" else format_br(as.numeric(row[["diff_sq"]]))

    sprintf(
      "%s & %s & %s & %s & %s \\\\",
      as.integer(row[["observacao"]]),
      format_br(as.numeric(row[["previsto"]])),
      format_br(as.numeric(row[["residuo"]])),
      diff_value,
      format_br(as.numeric(row[["resid_sq"]]))
    )
  }

  for (i in seq_len(nrow(dw_subset))) {
    lines <- c(lines, build_row(dw_subset[i, , drop = FALSE]))
    if (i < nrow(dw_subset) && (dw_subset$observacao[i + 1] - dw_subset$observacao[i]) > 1) {
      lines <- c(lines, "\\multicolumn{5}{c}{\\dots} \\\\")
    }
  }

  lines <- c(
    lines,
    sprintf(
      "\\midrule Total &  &  & %s & %s \\\\",
      format_br(sum(dw_data$diff_sq, na.rm = TRUE)),
      format_br(sum(dw_data$resid_sq, na.rm = TRUE))
    ),
    "\\bottomrule",
    "\\end{tabular}"
  )

  write_lines_utf8(lines, output_path)
}

save_dw_summary_table <- function(model, output_path, d_lower = 1.288) {
  dw_value <- compute_dw(model)

  if (dw_value < d_lower) {
    decisao <- "Rejeita $H_0$"
    leitura <- "Autocorrela\\c{c}\\~ao serial positiva"
  } else {
    decisao <- "N\\~ao rejeita $H_0$"
    leitura <- "Aus\\^encia de autocorrela\\c{c}\\~ao"
  }

  lines <- c(
    "\\begin{tabular}{lr}",
    "\\toprule",
    "Indicador & Resultado \\\\",
    "\\midrule",
    sprintf("$DW$ & %s \\\\", format_br(dw_value)),
    sprintf("$d_L$ (refer\\^encia) & %s \\\\", format_br(d_lower, digits = 3)),
    sprintf("Decis\\~ao & %s \\\\", decisao),
    sprintf("Leitura & %s \\\\", leitura),
    "\\bottomrule",
    "\\end{tabular}"
  )

  write_lines_utf8(lines, output_path)
}

build_residual_plot_predictor <- function(data, model, x_var, x_label, title_text, x_breaks, x_limits) {
  residual_df <- data.frame(
    x_value = data[[x_var]],
    residuo = resid(model)
  )

  ggplot(residual_df, aes(x = x_value, y = residuo)) +
    geom_hline(yintercept = 0, color = "#8E8A84", linewidth = 0.5, linetype = "dashed") +
    geom_point(size = 2.5, color = "#607D3B") +
    scale_x_continuous(breaks = x_breaks) +
    coord_cartesian(xlim = x_limits) +
    labs(
      title = title_text,
      x = x_label,
      y = "Res\\'iduos"
    ) +
    theme_minimal(base_size = 14) +
    theme(
      plot.title = element_text(hjust = 0.5, face = "bold.italic", size = 15),
      panel.grid.minor = element_blank(),
      panel.grid.major = element_line(color = "#D0CCC5", linewidth = 0.45),
      axis.title = element_text(face = "bold.italic", color = "#1C1B18"),
      axis.text = element_text(color = "#333333"),
      plot.background = element_rect(fill = "white", color = NA),
      panel.background = element_rect(fill = "white", color = NA)
    )
}

build_residual_plot_observation <- function(model, title_text) {
  residual_df <- data.frame(
    observacao = seq_along(resid(model)),
    residuo = resid(model)
  )

  ggplot(residual_df, aes(x = observacao, y = residuo)) +
    geom_hline(yintercept = 0, color = "#8E8A84", linewidth = 0.5, linetype = "dashed") +
    geom_point(size = 2.4, color = "#607D3B") +
    geom_line(linewidth = 0.6, color = "#98A97A") +
    scale_x_continuous(breaks = seq(1, 25, by = 2)) +
    labs(
      title = title_text,
      x = "Observa\\c{c}\\~ao",
      y = "Res\\'iduos"
    ) +
    theme_minimal(base_size = 14) +
    theme(
      plot.title = element_text(hjust = 0.5, face = "bold.italic", size = 15),
      panel.grid.minor = element_blank(),
      panel.grid.major = element_line(color = "#D0CCC5", linewidth = 0.45),
      axis.title = element_text(face = "bold.italic", color = "#1C1B18"),
      axis.text = element_text(color = "#333333"),
      plot.background = element_rect(fill = "white", color = NA),
      panel.background = element_rect(fill = "white", color = NA)
    )
}

save_model_comparison_table <- function(model_specs, model_results, output_path) {
  lines <- c(
    "\\begin{tabular}{p{3.2cm}rrrrrr}",
    "\\toprule",
    "Modelo & Interse\\c{c}\\~ao & POP & YDD & RPC & $R^2_{aj.}$ & DW \\\\",
    "\\midrule"
  )

  for (spec in model_specs) {
    model <- model_results[[spec$id]]
    coefs <- coef(model)
    row <- c(
      spec$comparison_label,
      format_br(unname(coefs["(Intercept)"])),
      if ("pop_mil" %in% names(coefs)) format_br(unname(coefs["pop_mil"])) else "--",
      if ("ydd" %in% names(coefs)) format_br(unname(coefs["ydd"])) else "--",
      if ("rpc_mil" %in% names(coefs)) format_br(unname(coefs["rpc_mil"])) else "--",
      format_br(summary(model)$adj.r.squared),
      format_br(compute_dw(model))
    )

    lines <- c(lines, paste(row, collapse = " & "), "\\\\")
  }

  lines <- c(lines, "\\bottomrule", "\\end{tabular}")
  write_lines_utf8(lines, output_path)
}

save_model_selection_table <- function(model_specs, model_results, output_path, d_lower = 1.288) {
  lines <- c(
    "\\begin{tabular}{p{3.15cm}rrrrp{2.65cm}}",
    "\\toprule",
    "Modelo & $R^2$ & $R^2_{aj.}$ & Erro padr\\~ao & DW & Leitura \\\\",
    "\\midrule"
  )

  for (spec in model_specs) {
    model <- model_results[[spec$id]]
    model_summary <- summary(model)
    dw_value <- compute_dw(model)
    leitura <- if (dw_value < d_lower) {
      "Autocorrela\\c{c}\\~ao positiva"
    } else {
      "Sem evid\\^encia relevante"
    }

    row <- c(
      spec$comparison_label,
      format_br(model_summary$r.squared),
      format_br(model_summary$adj.r.squared),
      format_br(model_summary$sigma),
      format_br(dw_value),
      leitura
    )

    lines <- c(lines, paste(row, collapse = " & "), "\\\\")
  }

  lines <- c(lines, "\\bottomrule", "\\end{tabular}")
  write_lines_utf8(lines, output_path)
}

build_model_specs <- function() {
  list(
    list(
      id = "modelo-01",
      frame_title = "Modelo 01 - $PAX = \\beta_1 + \\beta_2(POP)$",
      comparison_label = "PAX = f(POP)",
      formula = pax_mil ~ pop_mil,
      labels = c(pop_mil = "POP (000)"),
      fit = list(
        x_var = "pop_mil",
        x_label = "POP (000)",
        title = "POP (000) Plotagem de ajuste de linha",
        breaks = seq(9.8, 15.8, by = 1.0),
        limits = c(9.8, 15.8),
        output = "slide-06-modelo-01-ajuste"
      ),
      residual = list(
        type = "predictor",
        x_var = "pop_mil",
        x_label = "POP (000)",
        title = "POP (000) Plotagem de res\\'iduos",
        breaks = seq(9.8, 15.8, by = 1.0),
        limits = c(9.8, 15.8),
        output = "slide-09-modelo-01-residuos"
      )
    ),
    list(
      id = "modelo-02",
      frame_title = "Modelo 02 - $PAX = \\beta_1 + \\beta_2(RPC)$",
      comparison_label = "PAX = f(RPC)",
      formula = pax_mil ~ rpc_mil,
      labels = c(rpc_mil = "RPC (000)"),
      fit = list(
        x_var = "rpc_mil",
        x_label = "RPC (000)",
        title = "RPC (000) Plotagem de ajuste de linha",
        breaks = seq(13.5, 18.5, by = 0.5),
        limits = c(13.5, 18.5),
        output = "slide-07-modelo-02-ajuste"
      ),
      residual = list(
        type = "predictor",
        x_var = "rpc_mil",
        x_label = "RPC (000)",
        title = "RPC (000) Plotagem de res\\'iduos",
        breaks = seq(13.5, 18.5, by = 0.5),
        limits = c(13.5, 18.5),
        output = "slide-10-modelo-02-residuos"
      )
    ),
    list(
      id = "modelo-03",
      frame_title = "Modelo 03 - $PAX = \\beta_1 + \\beta_2(YDD)$",
      comparison_label = "PAX = f(YDD)",
      formula = pax_mil ~ ydd,
      labels = c(ydd = "YDD"),
      fit = list(
        x_var = "ydd",
        x_label = "YDD",
        title = "YDD Plotagem de ajuste de linha",
        breaks = seq(13, 21, by = 1),
        limits = c(13, 21),
        output = "slide-08-modelo-03-ajuste"
      ),
      residual = list(
        type = "predictor",
        x_var = "ydd",
        x_label = "YDD",
        title = "YDD Plotagem de res\\'iduos",
        breaks = seq(13, 21, by = 1),
        limits = c(13, 21),
        output = "slide-11-modelo-03-residuos"
      )
    ),
    list(
      id = "modelo-04",
      frame_title = "Modelo 04 - $PAX = \\beta_1 + \\beta_2(POP) + \\beta_3(YDD) + \\beta_4(RPC)$",
      comparison_label = "PAX = f(POP,YDD,RPC)",
      formula = pax_mil ~ pop_mil + ydd + rpc_mil,
      labels = c(pop_mil = "POP (000)", ydd = "YDD", rpc_mil = "RPC (000)"),
      residual = list(
        type = "observation",
        title = "Plotagem de res\\'iduos por observa\\c{c}\\~ao",
        output = "slide-12-modelo-04-residuos"
      )
    ),
    list(
      id = "modelo-05",
      frame_title = "Modelo 05 - $PAX = \\beta_1 + \\beta_2(POP) + \\beta_3(YDD)$",
      comparison_label = "PAX = f(POP,YDD)",
      formula = pax_mil ~ pop_mil + ydd,
      labels = c(pop_mil = "POP (000)", ydd = "YDD"),
      residual = list(
        type = "observation",
        title = "Plotagem de res\\'iduos por observa\\c{c}\\~ao",
        output = "slide-13-modelo-05-residuos"
      )
    ),
    list(
      id = "modelo-06",
      frame_title = "Modelo 06 - $PAX = \\beta_1 + \\beta_2(POP) + \\beta_3(RPC)$",
      comparison_label = "PAX = f(POP,RPC)",
      formula = pax_mil ~ pop_mil + rpc_mil,
      labels = c(pop_mil = "POP (000)", rpc_mil = "RPC (000)"),
      residual = list(
        type = "observation",
        title = "Plotagem de res\\'iduos por observa\\c{c}\\~ao",
        output = "slide-14-modelo-06-residuos"
      )
    ),
    list(
      id = "modelo-07",
      frame_title = "Modelo 07 - $PAX = \\beta_1 + \\beta_2(YDD) + \\beta_3(RPC)$",
      comparison_label = "PAX = f(YDD,RPC)",
      formula = pax_mil ~ ydd + rpc_mil,
      labels = c(ydd = "YDD", rpc_mil = "RPC (000)"),
      residual = list(
        type = "observation",
        title = "Plotagem de res\\'iduos por observa\\c{c}\\~ao",
        output = "slide-15-modelo-07-residuos"
      )
    )
  )
}

main <- function() {
  dados <- load_los_angeles_data()
  model_specs <- build_model_specs()
  model_results <- list()

  save_plot(build_pax_historico_plot(dados), file.path(output_dir, "slide-04-pax-historico.png"), width = 9, height = 5.1)
  save_plot(build_pax_historico_plot(dados), file.path(output_dir, "slide-04-pax-historico.pdf"), width = 9, height = 5.1)

  save_correlation_plot(dados, file.path(output_dir, "slide-05-correlation.pdf"))
  save_correlation_plot(dados, file.path(output_dir, "slide-05-correlation.png"))

  for (spec in model_specs) {
    model <- lm(spec$formula, data = dados)
    model_results[[spec$id]] <- model

    save_regression_tables(model, spec$labels, spec$id)

    if (!is.null(spec$fit)) {
      fit_plot <- build_fit_plot(
        data = dados,
        model = model,
        x_var = spec$fit$x_var,
        x_label = spec$fit$x_label,
        title_text = spec$fit$title,
        x_breaks = spec$fit$breaks,
        x_limits = spec$fit$limits
      )

      save_plot(fit_plot, file.path(output_dir, paste0(spec$fit$output, ".pdf")))
      save_plot(fit_plot, file.path(output_dir, paste0(spec$fit$output, ".png")))
    }

    dw_data <- build_dw_data(model)
    save_dw_calc_table_abbrev(dw_data, file.path(table_dir, paste0(spec$id, "-dw-calculo-abrev.tex")))
    save_dw_summary_table(model, file.path(table_dir, paste0(spec$id, "-dw-resumo.tex")))

    residual_plot <- if (spec$residual$type == "predictor") {
      build_residual_plot_predictor(
        data = dados,
        model = model,
        x_var = spec$residual$x_var,
        x_label = spec$residual$x_label,
        title_text = spec$residual$title,
        x_breaks = spec$residual$breaks,
        x_limits = spec$residual$limits
      )
    } else {
      build_residual_plot_observation(
        model = model,
        title_text = spec$residual$title
      )
    }

    save_plot(residual_plot, file.path(output_dir, paste0(spec$residual$output, ".pdf")))
    save_plot(residual_plot, file.path(output_dir, paste0(spec$residual$output, ".png")))
  }

  save_model_comparison_table(
    model_specs = model_specs,
    model_results = model_results,
    output_path = file.path(table_dir, "comparacao-modelos-coeficientes.tex")
  )

  save_model_selection_table(
    model_specs = model_specs,
    model_results = model_results,
    output_path = file.path(table_dir, "comparacao-modelos-selecao.tex")
  )
}

main()
