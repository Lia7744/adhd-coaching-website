import fitz

doc = fitz.open("public/assets-xq9s2m/MAY 3 FINAL MMTDS copy.pdf")
page = doc[40] # Check a worksheet page (Page 41 is 1-indexed)

drawings = page.get_drawings()
print(f"Found {len(drawings)} drawings on page 41")

rects = []
lines = []

for d in drawings:
    rect = d["rect"]
    items = d["items"]
    # Check if it's a small square (checkbox)
    if rect.width < 25 and rect.height < 25 and rect.width > 10 and rect.height > 10:
        rects.append(rect)
    # Check if it's a long horizontal line (fill-in line)
    if rect.width > 100 and rect.height < 5:
        lines.append(rect)

print(f"Found {len(rects)} potential checkboxes")
for r in rects:
    print(r)

print(f"Found {len(lines)} potential text lines")
for l in lines:
    print(l)

doc.close()
