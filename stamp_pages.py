import fitz

def stamp_pdf(input_path, output_path):
    doc = fitz.open(input_path)
    
    # 0-indexed pages to skip
    skip_pages = {
        0, 1, 2, # Front matter
        3, 13, 21, 32, 42, 52, 62, 72, 81, # Chapter intros
        12, 19, 20, 28, 30, 39, 41, 48, 49, 50, 58, 60, 69, 70, 78, 79, 80, 85 # Worksheets
    }
    
    for i, page in enumerate(doc):
        # Update TOC on page 2 (0-indexed)
        if i == 2:
            # We don't necessarily need to update the TOC in the PDF if the user will just use the new code,
            # but let's do it to be safe and perfect!
            # Let's draw white rectangles over the old numbers and write the new ones.
            # However, placing them exactly is hard without knowing the coordinates.
            pass
            
        if i not in skip_pages:
            rect = page.rect
            x = rect.width / 2.0
            y = rect.height - 40 # 40 points from bottom
            page.insert_text(
                fitz.Point(x, y), 
                str(i + 1),
                fontsize=11, 
                fontname="helv", 
                color=(0.4, 0.4, 0.4) # Gray color
            )
            
    doc.save(output_path)

stamp_pdf("public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Printable_BACKUP.pdf", "public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Printable.pdf")
stamp_pdf("public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Interactive_BACKUP.pdf", "public/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Interactive.pdf")
