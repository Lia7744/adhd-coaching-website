import fitz

input_pdf = "public/assets-xq9s2m/MAY 3 FINAL MMTDS copy.pdf"
output_pdf = "public/assets-xq9s2m/MAY 3 FINAL MMTDS copy_stamped.pdf"

doc = fitz.open(input_pdf)

# Known 1-indexed pages to skip
skip_pages = {
    1, 2, 3,  # Cover, page 2, TOC
    4, 13, 22, 33, 43, 53, 63, 73, 82,  # Chapters
    7, 11, 12, 20, 21, 29, 30, 31, 32, 40, 41, 42, 49, 50, 51, 52, 
    59, 60, 61, 62, 70, 71, 72, 79, 80, 81, 86,  # Worksheets
    88, 89  # Want to go deeper, References
}

font_size = 12
color = (0.5, 0.5, 0.5) # Gray
margin_right = 50
margin_bottom = 40

for i in range(len(doc)):
    page_num = i + 1
    
    if page_num in skip_pages:
        print(f"Skipping page {page_num}")
        continue
        
    page = doc[i]
    rect = page.rect
    
    text = str(page_num)
    
    # Calculate position (bottom right)
    text_width = fitz.get_text_length(text, fontname="helv", fontsize=font_size)
    x = rect.width - margin_right - text_width
    y = rect.height - margin_bottom
    
    page.insert_text((x, y), text, fontname="helv", fontsize=font_size, color=color)
    print(f"Stamped page {page_num}")

doc.save(output_pdf)
doc.close()
print(f"Successfully saved to {output_pdf}")
