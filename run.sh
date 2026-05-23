#!/bin/bash
# ==========================================================================
# Shamshad Ansari Portfolio - Server Startup Helper Script
# ==========================================================================

# Text Color Constants
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Clear terminal screen
clear

echo -e "${CYAN}====================================================================${NC}"
echo -e "${PURPLE}           SHAMSHAD ANSARI | PREMIUM CREATIVE PORTFOLIO              ${NC}"
echo -e "${CYAN}====================================================================${NC}"
echo -e ""
echo -e "${GREEN}[+] Booting local MERN/Java Full-Stack Developer Web Server...${NC}"

# Find an available port starting at 8080
PORT=8080
while lsof -i :$PORT >/dev/null 2>&1; do
    PORT=$((PORT+1))
done

# Start Python 3 built-in HTTP server in background
python3 -m http.server $PORT --bind 127.0.0.1 > /dev/null 2>&1 &
SERVER_PID=$!

# Trap exit signals to kill the background server cleanly
trap "echo -e '\n${PURPLE}[-] Stopping portfolio server...${NC}'; kill $SERVER_PID; exit" INT TERM

# Wait for server startup
sleep 1.2

echo -e "${GREEN}[+] Local server launched successfully!${NC}"
echo -e "${WHITE}[+] Host Address:  http://127.0.0.1:$PORT/${NC}"
echo -e ""
echo -e "${CYAN}[+] Opening your portfolio in the web browser...${NC}"

# Open browser based on environment
if command -v xdg-open > /dev/null; then
    xdg-open "http://127.0.0.1:$PORT/" > /dev/null 2>&1
elif command -v open > /dev/null; then
    open "http://127.0.0.1:$PORT/" > /dev/null 2>&1
else
    echo -e "${PURPLE}[!] System browser launcher not found. Please open: http://127.0.0.1:$PORT/${NC}"
fi

echo -e ""
echo -e "${CYAN}====================================================================${NC}"
echo -e "${WHITE}Server is active. Press [CTRL+C] in this terminal to shut down.${NC}"
echo -e "${CYAN}====================================================================${NC}"

# Keep script running to maintain python server
wait $SERVER_PID
