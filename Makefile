DIST=dist
BASE=flowplayer.audio
GIT_ID=${shell git rev-parse --short HEAD }

min:
	@ mkdir -p $(DIST)
	@ sed -e 's/\$$GIT_ID\$$/$(GIT_ID)/' stylus/$(BASE).styl | npm run styl
	@ sed -e 's/\$$GIT_ID\$$/$(GIT_ID)/' $(BASE).js | npm run min

dist: min
	@ sed -e 's/\$$GIT_ID\$$/$(GIT_ID)/' $(BASE).js > $(DIST)/$(BASE).js
	@ cp LICENSE.md $(DIST)/

clean:
	@ rm -rf $(DIST)

lint:
	@ npm run -s lint

deps:
	@ npm install
