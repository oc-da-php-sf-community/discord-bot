.PHONY: start
start:
	deno run --allow-net --allow-env --allow-read --import-map=import_map.json  mod.ts

.PHONY: format
format:
	deno fmt