import fitz

def fix_toc(input_path, output_path):
    doc = fitz.open(input_path)
    page = doc[2] # TOC page (page 3)
    
    # We want to find the numbers: 11, 15, 20, 26, 32, 40, 46, 51
    # and replace them with:      14, 22, 33, 43, 53, 63, 73, 82
    replacements = {
        "11": "14",
        "15": "22",
        "20": "33",
        "26": "43",
        "32": "53",
        "40": "63",
        "46": "73",
        "51": "82"
    }
    
    # We only want to replace these specific numbers on the right side of the page
    words = page.get_text("words")
    for w in words:
        x0, y0, x1, y1, word = w[:5]
        # Check if it's one of our numbers AND it's on the right half of the page
        if word in replacements and x0 > page.rect.width / 2:
            # Draw a white rectangle over the old number
            # Expand the rect slightly to ensure full coverage
            rect = fitz.Rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2)
            page.draw_rect(rect, color=(1,1,1), fill=(1,1,1))
            
            # Write the new number
            page.insert_text(
                fitz.Point(x0, y1 - 3), # Adjust y baseline slightly
                replacements[word],
                fontsize=13, # Match existing approx
                fontname="helv", 
                color=(0, 0, 0) # Black/charcoal
            )
            
    doc.save(output_path)

fix_toc("public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Printable.pdf", "public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Printable_FIXED.pdf")
fix_toc("public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Interactive.pdf", "public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Interactive_FIXED.pdf")
