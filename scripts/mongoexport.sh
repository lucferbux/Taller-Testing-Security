cd ..
rm -r ./exports
mkdir ./exports
cd exports

mongoexport --db portfolio_db --collection users --out mockUsername.json
mongoexport --db portfolio_db --collection profile --out mockProfile.json
mongoexport --db portfolio_db --collection projects --out mockProjects.json