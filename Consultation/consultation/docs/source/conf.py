# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'consultation'
copyright = '2025, CHERRAF Nourelhouda'
author = 'CHERRAF Nourelhouda'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = []

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

language = 'francais'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'alabaster'
html_static_path = ['_static']
import os
import sys
sys.path.insert(0, os.path.abspath('consultation'))  # Assurez-vous que le chemin est correct
extensions = ['sphinx.ext.autodoc', 'sphinx.ext.napoleon', 'sphinx_autodoc_typehints']
os.environ['DJANGO_SETTINGS_MODULE'] = 'consultation.settings'
