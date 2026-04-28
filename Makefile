.PHONY: install build serve clean

install:
	python3 -m pip install -r requirements.txt

build:
	python3 -m pipeline

serve:
	cd docs && python3 -m http.server 8000

clean:
	rm -rf data/cache __pycache__ pipeline/__pycache__
