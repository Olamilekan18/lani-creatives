import os
import glob

v4_dir = r'c:\Users\USER\Desktop\Lani-Creatives\lani-creatives-v4'
html_files = glob.glob(os.path.join(v4_dir, '*.html'))

old_tailwind = "tailwind.config={theme:{extend:{colors:{onyx:'#0A0A0A','onyx-light':'#141414','onyx-mid':'#1a1a1a',gold:'#C9A96E','gold-light':'#D4BA85','gold-dark':'#A88B4A',ivory:'#FAF7F2','ivory-dim':'#E8E4DD',terracotta:'#C44D2B',forest:'#1A3A2A'},fontFamily:{display:['Playfair Display','serif'],body:['Inter','sans-serif'],accent:['Cormorant Garamond','serif']}}}}"
new_tailwind = "tailwind.config={theme:{extend:{colors:{'cream':'#F5F1E7','cream-dark':'#EBE5D9','gold':'#d4af37','gold-light':'#e5c158','gold-dark':'#aa8c2c','onyx':'#0a0a0c','onyx-light':'#161619'},fontFamily:{display:['\"Playfair Display\"','serif'],body:['\"Outfit\"','sans-serif']}}}}"

old_fonts = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">'
new_fonts = '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">'

for fpath in html_files:
    if os.path.basename(fpath) == 'index.html': continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(old_tailwind, new_tailwind)
    content = content.replace(old_fonts, new_fonts)
    
    content = content.replace('<body class="bg-onyx text-ivory font-body">', '<body class="bg-cream text-onyx font-body overflow-x-hidden selection:bg-gold selection:text-onyx antialiased">')
    
    # Generic theme colors
    content = content.replace('bg-onyx-light', 'bg-cream-dark')
    content = content.replace('bg-onyx', 'bg-cream')
    content = content.replace('text-ivory', 'text-onyx')
    content = content.replace('border-ivory', 'border-onyx')
    content = content.replace('bg-ivory', 'bg-onyx')
    
    # Adjust for components which use bg-onyx that were replaced to bg-cream
    content = content.replace('bg-cream/95', 'bg-cream-dark/95')
    content = content.replace('bg-cream/50', 'bg-cream-dark/50')
    content = content.replace('bg-cream/98', 'bg-cream-dark/98')
    content = content.replace('border-gold/10', 'border-gold/20')
    
    # Specific component classes
    content = content.replace('article-card', 'article-card-light')
    content = content.replace('pub-card', 'pub-card-light')
    content = content.replace('acb-pillar', 'acb-pillar-light')
    content = content.replace('programme-card', 'programme-card-light')
    content = content.replace('enquiry-cat', 'enquiry-cat-light')
    content = content.replace('gallery-item', 'gallery-item-light')
    content = content.replace('placeholder-img', 'placeholder-img-light')
    content = content.replace('portfolio-item', 'portfolio-item-light')
    content = content.replace('portfolio-overlay', 'portfolio-overlay-light')
    content = content.replace('service-card', 'service-card-light')
    content = content.replace('form-input', 'form-input-light')
    content = content.replace('section-divider', 'section-divider-light')
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {os.path.basename(fpath)}')
