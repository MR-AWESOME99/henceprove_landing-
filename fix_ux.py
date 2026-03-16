import re

with open('c:/Users/syedm/OneDrive/Documents/projects/frontend/henceprove_landing/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace ALL <a href="#" ...>...</a> with <button type="button" ...>...</button>
# This avoids Hick's Law and maintains appearance via classes.
text = re.sub(r'<a href="#"(.*?)>(.*?)</a>', r'<button type="button"\1>\2</button>', text, flags=re.DOTALL)

# 2. Fix the font-family Helvetica Neue which is violating the 3-font max rule
text = re.sub(r'font-family:\s*[\'"]?Helvetica Neue[\'"]?,?\s*[^;]*;', "font-family: 'Inter', system-ui, sans-serif;", text)
text = re.sub(r'font-family:\s*[\'"]?Apple Garamond[\'"]?,?\s*[^;]*;', "font-family: 'EB Garamond', serif;", text)

with open('c:/Users/syedm/OneDrive/Documents/projects/frontend/henceprove_landing/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
print("done")
