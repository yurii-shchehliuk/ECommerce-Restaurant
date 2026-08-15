#!/bin/bash
# Wait for SQL Server to be started and then run the sql script.
#
# Both passwords come from the environment; nothing is hardcoded here.
#   SA_PASSWORD              - the SQL Server SA account (also set on the container)
#   OWLET_DBUSER_PASSWORD    - the application login created by InitializeOwletDb.sql
# Set them in the .env file next to docker-compose.yml (see .env.template).
set -euo pipefail

: "${SA_PASSWORD:?SA_PASSWORD is not set - see .env.template}"
: "${OWLET_DBUSER_PASSWORD:?OWLET_DBUSER_PASSWORD is not set - see .env.template}"

./wait-for-it.sh owletsql:1433 --timeout=0 --strict -- sleep 5s && \
/opt/mssql-tools/bin/sqlcmd -S localhost -i InitializeOwletDb.sql \
    -U sa -P "$SA_PASSWORD" \
    -v OWLET_DBUSER_PASSWORD="$OWLET_DBUSER_PASSWORD"
