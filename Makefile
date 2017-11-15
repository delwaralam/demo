BRANCH = "master"
VERSION = $(shell cat ./package.json | python -c "import sys, json; print json.load(sys.stdin)['version']")

push-tag:
	@echo "=> New tag version: ${VERSION}"
	git checkout ${BRANCH}
	git pull origin ${BRANCH}
	git tag ${VERSION}
	git push origin ${BRANCH} --tags