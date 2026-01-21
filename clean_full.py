# usage:
# - run gotIssues, set to Issues Only
# - grab all lines "<nationName> has over 9 packs, skipping issues>"
# - add all to full.txt and run clean_full.py
# - filter puppets sheet by clean_full list: "=FILTER(A2:B<n>, MATCH(A2:A<n>, F2:F<n>, 0))", n=(num+puppets+1)

cleaned_lines = []

with open("full.txt", "r") as f_r:
	for line in f_r:
		cleaned_lines.append(line[:-35])

with open("full_out.txt", "w") as f_w:
	for cleaned_line in cleaned_lines:
		f_w.write(cleaned_line + "\n")
