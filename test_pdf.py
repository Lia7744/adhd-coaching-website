import fitz

doc = fitz.open("public/assets-xq9s2m/MAY 3 FINAL MMTDS copy.pdf")
print(f"Total pages: {len(doc)}")

for i in range(len(doc)):
    page = doc[i]
    text = page.get_text()
    cleaned = text.replace('\n', ' ').strip()
    print(f"Page {i+1}: len={len(cleaned)} preview={cleaned[:100]}")

doc.close()
