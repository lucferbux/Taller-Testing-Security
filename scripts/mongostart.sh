RED='\033[0;31m'
NC='\033[0m'
echo ""
echo "${RED} ******************************************************************************************************************"
echo "${RED} If not installed, you must install MongoDB first, instructions here: https://docs.mongodb.com/manual/installation/"
echo "${RED} ******************************************************************************************************************"
echo "${NC}"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo service mongod start
    echo "MondoDB running...."
elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start mongodb-community
    echo "MondoDB running...."
else
    echo "Error detecting OS, MongoDB Not Started"
fi