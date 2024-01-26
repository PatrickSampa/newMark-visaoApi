import subprocess
import os
import sys


class toHtml:
    print("PASSOU1")
    def pdf_to_html(self,input_path, output_path):
        # Run pdf2htmlEX command
        print("PASSOU2")
        print(f"O parâmetro passado foi: {my_parameter}")
        restult = subprocess.run(["./python/poppler-0.68.0_x86/poppler-0.68.0/bin/pdftohtml.exe", "-c", "-noframes", input_path, output_path], capture_output=True, check=True)
        return restult;

# Example usage
""" pdf_to_html('./python/sislabra.pdf', './teste') """
print("PASSOU3")
my_parameter = sys.argv[1]
objeto = toHtml();
print("PASSOU4")
i = objeto.pdf_to_html('./src/modules/Pdfs/sislabra.pdf', f'./src/modules/Pdfs/{my_parameter}');