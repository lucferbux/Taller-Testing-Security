USER  ?= user@gmail.com
PASS  ?= patata
MONGODB_ATLAS ?= mongodb+srv://<username>:<password>@<cluster>.mongodb.net

# TODO: 8) Añadir un script para iniciar dev en https

# Init Scripts

.PHONY: dev-api
dev-api:
	cd api && npm run dev

.PHONY: dev-ui
dev-ui:
	cd ui && npm run dev

.PHONY: dev-start
dev-start: 
	make -j 3 mongo-start dev-api dev-ui

# DB Scripts

.PHONY: dev-populate-data
dev-populate-data:
	cd scripts && ./mongoimport.sh

.PHONY: dev-delete-data
dev-delete-data:
	cd scripts && ./mongodelete.sh

.PHONY: mongo-start
mongo-start:
	cd scripts && ./mongostart.sh

.PHONY: mongo-export
mongo-export:
	cd scripts && ./mongoexport.sh


.PHONY: dev-bbdd-start-populate
dev-bbdd-start-populate: mongo-start dev-populate-data

.PHONY: generate-password
generate-password:
	cd scripts && ./generatepass.sh $(USER) $(PASS)

.PHONY: import-atlass
import-atlass:
	cd scripts && ./mongoimportatlass.sh $(MONGODB_ATLAS)

# Installation scripts

.PHONY: install-ui
install-ui:
	cd ui && npm install

.PHONY: install-backend
install-backend:
	cd api && npm install

.PHONY: install-dependencies
install-dependencies: install-ui install-backend

# TODO: 9) Añadir scripts para npm audit en frontend y backend

# Audit scripts

.PHONY: audit-frontend
audit-frontend:
	cd ui && npm audit

.PHONY: audit-backend
audit-backend:
	cd backend && npm audit

# Testing

.PHONY: story-book
story-book:
	cd ui && npm run storybook