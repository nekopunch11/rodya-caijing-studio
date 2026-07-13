from pathlib import Path

from docx_renderer import TEMPLATE_PATH, create_template


if __name__ == "__main__":
    create_template(TEMPLATE_PATH)
    print(TEMPLATE_PATH)
