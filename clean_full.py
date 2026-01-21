cleaned_lines = []

with open("full.txt", "r") as f_r:
	for line in f_r:
		cleaned_lines.append(line[:-35])

with open("full_out.txt", "w") as f_w:
	for cleaned_line in cleaned_lines:
		f_w.write(cleaned_line + "\n")
